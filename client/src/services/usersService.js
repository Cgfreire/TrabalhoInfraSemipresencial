import { api } from "./config";

export const createSession = async (email, password) => {
    return await api.post("auth/login", { email, password });
};

export const createUser = async (email, password, role) => {
    return await api.post("/users", { email, password, role });
};

export const editUser = async (userId, userData) => {
    return await api.put(`/users/${userId}`, userData);
};

export const deleteUser = async (userId) => {
    return await api.delete(`/users/${userId}`);
};

export const getUsers = async () => {
    return await api.get("/users");
};
