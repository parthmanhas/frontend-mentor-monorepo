import auth from "@/auth";
import LoginForm from "@/components/login-form";
import { getAllUser } from "@/lib/server"

export default async function LoginPage() {

    const session = await auth();
    console.log(session);

    if (!session) return null

    const users = await getAllUser();
    if (!users) {
        console.error('Cannot find users');
        return;
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <LoginForm users={users} />
        </div>
    )
}