
// Table.jsx
import React, { useState } from "react";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from 'react-redux';
import { removeTask, toggleTaskStatus, updateTask } from '../store/todoListStore';

function Table() {
    const todoList = useSelector((state) => state.todo.todoList);
    const dispatch = useDispatch();
    const [editingTask, setEditingTask] = useState(null);
    const [editFormData, setEditFormData] = useState({
        name: "",
        content: "",
        deadline: ""
    });

    const handleEditClick = (task) => {
        setEditingTask(task.id);
        setEditFormData({
            name: task.name,
            content: task.content,
            deadline: task.deadline
        });
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEditSubmit = (id) => {
        dispatch(updateTask(id, editFormData));
        setEditingTask(null);
    };

    const formatDate = (dateString) => {
        try {
            return format(new Date(dateString), "dd/MM/yyyy HH:mm");
        } catch {
            return dateString;
        }
    };
    const { t } = useTranslation()

    const handleRemoveTask = (id) => {
        dispatch(removeTask(id));
    };

    const handleToggleStatus = (id) => {
        dispatch(toggleTaskStatus(id));
    };

   
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-[16px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3"> {t("STT")}</th>
                        <th scope="col" className="px-6 py-3">{t("TaskName")}</th>
                        <th scope="col" className="px-6 py-3">{t("TaskContent")}</th>
                        <th scope="col" className="px-6 py-3">{t("Status")}</th>
                        <th scope="col" className="px-6 py-3">{t("Date")}</th>
                        <th scope="col" className="px-6 py-3">{t("Action")}</th>
                    </tr>
                </thead>
                <tbody>
                    {todoList.map((task, index) => (
                        <tr key={task.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-6 py-3">{index + 1}</td>
                            <td className="px-6 py-3">
                                {editingTask === task.id ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={editFormData.name}
                                        onChange={handleEditInputChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                    />
                                ) : (
                                    task.name
                                )}
                            </td>
                            <td className="px-6 py-3">
                                {editingTask === task.id ? (
                                    <textarea
                                        name="content"
                                        value={editFormData.content}
                                        onChange={handleEditInputChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                    />
                                ) : (
                                    task.content
                                )}
                            </td>
                            <td className="px-6 py-3">
                                <button
                                    onClick={() => handleToggleStatus(task.id)}
                                    className={`
                                        inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium
                                        ${task.completed
                                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                        }
                                    `}
                                >
                                    {task.completed ? "Xong" : "Chưa xong"}
                                </button>
                            </td>
                            <td className="px-6 py-3">
                                {editingTask === task.id ? (
                                    <input
                                        type="datetime-local"
                                        name="deadline"
                                        value={editFormData.deadline}
                                        onChange={handleEditInputChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                    />
                                ) : (
                                    formatDate(task.deadline)
                                )}
                            </td>
                            <td className="px-6 py-3 space-x-2">
                                {editingTask === task.id ? (
                                    <>
                                        <button
                                            onClick={() => handleEditSubmit(task.id)}
                                            className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => setEditingTask(null)}
                                            className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => handleEditClick(task)}
                                            className="text-white bg-cyan-500 hover:bg-cyan-600 focus:ring-4 focus:ring-cyan-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleRemoveTask(task.id)}
                                            className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;