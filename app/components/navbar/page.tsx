'use client'

import Link from "next/link";
import backIcon from '../../../public/assets/icons/back.png'
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function NavBar(){
    const pathname = usePathname();

    return(
        <div className="navbar z-10 flex sm:justify-end justify-start w-full gap-16 h-[5rem] p-8 sm:pr-16 pl-3">
            
            {pathname === '/notes' && (
                <Link className="sm:hidden flex h-[2rem]" href='/'>
                    <Image 
                        src={backIcon} 
                        alt="Navigate back icon"
                        style={{objectFit: "contain"}}
                    />
                </Link>
            )}
            
            <Link className="hidden sm:flex text-lg font-medium" href='/'>
                Home
            </Link>
            <Link className="hidden sm:flex text-lg font-medium" href='/notes' >
                Notes
            </Link>
        </div>
    )
}