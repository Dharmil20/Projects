const Navbar = ()=>{
    return(
        <nav className="flex justify-between max-w-7xl mx-auto py-8 items-center">
        <div>
            <img src="/assets/brand_logo.png" alt="" />
        </div>
        <ul className="flex gap-6 font-poppins">
            <li>MENU</li>
            <li>LOCATION</li>
            <li>ABOUT</li>
            <li>CONTACT</li>
        </ul>
        <button className="bg-btn-red text-white py-1.5 px-4 font-poppins font-500 ">Login</button>
    </nav>
    )
}

export default Navbar;