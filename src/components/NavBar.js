import React from 'react';
import pillsIcon from '../assets/icons/pilulier.png';
import pills from '../assets/icons/pilules.png'
import profil from '../assets/icons/profil.png'

const NavBar = () => {
    return (
        <nav className="bg-white fixed bottom-0 left-0 w-full h-24 flex justify-around items-center text-white shadow-nav">
            <button className="flex flex-col items-center">
                <img src={pills} alt="Médicaments" className="w-12" />
            </button>
            <button className="flex flex-col items-center">
                <img src={pillsIcon} alt="Pilulier" className="w-12" />
            </button>
            <button className="flex flex-col items-center">
                <img src={profil} alt="Profil" className="w-12" />
            </button>
        </nav>
    );
};

export default NavBar;
