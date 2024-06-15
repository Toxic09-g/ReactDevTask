import React, { useState } from 'react'
import "../App.css"
import { SidebarData } from './SidebarData'
import Avatar from '../icons/Ellipse 6.png'
import Logo from '../icons/logo.png'

function Sidebar() {
    const [sidebar, setSidebar] = useState(false);

    const toggleSidebar = () => {
        setSidebar(!sidebar);
    };

    return (
        <div>
            
            <div className='Toggle' onClick={toggleSidebar}>
                <span>
                    <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="20" height="2" fill="#9494A0" />
                        <rect y="6" width="20" height="2" fill="#9494A0" />
                        <rect y="12" width="20" height="2" fill="#9494A0" />
                    </svg>
                </span>
                <h1>Права доступа</h1>
            </div>
            <div className={sidebar ? 'Sidebar active' : 'Sidebar'}>
            <div className='Logo'><img src={Logo}/></div>
                <div className='Logo'></div>
                <div className='Profile'>
                    <div className='Avatar'>
                        <img src={Avatar} alt='' />
                    </div>
                    <div className='Info'>
                        <div className='Name'>
                            Артем Иванов
                        </div>
                        <div className='Role'>
                            Собственник
                        </div>
                    </div>
                </div>
                <ul>
                    {SidebarData.map((val, key) => (
                        <li key={key} onClick={() => window.location.pathname = val.link}>
                            <div className='Icon'>{val.icon}</div>
                            <div className='Title'>{val.title}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
