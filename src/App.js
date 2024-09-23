import React, { useEffect, useState } from "react";
import EarnTitlePage from "./Pages/EarnTitlePage";
import AchievementPage from "./Pages/AchievementPage";
import VoteReveal from "./Pages/VoteReveal";
import './App.css';
import Page1 from "./Pages/Page1";
import Page2 from "./Pages/Page2";
import Page3 from "./Pages/Page3";
import Page4 from "./Pages/Page4";
import InviteList from "./Pages/InviteList";

const App = () => {
  const [gameSTIndex, setGameSTIndex] = useState(null);
  const [tries,setTries]=useState(0);
  const [instruction,setinstructions]=useState(true);
  let content;
  switch (gameSTIndex) {
    case 0:
      content = <VoteReveal setGameSTIndex={setGameSTIndex} />;
      break;
    case 1:
      content = <AchievementPage setGameSTIndex={setGameSTIndex} />;
      break;
    case 2:
      content = <Page1 instruction={instruction} setinstructions={setinstructions} tries={tries} setTries={setTries} setGameSTIndex={setGameSTIndex} />;
      break;
    case 3:
      content = <Page2 setGameSTIndex={setGameSTIndex} />;
      break;
    case 4:
      content = <Page3 setGameSTIndex={setGameSTIndex} />;
      break;
    case 5:
        content = <Page4 setGameSTIndex={setGameSTIndex} />;
        break;
    case 6:
        content = <InviteList setGameSTIndex={setGameSTIndex} />;
        break;
    default:
      content = <EarnTitlePage instruction={instruction} setinstructions={setinstructions} setGameSTIndex={setGameSTIndex} />;
  }


  useEffect(() => {
    document.body.style.overflow = gameSTIndex === null ? '' : 'hidden';
    window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [gameSTIndex]);

  useEffect(() => {
    document.body.style.overflow = instruction === true ? 'hidden' : '';
    window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [instruction]);

  return (
    <>
    {gameSTIndex!=3 && gameSTIndex!=4 &&
    <div className="bkg_SVG_Container_TPTA">
      <svg
        className="bkg_SVG_TPTA"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 340 450"
        fill="none"
      >
        <path
          d="M171.106 443.065L-221.128 1.68755L-270.271 50.8306L171.106 443.065Z"
          stroke="white"
          stroke-opacity="0.1"
        />
      </svg>
      <svg
        className="bkg_SVG_TPTA"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 350 501"
        fill="none"
      >
        <path
          d="M175.099 493.5L-89.5338 -34.3555L-149.721 0.393874L175.099 493.5Z"
          stroke="white"
          stroke-opacity="0.1"
        />
      </svg>
      <svg
        className="bkg_SVG_TPTA"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 72 496"
        fill="none"
      >
        <path
          d="M35.7965 486.953L1.04707 -102.5H70.5459L35.7965 486.953Z"
          stroke="white"
          stroke-opacity="0.1"
        />
      </svg>
      <svg
        className="bkg_SVG_TPTA"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 360 500"
        fill="none"
      >
        <path
          d="M178.85 491.662L59.8536 -86.6998L-7.2771 -68.7122L178.85 491.662Z"
          stroke="white"
          stroke-opacity="0.1"
        />
      </svg>
      <svg
        className="bkg_SVG_TPTA"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 10 500"
        fill="none"
      >
        <path
          d="M2.7931 491.662L121.789 -86.6998L188.92 -68.7122L2.7931 491.662Z"
          stroke="white"
          stroke-opacity="0.1"
        />
      </svg>
      <svg
        className="bkg_SVG_TPTA"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 10 501"
        fill="none"
      >
        <path
          d="M4.5443 493.5L269.177 -34.3555L329.365 0.393874L4.5443 493.5Z"
          stroke="white"
          stroke-opacity="0.1"
        />
      </svg>
      <svg
        className="bkg_SVG_TPTA"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 15 450"
        fill="none"
      >
        <path
          d="M6.5369 443.065L398.771 1.68755L447.914 50.8306L6.5369 443.065Z"
          stroke="white"
          stroke-opacity="0.1"
        />
      </svg>
      </div>}
      {content}
    </>
  );
};

export default App;
