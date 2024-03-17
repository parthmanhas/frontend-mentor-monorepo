import Logo from "./Logo";
import Roadmap from "./Roadmap";
import Tags from "./Tags";

export default function Navbar() {
    return <div className="grid grid-cols-3 gap-2 h-[200px]">
        <Logo />
        <Tags />
        <Roadmap />
    </div>
}