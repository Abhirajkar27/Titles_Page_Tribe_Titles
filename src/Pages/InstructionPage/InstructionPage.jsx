import React, { useState } from "react";
import "./InstructionPage.css";
import Instruction1 from "../../assets/img/instruction1.png";
import inst2 from "../../assets/img/inst2.png";

const InstructionPage = ({ setinstructions, nextInst, setnextInst }) => {
  return (
    <div className="Instruction-pg1">
      <div className="vote-up">
        <p className="vote-it-up">
          {!nextInst ? "give titles to friends" : "earn titles"}
        </p>
        <p className="vote-it-down">
          {!nextInst ? (
            <>your votes are anonymous 🤭</>
          ) : (
            <>
              you get a title when <br /> a friend votes for you
            </>
          )}
        </p>
      </div>
      <div className="image-instruction">
        <img src={!nextInst ? Instruction1 : inst2} />
      </div>
      <div className="instruction-button">
        {/* {!nextInst?<button onClick={()=>setinstructions(false)}>ok got it</button>
            :<button onClick={()=>setinstructions(false)}>ok got it</button>} */}
        <button onClick={() => setinstructions(false)}>
          {nextInst ? "Okay, got it" : "Start"}
        </button>
      </div>
    </div>
  );
};

export default InstructionPage;
