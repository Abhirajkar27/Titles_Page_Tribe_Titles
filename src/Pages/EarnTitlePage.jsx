import React from 'react'
import './EarnTitlePage.css';
import tribe_logo from '../assets/img/Tribe_titles.png';
import brown_clowd from '../assets/img/brown_clowd.png';
import Green_clowd from '../assets/img/Green_clowd.png';
import title_box from '../assets/img/Ask_vote_card.png';
import earnedTitleImg from '../assets/img/earnedttlimg.png';
import voteBadge from '../assets/img/No_votes.png';
import Back from '../assets/img/bkbtn.png';

const EarnTitlePage = (props) => {
    const titles = [
        'Captain Chik-Chik',
        'Lord Late Lateef',
        'FIFA Master',
        'Mr Coder',
        'Padhaku Bhaiya',
        'Ghissu',
    ];
    const TitleBoxContainer = ({ title }) => (
        <div onClick={()=>props.setGameSTIndex(0)} className='title_box_container'>
            <img className='title_box' src={title_box} alt='title_box' />
            <div className='title_box_content'>
                <img src={earnedTitleImg} alt='earned_title' />
                <div>
                    <span>{title}</span>
                    <img src={voteBadge} alt='vote_badge' />
                </div>
            </div>
        </div>
    );
    return (
        <div className='Titlepage_TA'>
            <img className='nkbtn_TPTA' src={Back} alt='backbutton'/>
            <img className='brown_clowd_TPTA' src={brown_clowd} />
            <img className='green_clowd_TPTA' src={Green_clowd} />
            <img className='tribeLogo_ET_TA' src={tribe_logo} alt='tribeImg' />
            <div className='exicting_line_TA'>The more your play the more you are shown to others</div>
            <button className='btn_TPTA'><span>Play for more titles</span></button>
            <div className='fedbk_TPPTA'>
                <span>{titles.length} Earned Titles</span>
                <span>You get the card when a friends select yous</span>
            </div>
            <div className='scrollable_container'>
                {titles.map((title, index) => (
                    <TitleBoxContainer key={index} title={title} />
                ))}
            </div>
        </div>
    )
}

export default EarnTitlePage
