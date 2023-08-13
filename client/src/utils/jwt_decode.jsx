import jwt_decode from "jwt-decode";

export const decodeToken = (token) => {
    try {
        const decodedToken = jwt_decode(token);
        const { email, name, image, role, userId } = decodedToken;  

        return {
            token,
            email,
            name,
            image,
            role,
            userId
        };
    } catch (error) {
        console.error('Error decoding JWT:', error);
        return null;
    }
};
