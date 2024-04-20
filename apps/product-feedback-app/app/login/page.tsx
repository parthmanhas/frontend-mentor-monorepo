export default function Login() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-east-bay-900 w-full">
            <h1 className="mb-5">Feedback App</h1>
            <form className="flex flex-col">
                <div className="flex flex-col mb-3">
                    <label htmlFor="email-username-input">Email/Username</label>
                    <input id="email-username-input" type="text" className="outline-royal-blue-500"></input>
                </div>
                <div className="flex flex-col mb-5">
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" className="outline-royal-blue-500"></input>
                </div>
                <button type="submit">Login/Signup</button>
            </form>
        </main>
    );
}
