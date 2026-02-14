import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios"

const Register = () => {


    const [formData,setFormData]=useState({
        orgName: '',
        name:'',
        email:'',
        password:''
    });

    const [error,setError]=useState('');
    const [isLoading,setIsLoading]=useState(false);
    const navigate=useNavigate();

    const handleChange = (e) =>{
        setFormData({...formData,[e.target.name]:e.target.value});
    };

    const handleSubmit =async(e)=>{
        e.preventDefault();
        setIsLoading(true);
        try {

            const { data }= await api.post('/auth/register',formData);
            localStorage.setItem('token',data.token);
            localStorage.setItem('user',JSON.stringify(data));
            navigate('/dashboard');
            
        } catch (err) {
            setError(err.response?.data?.message || 'Registration Failed');
            setIsLoading(false);
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950">
            <div className="bg-slate-900 p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-800">
                <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                    Start Your SalesFlow
                </h2>
                <p className="text-center text-slate-400 mb-8">Zero cost, maximum efficiency.</p>

                {error && <div className="bg-red-500/10 text-red-400 p-3 rounded mb-4 text-sm text-center">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-slate-400 text-sm mb-2">Organization Name</label>
                        <input
                            type="text"
                            name="orgName"
                            value={formData.orgName}
                            onChange={handleChange}
                            className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-slate-400 text-sm mb-2">Your Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-slate-400 text-sm mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-slate-400 text-sm mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white font-medium py-3 rounded transition-colors shadow-lg shadow-indigo-500/20 mt-2 flex justify-center items-center gap-2"
                    >
                        {isLoading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>
                <div className="mt-6 text-center text-sm text-slate-400">
                    Already have an account? <Link to="/login" className="text-indigo-400 hover:text-indigo-300">Sign in</Link>
                </div>
            </div>
        </div>
    );


}



export default Register;
