import React from 'react';
import './AchievementPage.css';
import crossBtn from '../assets/img/cross.png';
import AvatarCard from '../assets/img/Avatar.png';
import Badge from '../assets/img/vote_badge.png';
import Snapcht from '../assets/img/snapchat.png';
import otherShare from '../assets/img/elseSM.png';

const AchievementPage = () => {
    return (
        <div className='AchievementPage_TA'>
            <img className='cross_btn_TPTA' src={crossBtn} alt='crossButton' />
            <img className='AvatarCard_TPTA' src={AvatarCard} alt='AvatarCard' />
            <img className='Badge_TPTA' src={Badge} alt='Badge' />
            <div className='feedback-txt_TPTA'>You are rocking with the title. brag about it</div>
            <div className='sharing_TPTA'>
                <div><svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                <path d="M7.99898 19.2907H12.999C17.1657 19.2907 18.8323 17.624 18.8323 13.4574V8.45736C18.8323 4.29069 17.1657 2.62402 12.999 2.62402H7.99898C3.83232 2.62402 2.16565 4.29069 2.16565 8.45736V13.4574C2.16565 17.624 3.83232 19.2907 7.99898 19.2907Z" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M10.4991 13.8739C12.1099 13.8739 13.4157 12.568 13.4157 10.9572C13.4157 9.34636 12.1099 8.04053 10.4991 8.04053C8.88823 8.04053 7.5824 9.34636 7.5824 10.9572C7.5824 12.568 8.88823 13.8739 10.4991 13.8739Z" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M15.1957 6.79069H15.2054" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
            </svg><span>Tell Others</span></div>
            <img className='share_snap_TPTA'src={Snapcht} alt='snapChat_Icon'/>
            <img className='share_oth_TPTA' src={otherShare} alt='otherShare_Icon'/>
            </div>
        </div>
    )
}

export default AchievementPage
