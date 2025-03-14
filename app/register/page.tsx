import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import RegisterForm from '@/components/RegisterForm';

export default async function RegisterPage() {
    const session = await getServerSession(authOptions);

    if (session) {
        redirect('/');
    }

    return (
        <main className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>
                <RegisterForm />
            </div>
        </main>
    );
}