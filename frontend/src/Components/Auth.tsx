import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Spinner } from "./Spinner";
import { BACKEND_URL } from "../Config"; // Import the BACKEND_URL


export const Auth = () => {
    const navigate=useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email,setEmail]=useState()
    const [loading,setLoading]=useState(false)
    const [error, setError] = useState<string | null>(null); // Initialize error state


    function register(ev: { preventDefault: () => void; }) {
        ev.preventDefault();
        setLoading(true)

        const postData = {
            username: username,
            email:email,
            password: password
        };


        axios.post(`${BACKEND_URL}/api/v1/user/signup`, postData)
            .then(response => {
                console.log('Registration successful:');
                const jwt=response.data;
                localStorage.setItem("token",jwt)
                navigate("/blogs")
                setLoading(false)//stop loading after data is fetched

                // Further actions based on server response
            })
            .catch(error => {
                console.error('Registration failed:', error);
                if (error.response?.status === 409) {
                    setError('Email already taken');
                    alert('Email already taken ');
                } else {
                    setError('Wrong credentials');
                    alert('wrong credentials');
                }
                setLoading(false)//stop loading when error has occured
                // Further actions based on error response
            });
    }

    return (
        <div className="h-screen flex justify-center items-center">
            {loading?(
                <Spinner/>
            ):(
            <div className="text-center">
                <div className="text-3xl font-extrabold mb-4">
                    Create an account
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
                    <form>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-gray-700 font-semibold">Username</label>
                            <input
                                type="text"
                                id="username"
                                className="w-full px-3 py-2 border rounded-md mt-1"
                                placeholder="Enter your username"
                                value={username}
                                onChange={event => setUsername(event.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-semibold">Email</label>
                            <input
                                type="text"
                                id="email"
                                className="w-full px-3 py-2 border rounded-md mt-1"
                                placeholder="Enter your email"
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-gray-700 font-semibold">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="w-full px-3 py-2 border rounded-md mt-1"
                                placeholder="Enter your password"
                                value={password}
                                onChange={event => setPassword(event.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-black text-white font-semibold py-2 px-4 rounded-md hover:bg-black-600 transition duration-300"
                            onClick={register}
                        >
                            Sign Up
                        </button>
                        <p className="mt-4">Already have an account? <Link to="/signin" className="text-blue-500 font-semibold hover:underline">Sign In</Link></p>
                    </form>
                </div>
            </div>
            )}
        </div>
    );
};


