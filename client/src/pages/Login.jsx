import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import api from '../api/axios'

const Login = ()=>{

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [error,setError]=useState('');
    const [isLoading,setIsLoading]=useState(false);
    const navigate=useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {

            const {data}=await api.post('/auth/login',{email,password});
            localStorage.setItem('token',data.token);
            localStorage.setItem('user',JSON.stringify(data));
            navigate('/dashboard');
            
        } catch (err) {
            setError(err.response?.data?.message || "Login Failed");
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950">
            <div className="bg-slate-900 p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-800">
                <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                    Welcome Back
                </h2>
                {error && <div className="bg-red-500/10 text-red-400 p-3 rounded mb-4 text-sm text-center">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-slate-400 text-sm mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-slate-400 text-sm mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white font-medium py-3 rounded transition-colors shadow-lg shadow-indigo-500/20 flex justify-center items-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                                Signing In...
                            </>
                        ) : 'Sign In'}
                    </button>
                </form>
                <div className="mt-6 text-center text-sm text-slate-400">
                    Don't have an account? <Link to="/register" className="text-indigo-400 hover:text-indigo-300">Start for free</Link>
                </div>
            </div>
        </div>
    );

}

export default Login;