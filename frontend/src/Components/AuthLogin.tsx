import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Spinner } from './Spinner';
import {BACKEND_URL} from "../Config.ts";

export function AuthLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    axios.defaults.withCredentials = true;

    const registerLogin = async (ev: { preventDefault: () => void; }) => {
        ev.preventDefault();
        setLoading(true)

        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
                email,
                password,
            });

            const jwt = response.data;
            localStorage.setItem("token", jwt);
            setLoading(false);
            navigate("/blogs");
        } catch (error) {
            console.error('Login failed:', error);
            alert('Wrong credentials');
            setLoading(false)
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center">
            {loading?(
                <Spinner/>
            ):(
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 font-semibold">Email</label>
                        <input type="text" id="username" className="w-full px-3 py-2 border rounded-md mt-1" placeholder="Enter your Email" value={email} onChange={(event) => setEmail(event.target.value)} />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 font-semibold">Password</label>
                        <input type="password" id="password" className="w-full px-3 py-2 border rounded-md mt-1" placeholder="Enter your password" value={password} onChange={(event) => setPassword(event.target.value)} />
                    </div>
                    <button type="submit" className="w-full bg-black text-white font-semibold py-2 px-4 rounded-md hover:bg-black transition duration-300" onClick={registerLogin}>Login</button>
                    <p>Dont have an account? <Link to="/signup" className="text-blue-500 hover:underline">Register here.</Link></p>
                </form>
            </div>
            )}
        </div>
    );
}
