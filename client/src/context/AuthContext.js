import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Create the AuthContext with default values
const AuthContext = createContext({
    isAuthenticated: false,
    user: null,
    token: null,
    login: () => {},
    register: () => {},
    logout: () => {},
});

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const navigate = useNavigate();
    const backendURL = process.env.REACT_APP_API_KEY;
    useEffect(() => {
        // Fetch token data from session storage
        const storedToken = sessionStorage.getItem("token");
        // Update the token state with the fetched data
        setToken(storedToken);
    }, []);

    useEffect(() => {
        // Fetch user data from session storage
        const storedUser = sessionStorage.getItem("user");

        console.log("Setting user");
        // Check if there is stored user data
        if (storedUser) {
            // Parse the stored user data from JSON format to an object
            const parsedUser = JSON.parse(storedUser);
            // Set the user state with the parsed user data
            setUser(parsedUser);
        }
    }, []); // The empty array ensures this effect runs only once on mount

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${backendURL}/user/sign-in`, {
                email,
                password,
            });
            const data = response.data;
            console.log("data", data);
            //   setIsAuthenticated(true);
            setUser(data.data.user);
            setToken(data.data.token);
            sessionStorage.setItem("user", JSON.stringify(data.data.user));
            sessionStorage.setItem("token", data.data.token);
            navigate("/");
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    const register = async (value) => {
       
        try {
            const response = await axios.post(`${backendURL}/user/sign-up`, value);
            const data = response.data;
            console.log("data", data);
            //   setIsAuthenticated(true);
            setUser(data.user);
            setToken(data.data.token);
            sessionStorage.setItem("user", JSON.stringify(data.data.user));
            sessionStorage.setItem("token", data.data.token);
            navigate("/");
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        setToken(null);
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("postRoom");
        sessionStorage.removeItem("buyRoom");
        sessionStorage.removeItem("newCityName");
        navigate("/")
    };

    console.log("user", user);
    return (
        <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
