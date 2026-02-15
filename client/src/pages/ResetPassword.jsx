import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: async (password) => {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/reset-password/${token}`, { password });
            return res.data;
        },
        onSuccess: () => {
            alert('Password reset successfully! Please login.');
            navigate('/login');
        },
        onError: (err) => alert(err.response?.data?.message || 'Failed to reset password')
    });

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <div className="bg-slate-800 p-8 rounded-xl shadow-2xl w-full max-w-md border border-slate-700">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">New Password</h2>

                <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const p1 = formData.get('password');
                    const p2 = formData.get('confirmPassword');

                    if (p1 !== p2) return alert('Passwords do not match');
                    mutation.mutate(p1);
                }}>
                    <div className="mb-4">
                        <label className="block text-slate-400 mb-2">New Password</label>
                        <input
                            name="password"
                            type="password"
                            required
                            minLength={6}
                            className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-white focus:outline-none focus:border-indigo-500"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-slate-400 mb-2">Confirm Password</label>
                        <input
                            name="confirmPassword"
                            type="password"
                            required
                            minLength={6}
                            className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-white focus:outline-none focus:border-indigo-500"
                        />
                    </div>

                    <button
                        disabled={mutation.isPending}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded transition-colors disabled:opacity-50"
                    >
                        {mutation.isPending ? 'Resetting...' : 'Set New Password'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
