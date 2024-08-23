import React, { useState } from 'react'
import EarnTitlePage from './Pages/EarnTitlePage'
import AchievementPage from './Pages/AchievementPage'

const App = () => {
  const [gameSTIndex, setGameSTIndex] = useState(null);


  let content;
  switch (gameSTIndex) {
    case 0:
      content = <AchievementPage setGameSTIndex={setGameSTIndex}/>;
      break;
    default:
      content = <EarnTitlePage setGameSTIndex={setGameSTIndex}/>;
  }


  return (
    <>
      {content}
    </>
  );

}

export default App
