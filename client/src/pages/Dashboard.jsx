import { useState } from "react";
import { useQuery,useMutation,useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import api from '../api/axios'
import EmailModel from '../components/EmailModel'
import {getCurrency} from '../utils/currency'

const Dashboard = () =>{

    const queryClient = useQueryClient();
    const [selectedLead,setSelectedLead]=useState(null);
    const [emailDraft,setEmailDraft] = useState(null);
    const [isModalOpen,setIsModalOpen] = useState(false);

    const {data:leads,isLoading}=useQuery({
        queryKey: ['leads'],
        queryFn:async () => {
            const res=await api.get('/leads');
            return res.data;
        }
    });

    const scoreMutation = useMutation({
        mutationFn:async (id) => {
            const res=await api.post(`/leads/${id}/score`);
            return res.data;
        },
        onSuccess:()=>{
            queryClient.invalidateQueries(['leads']);
        }
    });

    const emailMutation = useMutation({
        mutationFn:async (id) => {
            const res = await api.post(`/leads/${id}/email`);
            return res.data;
        },
        onSuccess:(data,variables)=>{
            //variable is id , but we need the lead object. Find it.
            const lead=leads.find(l=>l._id ===variables);
            setSelectedLead(lead);
            setEmailDraft(data);
            setIsModalOpen(true);
        }
    });

    const convertMutation = useMutation({
        mutationFn: async (id) => {
            const res=await api.post(`/leads/${id}/convert`);
            return res.data;
        },
        onSuccess:(data)=>{
            alert(data.message);
            queryClient.invalidateQueries(['leads']);
        },
        onError:(err)=>{
            alert(err.response?.data?.message || 'Conversion Failed');
        }
    });

    const sendEmailMutation = useMutation({
        mutationFn:async ({ id,subject,body}) => {
            const res = await api.post(`/leads/${id}/email/send`,{subject,body});
            return res.data;
        },
        onSuccess:()=>{
            alert('Email send successfully via Server!');
            setIsModalOpen(false);
        },
        onError:(err)=>{
            alert(err.response?.data?.message || 'Failed to send email ');
        }
    });

    const deleteLoadingMutation = useMutation({
        mutationFn:async (id) => {
            await api.delete(`/leads/${id}`);
        },
        onSuccess:()=>{
            queryClient.invalidateQueries(['leads']);
        }
    });

    if(isLoading) return <div className="text-white">Loading...</div>

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                    <h3 className="text-slate-400 text-sm font-medium mb-1">Total Leads</h3>
                    <p className="text-2xl font-bold text-white">{leads?.length || 0}</p>
                </div>
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                    <h3 className="text-slate-400 text-sm font-medium mb-1">Pipeline Value</h3>
                    <p className="text-2xl font-bold text-emerald-400">{getCurrency()}{leads?.reduce((acc, lead) => acc + (lead.value || 0), 0).toLocaleString()}</p>
                </div>
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                    <h3 className="text-slate-400 text-sm font-medium mb-1">Avg Score</h3>
                    <p className="text-2xl font-bold text-blue-400">
                        {leads?.length ? Math.round(leads.reduce((acc, l) => acc + (l.aiScore || 0), 0) / leads.length) : 0}
                    </p>
                </div>
            </div>

            {/* Leads Table */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
                <div className="p-6 border-b border-slate-700 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">Recent Leads</h2>
                    <Link to="/leads" className="text-indigo-400 hover:text-indigo-300 text-sm font-medium">
                        View All Leads →
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-400">
                        <thead className="bg-slate-900/50 uppercase font-medium">
                            <tr>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Score</th>
                                <th className="px-6 py-4">Value</th>
                                <th className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700">
                            {leads?.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                                        No leads found. Add your first one!
                                    </td>
                                </tr>
                            ) : (
                                leads?.slice(0, 5).map((lead) => (
                                    <tr key={lead._id} className="hover:bg-slate-700/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-white">
                                            <Link to={`/leads/${lead._id}`} className="hover:underline hover:text-indigo-400">
                                                <div>{lead.firstName} {lead.lastName}</div>
                                            </Link>
                                            <div className="text-xs text-slate-500">{lead.email}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-xs font-medium 
                                                ${lead.status === 'new' ? 'bg-blue-500/10 text-blue-400' :
                                                    lead.status === 'won' ? 'bg-emerald-500/10 text-emerald-400' :
                                                        'bg-slate-600/20 text-slate-300'}`}>
                                                {lead.status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {lead.aiScore ? (
                                                <div className="group relative flex items-center gap-2 cursor-help">
                                                    <span className={`font-bold ${lead.aiScore > 70 ? 'text-emerald-400' : 'text-yellow-400'}`}>
                                                        {lead.aiScore}
                                                    </span>
                                                </div>
                                            ) : (
                                                <span className="text-slate-500">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">{getCurrency()}{lead.value?.toLocaleString() || 0}</td>
                                        <td className="px-6 py-4">
                                            <Link to={`/leads/${lead._id}`} className="text-indigo-400 hover:text-indigo-300">
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <EmailModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                emailData={emailDraft}
                recipientEmail={selectedLead?.email}
                onSend={(subject, body) => sendEmailMutation.mutate({ id: selectedLead._id, subject, body })}
                isSending={sendEmailMutation.isPending}
            />
        </div>
    );

}

export default Dashboard;