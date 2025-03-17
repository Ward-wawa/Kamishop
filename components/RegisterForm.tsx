'use client';

import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Link from 'next/link';
import ClipLoader from 'react-spinners/ClipLoader';
import axiosInstance from "@/utils/axiosConfig";
import {Eye, EyeClosed} from "lucide-react"

export default function LoginForm() {
    const [name,setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const[showPass,setShowPass] = useState(false);
    const router = useRouter();

    const handlePassShow = () => {
        setShowPass(!showPass);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        if (password.length < 6) {
            toast.error("Password can't be less than 6 characters!")
            setLoading(false);
            return
        }

        try {
            const result = await axiosInstance.post('/auth/register', {
                name,
                email,
                password
            });

            if (result.data.success) {
                toast.success('Registration successful!');

                await signIn('credentials', {
                    email,
                    password,
                    redirect: false,
                });
            }
            toast.success('Logged in successfully!');
            router.push('/');
            router.refresh();
        } catch (error) {
            toast.error('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md max-md:w-[60vw] mx-auto">
            <div className="mb-4">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    max={24}
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full p-2 max-md:pr-10 border rounded"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    maxLength={48}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-2 max-md:pr-10 border rounded"
                />
            </div>
            <div className="mb-8 relative">
                <label htmlFor="password">Password</label>
                <input
                    type={showPass ? "text" : "password"}
                    id="password"
                    value={password}
                    maxLength={32}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-2 max-md:pr-10 border rounded"
                />
                <span onClick={handlePassShow}
                      className="absolute -right-11 cursor-pointer max-md:right-2 max-md:top-8">
                    {showPass ? (
                        <>
                            <Eye className="max-md:hidden" size={36}/>
                            <Eye className="md:hidden" color="black" size={28}/>
                        </>
                    ) : (
                        <>
                            <EyeClosed className="max-md:hidden" size={36}/>
                            <EyeClosed className="md:hidden" color="black" size={28}/>
                        </>
                    )}
                </span>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-black font-bold p-2 rounded transition hover:text-white hover:bg-black disabled:bg-gray-400"
            >
                {loading ? (<ClipLoader/>) : 'Register'}
            </button>
            <div className="mt-4 text-center max-md:text-sm">
                <span className="text-gray-600">Already have an account? </span>
                <Link href="/login" className="text-white hover:underline">
                    Log in here
                </Link>
            </div>
        </form>
    );
}