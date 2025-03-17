"use client"

import { SessionProvider} from "next-auth/react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AuthProvider = ({children}:{children:any})=>{
    return <SessionProvider>{children}</SessionProvider>;
}


export function NotificationProvider() {
    return (
        <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
            theme="colored"
        />
    );
}