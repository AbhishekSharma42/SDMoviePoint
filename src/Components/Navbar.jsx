import React from 'react'

const Navbar = () => {

    return (
        <div>
            <nav className="p-2 flex justify-between items-center bg-black text-white">
                <button>☰</button>
                <div className='bg-white text-black rounded-full flex items-center px-2 py-1 border-2 border-red-500'>
                    <input type="text" placeholder='search...' className='focus:outline-hidden' />
                </div>
            </nav>
        </div>
    )
}

export default Navbar
