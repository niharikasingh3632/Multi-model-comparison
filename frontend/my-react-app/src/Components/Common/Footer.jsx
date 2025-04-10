import React from 'react'
import { IoLogoInstagram } from 'react-icons/io'
import { FiPhoneCall } from 'react-icons/fi'
import { Link } from "react-router-dom"
import { RiCopyrightLine } from 'react-icons/ri'


const Footer = () => {
    return (
        <footer className='border-t py-12'>
            <div className='container mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 px-4 lg:px-0'>

                {/* support link */}
                <div>
                    <h3 className='text-lg text-gray-800 mb-4'>Support</h3>
                    <ul className='space-y-2 text-gray-600'>
                        <li>
                            <Link to="#" className="hover:text-gray-500 transition-colors" >
                                Contact Us
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="hover:text-gray-500 transition-colors" >
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="hover:text-gray-500 transition-colors" >
                                FAQs
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Follow us */}
                <div>
                    <h3 className='text-lg text-gray-800 mb-4'>Follow Us </h3>
                    <div
                        className='flex items-center space-x-4 mb-6'
                    >
                        <a href='https://facebook.com' target='_blank'
                            rel='nooperner noreferrer'
                            className='hover:text-gray-500'>
                            <IoLogoInstagram className="h-7 w-7" />
                        </a>

                    </div>
                    <p className="text-gray-500">
                        Call Us
                    </p>
                    <FiPhoneCall className='inline-block mr-2' />
                    +91-XXXXXXXXX
                </div>

                {/* FOOTER BOTTOM */}

            </div>
            <div className='container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6'>
                <p className='text-gray-500 text-sm tracking-tighter text-center'>
                    <RiCopyrightLine className='inline-block mr-2' />
                    2025, Multi-model Battle. All Rights Reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer