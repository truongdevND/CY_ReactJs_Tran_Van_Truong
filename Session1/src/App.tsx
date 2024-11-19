import Table from "./components/Table"
import AddTask from "./components/AddTask"
import { useTranslation } from "react-i18next";
import { useState } from "react";


function App() {
    const { t, i18n } = useTranslation()
    const [currentLanguage, setCurrentLanguage] = useState('en')

    return (
        <div className="relative shadow-md sm:rounded-lg p-12 dark:bg-gray-900">
            <h1 className="text-center text-4xl text-white font-bold my-4">TODO LIST</h1>
            <div className="min-h-screen relative">
                <div className="text-white">
                    <form className="max-w-sm mx-auto mt-4">
                        <label
                            htmlFor="language-select"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Select a language
                        </label>
                        <select
                            id="language-select"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => {
                                const selectedLanguage = e.target.value;
                                setCurrentLanguage(selectedLanguage);
                                i18n.changeLanguage(selectedLanguage);
                            }}
                        >
                            <option value="" disabled selected>
                                Choose a language
                            </option>
                            <option value="en">English</option>
                            <option value="kr">Korean (Korea)</option>
                            <option value="vi">Vietnamese (Vietnam)</option>
                        </select>
                    </form>

                </div>
                <div className="flex mb-5 justify-end gap-5">
                    <AddTask />
                </div>
                <Table />
            </div>
        </div>


    )
}

export default App
