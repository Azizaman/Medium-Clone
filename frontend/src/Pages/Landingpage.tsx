import React from 'react';
import { Link } from 'react-router-dom';
import { LandingAppbar } from '../Components/LandingAppbar';


const LandingPage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <LandingAppbar/>
            
            <div className="flex-grow flex flex-col items-center justify-center bg-gray-100">
                <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
                    Welcome to Medium Clone
                </h1>
                <p className="text-xl text-gray-700 mb-8 text-center max-w-xl">
                    A platform where you can share your thoughts, read interesting articles, and connect with a vibrant community.
                </p>
                <Link to="/signin" className="bg-gray-900 bg-gray-900 text-white font-bold py-2 px-4 rounded-full">
                    Click to Login
                </Link>
            </div>
            <footer className="bg-gray-900 text-white text-center p-4">
                © {new Date().getFullYear()} Medium Clone. All rights reserved.
            </footer>
        </div>
    );
};

export default LandingPage;
