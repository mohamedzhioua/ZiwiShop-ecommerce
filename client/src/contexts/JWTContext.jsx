import PropTypes from "prop-types";
import { createContext, useEffect, useReducer } from "react";
import { authApi } from "../api/authApi";

const initialState = {
  IsLoggedIn: false,
  isInitialized: false,
  user: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { IsLoggedIn, user } = action.payload;

    return {
      ...state,
      IsLoggedIn,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;
    return {
      ...state,
      IsLoggedIn: true,
      user,
    };
  },
  LOGOUT: (state) => {
    return {
      ...state,
      IsLoggedIn: false,
      user: null,


    };
  },
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      IsLoggedIn: false,
      user,
    };
  },
  FACEBOOK_LOGIN: (state, action) => {
    const { user } = action.payload;
    return {
      ...state,
      IsLoggedIn: true,
      user,


    };
  },
  GOOGLE_LOGIN: (state, action) => {
    const { user } = action.payload;
    return {
      ...state,
      IsLoggedIn: true,
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
  facebookLogin: () => Promise.resolve(),
  googleLogin: () => Promise.resolve(),
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
              IsLoggedIn: true,
              user: userDetails,
            },
          });
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: {
              IsLoggedIn: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: "INITIALIZE",
          payload: {
            IsLoggedIn: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (email, password) => {
    const user = await authApi.login({ email, password });
    localStorage.setItem("userDetails", JSON.stringify(user));
    dispatch({
      type: "LOGIN",
      payload: {
        user,
      },
    });
  };
  const facebookLogin = async (userID, accessToken) => {
    const user = await authApi.facebookLogin({
      userID,
      accessToken
    });
    localStorage.setItem("userDetails", JSON.stringify(user));
    dispatch({
      type: "FACEBOOK_LOGIN",
      payload: {
        user,
      },
    });

  };
  const googleLogin = async (idToken) => {
    const user = await authApi.googleLogin({ idToken });
    localStorage.setItem("userDetails", JSON.stringify(user));
    dispatch({
      type: "GOOGLE_LOGIN",
      payload: {
        user,
      },
    });

  };
  const register = async (email, name, password) => {

    const user = await authApi.register({ email, name, password });
    localStorage.setItem("userDetails", JSON.stringify(user));
    dispatch({
      type: "REGISTER",
      payload: {
        user,
      },
    });
  };

  const logout = async () => {
    try {
      localStorage.removeItem("userDetails");
      localStorage.removeItem("billingInfo");
      localStorage.removeItem("cartItems");
      localStorage.removeItem("step"); 
      dispatch({ type: "LOGOUT" });
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
        facebookLogin,
        googleLogin,
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
