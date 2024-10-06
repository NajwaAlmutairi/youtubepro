import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom';


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const apiUrl = 'https://66e7e6a0b17821a9d9da6f05.mockapi.io/logIn';
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!username || !password) {
            setErrorMessage('الرجاء تعبئة جميع الحقول');
            return;
        }
        setErrorMessage('');

        axios.get(apiUrl)
            .then(function (response) {
                const users = response.data;
                const userExists = users.some(ele => ele.username === username && ele.password === password);
                if (userExists) {
                    localStorage.setItem('username', username);
                    navigate("/home");
                } else {
                    setErrorMessage("يوجد خطأ في أسم الحساب أو في كلمة المرور التي أدخلتها");
                }
            })
            .catch(function (error) {
                console.log(error);
                setErrorMessage('حدث خطأ الرجاء المحاولة مرة أخرى');
            })
    };
    useEffect(() => {
        setErrorMessage('');
    }, [username, password])

    useEffect(() => {
        if(localStorage.getItem('username')){
            localStorage.removeItem('username');
        }
    }, [])

    return (
        <>
            <div className='flex items-center justify-center h-screen bg-gray-100'>
                <div className='w-96 bg-white rounded-lg p-4'>
                    <div className='flex justify-center items-center mb-3'>
                        <img src={logo} alt="logo" className='h-6' />
                    </div>
                    <div className='flex justify-center items-center mb-3 mt-5'>
                       <h1 className="text-[#606060] text-2xl font-bold">تسجيل الدخول</h1>
                    </div>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                        <div> <label htmlFor="username" className='font-bold mb-4 text-sm text-[#606060]' > اسم الحساب </label>
                            <input className="w-full text-[#0f0f0f] py-2 px-3 border rounded-xl focus:outline-slate-200"
                                id="username"
                                type="text"
                                placeholder="أدخل اسم الحساب"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className='font-bold text-sm text-[#606060] mb-4' > كلمة المرور</label>
                            <input className="w-full text-[#0f0f0f] py-2 px-3 border rounded-xl focus:outline-slate-200"
                                id="password"
                                type="password"
                                placeholder="********"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className='mt-3'></div>
                        {errorMessage && (
                            <div className="text-red-500 mb-2">
                                {errorMessage}
                            </div>
                        )}
                        <div className='flex justify-center items-center'>
                            <button className="bg-red-400 hover:bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none "
                                type="submit"
                            >
                                تسجيل دخول
                            </button>
                        </div>
                    </form>
                    <p className="text-[.9rem] text-center text-gray-600 mt-4 ">
                        ليس لديك حساب؟{' '}
                        <Link to={'/register'} className="text-blue-500 hover:text-blue-700">
                            أنشى حساب
                        </Link>
                    </p>
                </div>

            </div>
        </>
    )
}

export default Login