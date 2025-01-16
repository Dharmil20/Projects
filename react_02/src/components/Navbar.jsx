const Navbar = () => {
    return(
        <div className="flex items-center justify-between font-poppins max-w-7xl mx-auto">
            <img src="src/assets/hero_logo.png" alt="" />
            <ul className="flex gap-x-6 text-txt-color text-base font-semibold">
                <li>HOME</li>
                <li>ABOUT</li>
                <li>CONTACT</li>
            </ul>
        </div>
    );
}

export default Navbar;