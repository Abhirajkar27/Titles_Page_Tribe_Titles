import React, { useContext, useEffect, useState } from "react";
import "./EarnTitlePage.css";
import tribe_logo from "../../assets/img/Tribe_titles.png";
import brown_clowd from "../../assets/img/brown_clowd.png";
import Green_clowd from "../../assets/img/Green_clowd.png";
import title_box from "../../assets/img/Ask_vote_card.png";
import voteBadge from "../../assets/img/No_votes.png";
import Reveal_coin from "../../assets/img/reveal_coin.png";
import Back from "../../assets/img/bkbtn.png";
import InstructionPage from "../InstructionPage/InstructionPage";
import { TBHContext } from "../../context/context";

const EarnTitlePage = (props) => {
  const { earnedTitles, setEarnedTitles, customFetch, setVRTitlesId } =
    useContext(TBHContext);
  const [nextInst, setnextInst] = useState(true);

  useEffect(() => {
    if (!earnedTitles) {
      const tempStr = Math.random().toString(36).substring(2, 10);
      const tempFunctionName = `TBH${tempStr}`;
      window[tempFunctionName] = (data) => {
        console.log("Function:", tempFunctionName, "received data:", data);
        setEarnedTitles(data.data);
        delete window[tempFunctionName];
      };
      const path = "/api/v1/tribe-games/user/titles";
      const userID = "66acd95a4a702ed543fefc03";
      customFetch(tempFunctionName, path, userID);
    }
  }, []);

  const handlePlayMoreClick = () => {
    props.setGameSTIndex(2);
  };

  const TitleBoxContainer = ({ titleId, title, imgUrl }) => (
    <div
      onClick={() => {
        setVRTitlesId(titleId);
        props.setGameSTIndex(0);
      }}
      className="title_box_container"
    >
      <img className="title_box" src={title_box} alt="title_box" />
      <div className="title_box_content">
        <img src={imgUrl} alt="earned_title" />
        <div>
          <span>{title}</span>
          <img src={voteBadge} alt="vote_badge" />
        </div>
      </div>
    </div>
  );

  if (!earnedTitles) {
    return <p>Loading...</p>;
  }

  return (
    <div className="Titlepage_TA">
      {props.instruction && (
        <InstructionPage
          gameSTIndex={props.gameSTIndex}
          setInstructions={props.setInstructions}
          nextInst={nextInst}
          setnextInst={setnextInst}
        />
      )}
      <img
        className="nkbtn_TPTA"
        src={Back}
        onClick={() => props.setGameSTIndex(2)}
        alt="backbutton"
      />
      <img className="brown_clowd_TPTA" src={brown_clowd} />
      <img className="green_clowd_TPTA" src={Green_clowd} />
      <img className="tribeLogo_ET_TA" src={tribe_logo} alt="tribeImg" />
      <div className="exicting_line_TA">
        the more you play
        <br />
        the more you are shown to others
      </div>
      <button onClick={handlePlayMoreClick} className="btn_TPTA">
        <span>Play for more titles</span>
      </button>
      <div className="TR_Contn_TPPTA">
        <div className="fedbk_TPPTA">
          <span>titles I’ve got: {earnedTitles.data.length}</span>
          <span>what a collection, champ!</span>
        </div>
        <div className="Nrvl_TPPTA" onClick={() => props.setGameSTIndex(6)}>
          <img src={Reveal_coin}></img>
          <span>{earnedTitles.coin} Reveals</span>
        </div>
      </div>
      <div className="scrollable_container">
        {earnedTitles.data.map((item, index) => (
          <TitleBoxContainer
            key={index}
            titleId={item._id}
            title={item.name}
            imgUrl={item.img}
          />
        ))}
      </div>
    </div>
  );
};

export default EarnTitlePage;
