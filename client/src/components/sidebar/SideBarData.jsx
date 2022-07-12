import React from 'react'
import { AiFillHome, AiOutlineClose} from 'react-icons/ai'
import {BsFillPeopleFill} from 'react-icons/bs'
import {GrInProgress} from 'react-icons/gr'
import { useState } from 'react';
import Style from './SideBar.module.css'

export const SideBarData = [
    {
        title: 'Dashboard',
        path:'/dashboard',
        icon:<AiFillHome color='black'/>,
        cName:Style.navText
    },
    {
        title: 'Slots',
        path:'/slots',
        icon:<BsFillPeopleFill color='black'/>,
        cName:Style.navText
    },
    {
        title: 'Progress',
        path:'/progress',
        icon:<GrInProgress color='black'/>,
        cName:Style.navText
    }
]