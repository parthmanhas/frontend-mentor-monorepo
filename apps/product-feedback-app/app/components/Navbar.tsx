import Logo from "./Logo";
import Roadmap from "./Roadmap";
import Tags from "./Tags";

export default function Navbar() {
    return (
        <div className="w-full md:grid md:grid-cols-3 md:gap-2 md:h-[200px]">
            <Logo />
            <Tags />
            <Roadmap />
        </div>
    )

}