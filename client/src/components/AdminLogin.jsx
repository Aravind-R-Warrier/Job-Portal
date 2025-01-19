import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

function AdminLogin() {
    const [state, setState] = useState('Login');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);
    const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false);

    const { setShowAdminLogin, backendUrl, setAdminToken, setAdminData } = useContext(AppContext);
    const navigate = useNavigate();

    // Handle form submission
    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (state === 'Sign Up' && !isTextDataSubmitted) {
            setIsTextDataSubmitted(true);
            return;
        }

        try {
            if (state === 'Login') {
                const { data } = await axios.post(`${backendUrl}/api/admin/login`, { email, password });
                if (data.success) {
                    setAdminData(data.admin);
                    setAdminToken(data.token);
                    localStorage.setItem('adminToken', data.token);
                    setShowAdminLogin(false);
                    navigate('/adminDashboard');
                } else {
                    toast.error('Incorrect email or password');
                }
            } else {
                const formData = new FormData();
                formData.append('name', name);
                formData.append('email', email);
                formData.append('password', password);
                if (image) formData.append('image', image);

                const { data } = await axios.post(`${backendUrl}/api/admin/register`, formData);
                if (data.success) {
                    setAdminData(data.admin);
                    setAdminToken(data.token);
                    localStorage.setItem('adminToken', data.token);
                    setShowAdminLogin(false);
                    navigate('/adminDashboard');
                } else {
                    toast.error(data.message);
                }
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div className="absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
            <form onSubmit={onSubmitHandler} className="relative bg-white p-10 rounded-xl text-slate-500">
                <h1 className="text-center text-2xl text-neutral-700 font-medium">Admin {state}</h1>
                <p className="text-sm">Welcome back! Please sign in to continue</p>

                {state === 'Sign Up' && isTextDataSubmitted ? (
                    <div className="flex items-center gap-4 my-10">
                        <label htmlFor="image">
                            <img
                                className="w-16 rounded-full"
                                src={image ? URL.createObjectURL(image) : assets.upload_area}
                                alt="Admin Logo"
                            />
                            <input
                                onChange={(e) => setImage(e.target.files[0])}
                                type="file"
                                hidden
                                id="image"
                            />
                        </label>
                        <p>Upload Admin<br />Logo</p>
                    </div>
                ) : (
                    <>
                        {state !== 'Login' && (
                            <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
                                <img src={assets.person_icon} alt="Person Icon" />
                                <input
                                    className="outline-none text-sm"
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    type="text"
                                    placeholder="Admin Name"
                                    required
                                />
                            </div>
                        )}
                        <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
                            <img src={assets.email_icon} alt="Email Icon" />
                            <input
                                className="outline-none text-sm"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                type="email"
                                placeholder="Email"
                                required
                            />
                        </div>
                        <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
                            <img src={assets.lock_icon} alt="Lock Icon" />
                            <input
                                className="outline-none text-sm"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                type="password"
                                placeholder="Password"
                                required
                            />
                        </div>
                    </>
                )}

                {state === 'Login' && <p className="text-sm text-blue-600 mt-4 cursor-pointer"></p>}

                <button
                    type="submit"
                    className="bg-blue-600 w-full text-white py-2 rounded-full mt-4"
                >
                    {state === 'Login' ? 'Login' : isTextDataSubmitted ? 'Create Account' : 'Next'}
                </button>

                {state === 'Login' ? (
                    <p className="mt-5 text-center">
            
                        <span
                            className="text-blue-600 cursor-pointer"
                            onClick={() => setState('Sign Up')}
                        >
                          
                        </span>
                    </p>
                ) : (
                    <p className="mt-5 text-center">
                        Already have an account?{' '}
                        <span
                            className="text-blue-600 cursor-pointer"
                            onClick={() => setState('Login')}
                        >
                            Log In
                        </span>
                    </p>
                )}
                <img
                    onClick={() => setShowAdminLogin(false)}
                    className="absolute top-5 right-5 cursor-pointer"
                    src={assets.cross_icon}
                    alt="Close Icon"
                />
            </form>
        </div>
    );
}

export default AdminLogin;
