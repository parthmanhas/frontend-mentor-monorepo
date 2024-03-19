import LogoTab from "./LogoTab";
import Roadmap from "./Roadmap";
import Tags from "./Tags";

export default function NavbarTab() {
    return (
        <div className="w-full md:grid md:grid-cols-3 md:gap-2 md:h-[200px]">
            <LogoTab />
            <Tags />
            <Roadmap />
        </div>
    )

}