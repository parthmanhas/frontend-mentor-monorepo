'use client';

import LogoDesktop from '@/app/components/LogoDesktop';
import Roadmap from '@/app/components/Roadmap';
import Tags from '@/app/components/Tags';
import { useMediaQuery } from '@/hooks/use-media-query';
import LogoTab from '@/app/components/LogoTab';
import LogoMobile from '@/app/components/LogoMobile';
import SuggestionsBar from '@/app/components/SuggestionsBar';
import { ReactNode } from 'react';

export default function Navbar({ children, handleSortChange}: { children: ReactNode, handleSortChange: Function}) {

    const isMobile = useMediaQuery("(min-width: 0px) and (max-width: 767px)");
    const isTab = useMediaQuery("(min-width: 768px) and (max-width: 991px)");
    const isDesktop = useMediaQuery("(min-width: 992px)");

    const desktopNavbar = isDesktop && <div className="grid grid-cols-10 gap-4 overflow-y-auto no-scrollbar">
        <div className={`flex flex-col w-full col-span-3`}>
            <LogoDesktop className="mb-5" />
            <Tags className="mb-5" />
            <Roadmap />
        </div>
        <div className="w-full col-span-10 md:mt-5 lg:mt-0 lg:col-span-7">
            <SuggestionsBar handleSortChange={handleSortChange}/>
            {children}
        </div>
    </div>

    const tabNavbar = isTab && <div>
        <div className="w-full md:grid md:grid-cols-3 md:gap-2 md:h-[200px] mb-5">
            <LogoTab />
            <Tags />
            <Roadmap />
        </div>
        <SuggestionsBar handleSortChange={handleSortChange} />
        {children}
    </div>
    const mobileNavbar = isMobile && <div className='w-full'>
        <LogoMobile />
        <SuggestionsBar handleSortChange={handleSortChange}/>
        {children}
    </div>

    return desktopNavbar || tabNavbar || mobileNavbar;
}