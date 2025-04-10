import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { HiOutlineUser,  HiBars3BottomRight } from "react-icons/hi2"
import { IoMdClose } from "react-icons/io"

const Navbar = () => {

    const [drawerOpen, setDrawerOpen] = useState(false)

    const [navDrawerOpen, setNavDrawerOpen] = useState(false)

    const toggleNavDrawer = () => {
        setNavDrawerOpen(!navDrawerOpen)

    }

    return (
        <>
            <nav className='container mx-auto flex items-center justify-between py-4 px-4'>
                {/* Left Logo */}
                <div>
                    <Link to="/" className='text-2xl font-medium'>
                        AI-Models Battle
                    </Link>
                </div>
                {/* Center - Navigation */}
                <div className='hidden md:flex space-x-6'>
                    <Link to="#" className='text-gray-700 hover:text-black text-sm font-medium uppercase'>
                        Models
                    </Link>
                    <Link to="#" className='text-gray-700 hover:text-black text-sm font-medium uppercase'>
                        How to Use
                    </Link>
                    <Link to="#" className='text-gray-700 hover:text-black text-sm font-medium uppercase'>
                        About
                    </Link>
                </div>

                {/* Right icons */}
                <div className='flex items-center space-x-4'>
                    <Link to="/profile" className='hover:text-black'>
                        <HiOutlineUser className='h-6 w-6 text-gray-700' />
                    </Link>

                    {/* hamburger ion */}
                    <button
                        onClick={toggleNavDrawer}
                        className='md:hidden'>
                        <HiBars3BottomRight className='h-6 w-6 text-gray-700' />
                    </button>
                </div>
            </nav>

            {/* Mobile Navigation */}
            <div
                className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg
                transform-transition duration-300 z-50 ${navDrawerOpen ? " translate-x-0" : "-translate-x-full"}`}
            >
                <div
                    className='flex justify-end p-4'
                >
                    <button
                        onClick={toggleNavDrawer}
                    >
                        <IoMdClose className="h-6 w-6 text-gray-600" />
                    </button>

                </div>

                <div
                    className='p-4'>
                    <h2 className='text-xl font-semibold mb-4'>Menu</h2>
                    <nav
                        className='space-y-4'
                    >
                        <Link tp='#' onClick={toggleNavDrawer} className='block  text-gray-600 hover:text-black'>
                            BRIDALS
                        </Link>
                        <Link tp='#' onClick={toggleNavDrawer} className='block  text-gray-600 hover:text-black'>
                            SERVICES
                        </Link>
                        <Link tp='#' onClick={toggleNavDrawer} className='block  text-gray-600 hover:text-black'>
                            ACCESSORIES
                        </Link>
                        <Link tp='#' onClick={toggleNavDrawer} className='block  text-gray-600 hover:text-black'>
                            OFFERS
                        </Link>
                    </nav>

                </div>

            </div>

        </>
    )
}

export default Navbar