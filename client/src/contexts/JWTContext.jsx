import { createContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import { authApi } from "../api/authApi";

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;
    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  },
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext({
  ...initialState,
  platform: "JWT",
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
});

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const userDetails = JSON.parse(
          window.localStorage.getItem("userDetails")
        );
        if (userDetails) {
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: true,
              user: userDetails,
            },
          });
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };
  
    initialize();
  }, []);
  
  const login = async (email, password) => {
    const response = await authApi.login({ email, password });
    const user = response.data;
    localStorage.setItem("userDetails", JSON.stringify(user));
    dispatch({
      type: "LOGIN",
      payload: {
        user,
      },
    });
  };
    
  const logout = async () => {
    try {
      localStorage.removeItem("userDetails");
      dispatch({ type: "LOGOUT" });
    } catch (err) {
      console.error(err);
    }
  };

  const register = async (email, name, password) => {
    try {
      const response = await authApi.register({ email, name, password });
      const user = response.data;
      localStorage.setItem("userDetails", JSON.stringify(user));
      dispatch({
        type: "REGISTER",
        payload: {
          user,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        platform: "JWT",
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
