import React from 'react';
import { Link } from 'react-router-dom';

export const LandingAppbar: React.FC = () => {
    return (
        <nav className="bg-gray-900 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-2xl font-bold">
                    Medium Clone
                </Link>
                <div>
                    <Link to="/signup" className="text-gray-300 hover:text-white mx-2">
                        Signup
                    </Link>
                    <Link to="/login" className="text-gray-300 hover:text-white mx-2">
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    );
};
