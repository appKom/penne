import Link from "next/link"

export const Navbar = ({img}) => {
    return(
        <div className="h-full w-full flex justify-between items-center p-5">
            <img src={img} alt="Logo" className="w-36 h-full"/>
            <div className="flex space-x-20 mx-auto">
                <Link href={"/omoss"} className="text-white font-roboto text-lg pt-1">Om oss</Link>
                <Link href={"/soknad"} className="text-white font-roboto text-lg pt-1">Søknader</Link>
            </div>
            <div className="w-36 h-full"></div>
        </div>
    )
}
