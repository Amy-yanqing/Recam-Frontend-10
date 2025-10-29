import { useState } from 'react';
import { useUser } from '../hooks/useUser';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loading, error, handleLogin } = useUser();

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin({ email, password });
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100'>

            <div className='bg-white shadow-lg 
        rounded-2xl p-8 w-full max-w-md animate-fade-in'>
                <h1 className="text-2xl font-bold text-center mb-6">Log in to continue</h1>
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none" />
                    <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none" />
                    <button type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 hover:scale-105 transition"
                    >{loading? 'Logging in...':'Login'}</button>
                </form>
                <p className="text-sm text-center text-gray-500 mt-4">Forget password?
                    <a href='#' className='text-blue-600 hover:underline'> Find your password here</a>
                </p>

                {error&&(
                    <p className="text-red-500 text-center text-sm mt-2">
                    {error}
                    </p>
                )}

            </div>
        </div>

    )


}

export default LoginPage;