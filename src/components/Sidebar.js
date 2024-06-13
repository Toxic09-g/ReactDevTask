import React from 'react'
import "../App.css"
import { SidebarData } from './SidebarData'
import Avatar from '../icons/Ellipse 6.png'

function Sidebar() {

    return (
        <div className='Sidebar'>
            <div className='Toogle'>
                <span><svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="20" height="2" fill="#9494A0" />
                    <rect y="6" width="20" height="2" fill="#9494A0" />
                    <rect y="12" width="20" height="2" fill="#9494A0" />
                </svg>
                </span>
            </div>
            <div className='Logo'>
            </div>
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
                {SidebarData.map((val, key) => {
                    return (
                        <li key={key} onClick={() => window.location.pathname = val.link}>
                            <div className='Icon'>{val.icon}</div>
                            <div className='Title'>{val.title}</div>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default Sidebar