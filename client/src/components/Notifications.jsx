import { useState,useEffect } from "react";
import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query';
import {Link} from 'react-router-dom';
import api from '../api/axios'

const Notifications = () =>{

    const [isOpen,setIsOpen] =useState(false);
    const queryClient=useQueryClient();

    const {data : notifications = [] }= useQuery({
        queryKey:['notifications'],
        queryFn:async()=>(await api.get('/notifications')).data,
        refetchInterval:30000 //Poll every 30s
    });

    const markReadMutation = useMutation({
        mutationFn: async(id)=>{
            await api.put(`/notifications/${id}/read`);
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries(['notifications']);
        }
    });

    const unreadCount = notifications.filter(n=>!n.isRead).length;




    return(
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-slate-400 hover:text-white transition-colors"
            >
                <span className="text-xl">🔔</span>
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-slate-900">
                        {unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
                    <div className="absolute right-0 mt-2 w-80 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl z-20 overflow-hidden">
                        <div className="p-3 border-b border-slate-700 font-bold text-white flex justify-between items-center">
                            <span>Notifications</span>
                            <span className="text-xs text-slate-400">{notifications.length} recent</span>
                        </div>
                        <div className="max-h-96 overflow-y-auto">
                            {notifications.length === 0 ? (
                                <div className="p-8 text-center text-slate-500 text-sm">
                                    No notifications yet.
                                </div>
                            ) : (
                                notifications.map(notification => (
                                    <div
                                        key={notification._id}
                                        className={`p-3 border-b border-slate-700 last:border-0 hover:bg-slate-700/50 transition-colors ${!notification.isRead ? 'bg-slate-700/20' : ''}`}
                                        onClick={() => {
                                            if (!notification.isRead) markReadMutation.mutate(notification._id);
                                            setIsOpen(false);
                                        }}
                                    >
                                        <Link to={notification.link || '#'} className="block">
                                            <div className="flex gap-2 items-start">
                                                <div className={`mt-1 w-2 h-2 rounded-full shrink-0 
                                                    ${notification.type === 'success' ? 'bg-emerald-400' :
                                                        notification.type === 'error' ? 'bg-red-400' :
                                                            'bg-blue-400'}`}></div>
                                                <div>
                                                    <p className={`text-sm ${!notification.isRead ? 'text-white font-medium' : 'text-slate-400'}`}>
                                                        {notification.message}
                                                    </p>
                                                    <p className="text-xs text-slate-500 mt-1">
                                                        {new Date(notification.createdAt).toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Notifications;