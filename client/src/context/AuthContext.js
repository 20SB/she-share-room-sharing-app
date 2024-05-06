import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
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
    const [isLoading, setIsLoading] = useState(false);
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
        setIsLoading(true);
        try {
            const response = await axios.post(`${backendURL}/user/sign-in`, {
                email,
                password,
            });
            const data = response.data;
            console.log("data", data);
            //   setIsAuthenticated(true);
            toast.success("Login Successfull");
            setUser(data.data.user);
            setToken(data.data.token);
            sessionStorage.setItem("user", JSON.stringify(data.data.user));
            sessionStorage.setItem("token", data.data.token);
            navigate("/");
        } catch (error) {
            console.error("Login error:", error);
            toast.error(error.response.data.message || "Login Failed");
        }

        setIsLoading(false);
    };

    const register = async (value) => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${backendURL}/user/sign-up`, value);
            const data = response.data;
            console.log("data", data);
            //   setIsAuthenticated(true);
            toast.success("Registration Successfull");
            setUser(data.user);
            setToken(data.data.token);
            sessionStorage.setItem("user", JSON.stringify(data.data.user));
            sessionStorage.setItem("token", data.data.token);
            navigate("/");
        } catch (error) {
            console.error("Registration error:", error);
            toast.error(error.response.data.message || "Registration Failed");
        }
        setIsLoading(false);
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
        toast.success("Logout Successfull");
        navigate("/");
    };

    console.log("user", user);
    return (
        <AuthContext.Provider
            value={{ isAuthenticated, user, token, login, logout, register, isLoading }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
