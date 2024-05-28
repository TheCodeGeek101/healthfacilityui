import React, { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";  // Using FontAwesome icons
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { navLinks } from "../../utils/Constants";

const Navbar = () => {
    const [animationParent] = useAutoAnimate();
    const [showMenu, setMenu] = useState(false);
    const [active, setActive] = useState('');

    function toggleMenu() {
        setMenu(!showMenu);
    }

    return (
        <>
            <div className="bg-primary mx-auto w-full items-center flex justify-between px-5 py-2 md:px-20">
                <section className="items-center flex gap-8">
                    <div className="hidden md:flex my-3.5 gap-6 items-center text-gray-300">
                        {navLinks.map((navLink) => (
                            <Link
                                key={navLink.id}
                                onClick={() => setActive(navLink.label)}
                                href={`/${navLink.id}`} // Assuming your routes match the IDs in navLinks
                            >
                                <div className={`hover:opacity-70 ${active === navLink.label ? 'text-active-class' : ''}`}>
                                    {navLink.label}
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
               
                {showMenu && (
                    <div className="fixed inset-x-0 top-24 mx-8 flex flex-col items-center rounded-xl bg-primary text-white md:hidden">
                        <section className="my-8 flex flex-col items-center gap-6">
                            {navLinks.map((navLink) => (
                                <Link
                                    key={navLink.id}
                                    onClick={() => setActive(navLink.label)}
                                    href={`/${navLink.id}`} // Assuming your routes match the IDs in navLinks
                                >
                                    <div className={`hover:opacity-70 ${active === navLink.label ? 'text-active-class' : ''}`}>
                                        {navLink.label}
                                    </div>
                                </Link>
                            ))}
                        </section>
                        <hr className="mx-auto w-[80%] border-gray-600" />
                       
                    </div>
                )}
                <button
                    ref={animationParent}
                    onClick={toggleMenu}
                    className="text-4xl md:hidden text-gray-400"
                >
                    {showMenu ? <FaTimes /> : <FaBars />}
                </button>
            </div>
        </>
    );
}

export default Navbar;
