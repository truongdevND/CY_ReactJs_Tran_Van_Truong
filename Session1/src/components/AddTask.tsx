// import React, { useState } from "react";
// import { useTranslation } from "react-i18next";
// import { useSelector, useDispatch } from 'react-redux';
// import { addTask } from '../store/todoListStore';


// const AddTask = () => {
//     const todoList = useSelector((state) => state.todo.todoList);
//     const dispatch = useDispatch();
//     const [isDialogOpen, setIsDialogOpen] = useState(false);
//     const [errors, setErrors] = useState({});
//     const { t } = useTranslation()

//     const [formData, setFormData] = useState({
//         name: "",
//         content: "",
//         deadline: "",
//         id: todoList.length > 0 ? Math.max(...todoList.map((task) => task.id)) + 1 : 1,
//         completed: false
//     });


//     const handleOpenDialog = () => {
//         setIsDialogOpen(true);
//     };

//     const handleCloseDialog = () => {
//         setIsDialogOpen(false);
//         setFormData({
//             name: "",
//             content: "",
//             deadline: "",
//             id: todoList.length > 0 ? Math.max(...todoList.map((task) => task.id)) + 1 : 1,
//             completed: false
//         });
//     };

//     const validateForm = () => {
//         const newErrors = {};
//         if (!formData.name.trim()) {
//             newErrors.name = "Task name is required";
//         }
//         if (!formData.content.trim()) {
//             newErrors.content = "Task content is required";
//         }
//         if (!formData.deadline) {
//             newErrors.deadline = "Deadline is required";
//         }
//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleSubmit = () => {
//         if (validateForm()) {
//             dispatch(addTask({
//                 name: formData.name,
//                 content: formData.content,
//                 deadline: formData.deadline,
//                 id: formData.id,
//                 completed: formData.completed,
//             }));

//             handleCloseDialog();
//         }
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: value
//         }));
//         if (errors[name]) {
//             setErrors(prev => ({
//                 ...prev,
//                 [name]: ""
//             }));
//         }
//     };

//     return (
//         <div>
//             <button
//                 onClick={handleOpenDialog}
//                 className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             >
//                 {t("AddTask")}
//             </button>
//             {isDialogOpen && (
//                 <div
//                     className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
//                     onClick={handleCloseDialog}
//                 >
//                     <div
//                         className="relative p-4 w-full max-w-md mx-auto mt-20"
//                         onClick={(e) => e.stopPropagation()}
//                     >
//                         <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl">
//                             <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
//                                 <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//                                     {t("AddNewTask")}
//                                 </h3>
//                                 <button
//                                     type="button"
//                                     onClick={handleCloseDialog}
//                                     className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white rounded-lg p-1.5 inline-flex items-center"
//                                     aria-label="Close modal"
//                                 >
//                                     <svg
//                                         className="w-5 h-5"
//                                         fill="none"
//                                         stroke="currentColor"
//                                         viewBox="0 0 24 24"
//                                     >
//                                         <path
//                                             strokeLinecap="round"
//                                             strokeLinejoin="round"
//                                             strokeWidth="2"
//                                             d="M6 18L18 6M6 6l12 12"
//                                         />
//                                     </svg>
//                                 </button>
//                             </div>

//                             <form className="p-6 space-y-6" onSubmit={handleSubmit}>
//                                 <div className="space-y-4">
//                                     <div>
//                                         <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//                                             {t('TaskName')} <span className="text-red-500">*</span>
//                                         </label>
//                                         <input
//                                             className={`block w-full p-4 text-black border rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black ${errors.name ? "border-red-500" : "border-gray-300"
//                                                 }`}
//                                             name="name"
//                                             value={formData.name}
//                                             onChange={handleInputChange}
//                                             placeholder="Enter task name"
//                                         />
//                                         {errors.name && (
//                                             <p className="mt-1 text-sm text-red-500">{errors.name}</p>
//                                         )}
//                                     </div>

//                                     <div>
//                                         <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//                                             {t('TaskContent')} <span className="text-red-500">*</span>
//                                         </label>
//                                         <textarea
//                                             className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-700 ${errors.content ? "border-red-500" : "border-gray-300"
//                                                 }`}
//                                             name="content"
//                                             value={formData.content}
//                                             onChange={handleInputChange}
//                                             placeholder="Enter task details"
//                                         />
//                                         {errors.content && (
//                                             <p className="mt-1 text-sm text-red-500">{errors.content}</p>
//                                         )}
//                                     </div>

//                                     <div>
//                                         <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//                                             {t("Deadline")} <span className="text-red-500">*</span>
//                                         </label>
//                                         <input
//                                             type="datetime-local"
//                                             name="deadline"
//                                             value={formData.deadline}
//                                             onChange={handleInputChange}
//                                             min={new Date().toISOString().slice(0, 16)}
//                                             className={`block w-full p-4 text-black border rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black ${errors.deadline ? "border-red-500" : "border-gray-300"
//                                                 }`}
//                                         />
//                                         {errors.deadline && (
//                                             <p className="mt-1 text-sm text-red-500">{errors.deadline}</p>
//                                         )}
//                                     </div>
//                                 </div>

//                                 <div className="flex justify-end space-x-4">
//                                     <button
//                                         type="button"
//                                         onClick={handleCloseDialog}
//                                         className="text-gray-500 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:focus:ring-gray-800 transition-colors"
//                                     >
//                                         {t("Cancel")}
//                                     </button>
//                                     <button
//                                         type="submit"
//                                         className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800 transition-colors"
//                                     >
//                                         {t("AddTask")}
//                                     </button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AddTask;

import React from 'react'

function AddTask() {
  return (
    <div>AddTask</div>
  )
}

export default AddTask