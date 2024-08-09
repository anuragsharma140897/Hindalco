import { jwtDecode } from "jwt-decode"; // Import jwtDecode as a named import

export const AuthenticatedUser = 'AuthenticatedUser';

export const setAuthenticatedUser = (data) => {
    localStorage.setItem(AuthenticatedUser, JSON.stringify(data));
}

export const getAuthenticatedUser = () => {
    const token = localStorage?.getItem(AuthenticatedUser);
    
    if (token) {
        try {
            const parsedToken = JSON.parse(token);
            return jwtDecode(parsedToken);
        } catch (error) {
            console.error("Failed to decode token:", error);
            return null;
        }
    } else {
        return null;
    }
}

export const getAuthToken = () => {
    const token = localStorage.getItem(AuthenticatedUser);
    
    if (token) {
        try {
            return JSON.parse(token);
        } catch (error) {
            console.error("Failed to parse token:", error);
            return null;
        }
    } else {
        return null;
    }
}

export const logOutAuthenticatedUser = () => {
    localStorage.removeItem(AuthenticatedUser);
}
