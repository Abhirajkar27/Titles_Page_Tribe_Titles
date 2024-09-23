import React, { useState } from 'react'
import './InstructionPage.css';
import Instruction1 from '../assets/img/instruction1.png';
import inst2 from '../assets/img/inst2.png'

const InstructionPage = ({setinstructions,nextInst,setnextInst}) => {
  return (
    <div className='Instruction-pg1'>
      <div className="vote-up">
        <p className="vote-it-up">
       { !nextInst?'Vote for others':'Unlock titles'}
        </p>
        <p className='vote-it-down'>
        {!nextInst?'each vote you make will help you unlock':'get all the title unlock with each vote'}
        </p>
      </div>
      <div className="image-instruction">
    <img src={!nextInst?Instruction1:inst2}/>
      </div>
        <div className="instruction-button">
            {!nextInst?<button onClick={()=>setinstructions(false)}>next</button>
            :<button onClick={()=>setinstructions(false)}>ok got it</button>}
        </div>
    </div>
  )
}

export default InstructionPage
