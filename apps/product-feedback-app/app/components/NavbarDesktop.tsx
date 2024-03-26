import LogoDesktop from "./LogoDesktop";
import Roadmap from "./Roadmap";
import Tags from "./Tags";

export default function NavbarDesktop({ className }: { className: string }) {
    return <div className={`flex flex-col ${className}`}>
        <LogoDesktop className="mb-5" />
        <Tags className="mb-5" />
        <Roadmap />
    </div>
}