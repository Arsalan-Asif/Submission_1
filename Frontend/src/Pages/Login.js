import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validError, setValidError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:4010/login", {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            Object.keys(data).forEach(key => {
                localStorage.setItem(key, data[key]);
            });
            
            if (data.role === 'admin') {
                navigate('/admin')
            } else {
                navigate('/')
            }

        } catch (error) {
            console.error("Error:", error);
            setValidError("Invalid email or password");
        }
    };

    return (
        <div>
            <Header />
            <div className="bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="bg-gray-200 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
                    <div className="md:w-1/2 px-8 md:px-9">
                        <h2 className="font-bold text-2xl text-blue-700">Login</h2>
                        <p className="text-s mt-4 text-black">If you are already a member, Log in</p>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <input className="p-2 mt-8 rounded-xl border" type="email" name="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                            <div className="relative">
                                <input className="p-2 rounded-xl border w-full" type="password" name="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                            </div>
                            {validError && <p className='text-md text-red-600'>{validError}</p>}
                            <button type="submit" className="bg-blue-700 rounded-xl text-white py-2 hover:scale-105 hover:bg-blue-400 duration-300 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:scale-100">
                                Login
                            </button>
                        </form>

                        <div className="mt-2 text-s border-b border-blue-700 py-4 text-blue-700">
                            <p>Forgot your password?</p>
                        </div>

                        <div className="mt-3 text-s flex justify-between items-center text-blue-700">
                            <p>Don't have an account?</p>
                            <Link to="/register" className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">Register</Link>
                        </div>
                    </div>
                    <div className="md:block hidden w-1/2">
                        <img className="rounded-2xl" src="https://img.freepik.com/free-psd/shopping-vertical-background_23-2150409475.jpg?t=st=1711485055~exp=1711485655~hmac=d4ec020a4acdc2527b355db84ab78a768ada85cc0f5f4aaecc06cbcdd6672262" alt="Login" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
