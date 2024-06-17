import React, { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../api/users";
import Edit from "../icons/Group 34685.png";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import ConfirmationModal from "./ConfirmationModal";
import AddUserModal from "./AddUserModal"; // Добавляем импорт для AddUserModal
import DefaultUser from "../icons/user.png"
import EditPermissionsModal from "./EditPermissionsModal";

const userObj = {
    /** @type {string} */
    name: "",
    /** @type {string} */
    email: "",
    /** @type {string[]} */
    permissions: [],
    /** @type {string} */
    image: "",
};

function MainForm() {
    const [users, setUsers] = useState([userObj]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedUserIndex, setSelectedUserIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fetchTrigger, setFetchTrigger] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
    const [isAddModalOpen, setAddModalOpen] = useState(false); // Добавляем состояние для модального окна добавления пользователя
    const [isEditPermissionsModalOpen, setEditPermissionsModal] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const users = await getUsers();
                setUsers(users);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            }
        };

        fetchUsers();
    }, [fetchTrigger]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedUserIndex(0);
    };

    const handleDelete = async () => {
        try {
            await deleteUser(selectedUserIndex);
            setFetchTrigger(!fetchTrigger);
            setIsModalOpen(false);
            setDeleteModalOpen(true);
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };

    const handleChange = () => {
        // Implement change functionality
        handleCloseModal();
    };

    const handleSendCode = () => {
        // Implement send code functionality
        setConfirmationModalOpen(true);
        handleCloseModal();
    };

    const filteredUsers = users.filter((user) => {
        return user.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const [selectedUser, setSelectedUser] = useState(null);

    const handleEditClick = (userIndex) => {
        setSelectedUserIndex(userIndex);
        setSelectedUser(users[userIndex]);
        setIsModalOpen(true);
    };
    return (
        <div className="MainForm">
            <div className="Header">
                <h1>Команда</h1>
                <div className="search-wrapper">
                    <input
                        type="search"
                        placeholder="Поиск по Email"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M11.4603 10.3188L15.7643 14.6227C15.9155 14.7741 16.0005 14.9793 16.0004 15.1933C16.0003 15.4074 15.9152 15.6126 15.7639 15.7639C15.6125 15.9151 15.4072 16.0001 15.1932 16C14.9792 15.9999 14.774 15.9148 14.6227 15.7635L10.3188 11.4595C9.03217 12.4561 7.41426 12.925 5.79417 12.771C4.17409 12.617 2.67352 11.8516 1.59775 10.6305C0.52197 9.40935 -0.048211 7.82428 0.00319699 6.1977C0.054605 4.57112 0.72374 3.02522 1.87448 1.87448C3.02522 0.72374 4.57112 0.054605 6.1977 0.00319699C7.82428 -0.048211 9.40935 0.52197 10.6305 1.59775C11.8516 2.67352 12.617 4.17409 12.771 5.79417C12.925 7.41426 12.4561 9.03217 11.4595 10.3188H11.4603ZM6.40046 11.1996C7.67347 11.1996 8.89434 10.6939 9.7945 9.7937C10.6947 8.89354 11.2004 7.67267 11.2004 6.39966C11.2004 5.12665 10.6947 3.90577 9.7945 3.00562C8.89434 2.10546 7.67347 1.59976 6.40046 1.59976C5.12745 1.59976 3.90657 2.10546 3.00642 3.00562C2.10626 3.90577 1.60056 5.12665 1.60056 6.39966C1.60056 7.67267 2.10626 8.89354 3.00642 9.7937C3.90657 10.6939 5.12745 11.1996 6.40046 11.1996Z"
                            fill="#9494A0"
                        />
                    </svg>
                </div>
                <input type="submit" value="Добавить пользователя" onClick={() => setAddModalOpen(true)} /> {/* Обработчик для открытия модального окна */}
            </div>
            {filteredUsers.map((item, index) => (
                <div className="Users" key={item.email}>
                    <div className="Avatar">
                        {item.image ?

                            <img src={item.image} alt={`${item.name}'s avatar`} />
                            :
                            <img src={DefaultUser} alt={`${item.name}'s avatar`} />
                        }
                    </div>
                    <div className="UserInfo">
                        <div className="UserName">
                            {item.name ?

                                <div className="FullName">{item.name}</div>
                                :
                                <>
                                    <div className="FullName">Пользователь</div>
                                    <div className="Email">Не авторизован</div>
                                </>
                            }
                            <div className="Email">{item.email}</div>
                        </div>
                        <div className="Labels">
                            {item.permissions.map((perm) => (
                                <div className="Perm" key={perm}>
                                    {perm}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="Edit" onClick={() => handleEditClick(index)}>
                        <img src={Edit} alt="Edit icon" />
                    </div>
                </div>
            ))}
            {isModalOpen && (
                <EditModal
                    onClose={handleCloseModal}
                    onDelete={handleDelete}
                    onChange={handleChange}
                    onSendCode={handleSendCode}
                />
            )}
            {isDeleteModalOpen && (
                <DeleteModal onClose={() => setDeleteModalOpen(false)} />
            )}
            {isConfirmationModalOpen && (
                <ConfirmationModal userEmail={selectedUser && selectedUser.email} onClose={() => setConfirmationModalOpen(false)} />
            )}
            {isAddModalOpen && ( /* Рендер модального окна добавления пользователя */
                <AddUserModal onClose={() => setAddModalOpen(false) & setFetchTrigger(!fetchTrigger)} />
            )}

            {isEditPermissionsModalOpen && (
                <EditPermissionsModal onClose={() => setEditPermissionsModal(false)} />
            )}
        </div>
    );



}

export default MainForm;