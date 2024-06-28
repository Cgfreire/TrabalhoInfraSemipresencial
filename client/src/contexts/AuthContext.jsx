import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/config";
import { createSession, createUser } from "../services/usersService";

export const AuthContext = createContext({});

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (user && token) {
            setUser(JSON.parse(user));
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }

        setIsLoading(false);
    }, []);

    const login = async (email, password) => {
        const { data } = await createSession(email, password);

        if (data) {
            const user = {
                id: data.id,
                email: data.email,
                role: data.role,
                token: data.token
            };
            setUser(user);
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(user));
            api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
            navigate("/products");
        }
    };

    const signup = async (email, password, role) => {
        const { data } = await createUser(email, password, role);

        if (data) {
            const user = {
                id: data.id,
                email: data.email,
                role: data.role,
                token: data.token
            };
            setUser(user);
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(user));
            api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
            navigate("/products");
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.clear();
        api.defaults.headers.common['Authorization'] = null;
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, signup, logout }}>
            {!isLoading ? children : null}
        </AuthContext.Provider>
    );
};
