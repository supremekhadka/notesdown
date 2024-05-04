import Link from "next/link";

export default function NavBar(){
    return(
        <div className="navbar flex justify-end  w-full gap-16 p-7 pr-14
        bg-gradient-to-r from-black/10 to-gray-700/0 bg-blur-lg
        ">
            <Link href='/'>
                Home
            </Link>
            <Link href='/notes'>
                Notes
            </Link>
        </div>
    )
}