import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import LoginForm from '@/components/LoginForm';

export const dynamic = 'force-dynamic'
export default async function LoginPage() {
    const session = await getServerSession(authOptions);

    if (session) {
        redirect('/');
    }

    return (
        <main className="h-screen max-md:h-[70vh] flex items-center justify-center p-4">
            <div className="w-full max-w-md max-md:ml-[24vw]">
                <h1 className="text-2xl font-bold mb-6 text-center">Log In</h1>
                <LoginForm />
            </div>
        </main>
    );
}