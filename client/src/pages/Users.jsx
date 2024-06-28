import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { getUsers, deleteUser } from "../services/usersService";

export const Users = () => {
    const { user } = useContext(AuthContext);
    const userRole = user ? user.role : null;
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getUsers();
                setUserList(response.data);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        try {
            await deleteUser(userId);
            setUserList(userList.filter(user => user.id !== userId));
        } catch (error) {
            console.error("Failed to delete user:", error);
        }
    };

    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
                <div className="max-w-2xl">
                    <h2 className="text-3xl pb-5 font-bold tracking-tight text-gray-900 sm:text-4xl text-center sm:text-start">Gerenciar usuários</h2>
                    <div className="flex w-full justify-center gap-5 sm:justify-start">
                        {userRole === 'ADMIN' && (
                            <>
                                <Link
                                    className='bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700'
                                    to="/signup"
                                >
                                    Criar conta
                                </Link>
                                <Link
                                    className='bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700'
                                    to="/products"
                                >
                                    Ver produtos
                                </Link>
                            </>
                        )}
                    </div>
                </div>
                <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
                    {userList.map((person) => (
                        <li key={person.id}>
                            <div className="flex items-center gap-x-6 flex-col sm:items-start gap-5">
                                <div>
                                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{person.email}</h3>
                                    <p className="text-sm font-semibold leading-6 text-indigo-600">{person.role}</p>
                                    <div className="flex items-center gap-5">
                                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700">Editar</button>
                                        <button
                                            className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700"
                                            onClick={() => handleDelete(person.id)}
                                        >
                                            Deletar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
