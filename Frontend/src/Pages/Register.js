import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [contact_number, setContactNumber] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState('')
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [usernameError, setUsernameError] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        setConfirmPasswordError(password === confirmPassword ? "" : "Password does not match");
    }, [password, confirmPassword]);

    useEffect(() => {
        if (username.length > 0) {
            setUsernameError(username.length >= 3 ? "" : "Username must be at least 3 characters long");
        } else {
            setUsernameError("");
        }
    }, [username]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (usernameError !== "" || confirmPasswordError !== "") {
            return; // Don't submit the form if username or password is invalid
        }
        try {
            const response = await fetch("http://localhost:4010/register", {
                method: 'POST',
                body: JSON.stringify({ email, username, contact_number, password, confirmPassword, role }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json()

            Object.keys(data).forEach(key => {
                localStorage.setItem(key, data[key]);
            })
            navigate("/")
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <Header />
            <div className="bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="bg-gray-200 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
                    <div className="md:w-1/2 px-8 md:px-9">
                        <h2 className="font-bold text-2xl text-blue-700">Register Here</h2>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <input className="p-2 mt-8 rounded-xl border" id="email" type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input className="p-2 rounded-xl border" id="username" type="text" name="username" placeholder="User Name" value={username} onChange={(e) => setUsername(e.target.value)} />
                            {usernameError !== "" && <p className='text-sm text-red-600'>{usernameError}</p>}
                            <input className="p-2 rounded-xl border" id="contact_number" type="tel" name="number" placeholder="Contact Number" value={contact_number} onChange={(e) => setContactNumber(e.target.value)} />
                            <input className="p-2 rounded-xl border w-full" id="password" type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <input className="p-2 rounded-xl border w-full" type="password" id="confirmPassword" name="confirmpassword" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            {confirmPasswordError !== "" && <p className='text-sm text-red-600'>{confirmPasswordError}</p>}
                            <button disabled={confirmPasswordError !== "" || usernameError !== ""} type="submit" className="bg-blue-700 rounded-xl text-white py-2 hover:scale-105 disabled:bg-slate-400 disabled:cursor-not-allowed duration-300 disabled:scale-100">
                                Register
                            </button>

                        </form>

                        <div className="text-s border-b border-blue-700 py-4 text-blue-700"></div>
                        <div className="mt-3 text-s flex justify-between items-center text-blue-700">
                            <p>Already have an account?</p>
                            <Link to="/login" className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">
                                Log in
                            </Link>
                        </div>
                    </div>
                    <div className="md:block hidden w-1/2">
                        <img
                            className="rounded-2xl"
                            src="https://img.freepik.com/free-psd/shopping-vertical-background_23-2150409473.jpg?w=360&t=st=1711564938~exp=1711565538~hmac=6b11848e7a089e8ddf8fac531079a2f40da25416617064c8b2b17ce8b98bbb9f"
                            alt="Register"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
