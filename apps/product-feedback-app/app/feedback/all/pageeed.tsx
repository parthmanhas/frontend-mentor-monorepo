import ClientComponent from "@/app/components/ClientComponent";


// This is your page component (a server component by default in Next.js)
export default function Page() {
    return (
        <div>
            <h1>Server Component</h1>
            <ClientComponent message="Hello from server component!" />
        </div>
    );
}
