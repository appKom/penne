export const Navbar = ({img}) => {
    return(
        <div className="h-full w-full flex justify-between items-center p-5">
            <img src={img} alt="Logo" className="w-36 h-full"/>
            <div className="flex space-x-20 mx-auto">
                <p className="text-white font-roboto text-lg pt-1">Om oss</p>
                <p className="text-white font-roboto text-lg pt-1">Søknader</p>
            </div>
            <div className="w-36 h-full"></div>
        </div>
    )
}
