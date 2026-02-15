import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [sent, setSent] = useState(false);

    const mutation = useMutation({
        mutationFn: async (email) => {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/forgot-password`, { email });
            return res.data;
        },
        onSuccess: () => setSent(true),
        onError: (err) => alert(err.response?.data?.message || 'Failed to send email')
    });

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <div className="bg-slate-800 p-8 rounded-xl shadow-2xl w-full max-w-md border border-slate-700">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Reset Password</h2>

                {sent ? (
                    <div className="text-center">
                        <div className="text-5xl mb-4">📧</div>
                        <p className="text-slate-300 mb-6">If an account exists for that email, we have sent password reset instructions.</p>
                        <Link to="/login" className="text-indigo-400 hover:text-indigo-300">Back to Login</Link>
                    </div>
                ) : (
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.target);
                        mutation.mutate(formData.get('email'));
                    }}>
                        <div className="mb-6">
                            <label className="block text-slate-400 mb-2">Email Address</label>
                            <input
                                name="email"
                                type="email"
                                required
                                className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-white focus:outline-none focus:border-indigo-500"
                                placeholder="Enter your email"
                            />
                        </div>

                        <button
                            disabled={mutation.isPending}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded transition-colors disabled:opacity-50"
                        >
                            {mutation.isPending ? 'Sending...' : 'Send Reset Link'}
                        </button>

                        <div className="mt-6 text-center">
                            <Link to="/login" className="text-slate-500 hover:text-slate-400 text-sm">
                                Back to Login
                            </Link>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
