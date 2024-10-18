import React, { createContext, useEffect, useReducer, useState } from "react";

const TBHContext = createContext();

const TBHProvider = ({ children }) => {
  const [tbhQues, setTbhQues] = useState();
  const [isTBHQuesFetched, setIsTBHQuesFetched] = useState(false);
  const [earnedTitles, setEarnedTitles] = useState();
  const [vRTitlesId, setVRTitlesId] = useState();
  const [isTBHQuesLimitReached, setIsTBHQuesLimitReached] = useState(false);
  const [backTime, setBackTime] = useState();
  const [vrData, setVrData] = useState();
  const [revealCoin, setRevealCoin] = useState();
  const [isRevealed, setISRevealed] = useState(false);
  const [voteBy, setVoteBy] = useState("someone");
  const initialState = {
    counter: 0,
    TitleID: "",
    TitleName: "",
    TitleImg: "",
    TitleDescription: "",
    TitleMeta: {},
    OptionInfo: [],
  };

  useEffect(() => {
    tbhQues != undefined
      ? handleNextData()
      : console.log("tbhQues is Null Initially");
  }, [tbhQues]);

  const appReducer = (tbhQuesState, action) => {
    switch (action.type) {
      case "SET_COUNTER":
        return { ...tbhQuesState, counter: action.payload };
      case "RESET_OPTION_INFO":
        return {
          ...tbhQuesState,
          TitleMeta: action.payload.TitleMeta,
          OptionInfo: action.payload.OptionInfo,
        };
      case "RESET_STATE":
        return {
          ...tbhQuesState,
          counter: action.payload.counter,
          TitleID: action.payload.TitleID,
          TitleName: action.payload.TitleName,
          TitleImg: action.payload.TitleImg,
          TitleDescription: action.payload.TitleDescription,
          TitleMeta: action.payload.TitleMeta,
          OptionInfo: action.payload.OptionInfo,
        };
      default:
        return tbhQuesState;
    }
  };

  const [tbhQuesState, tbhQuesDispatch] = useReducer(appReducer, initialState);

  // Function to set counter
  const setCounter = (dispatch, value) => {
    tbhQuesDispatch({ type: "SET_COUNTER", payload: value });
  };

  // Function to reset the state based on the next data in the array
  const resetState = (tbhQuesDispatch, data, counter) => {
    if (counter > tbhQues.data.length) return;
    // console.log("setting data", data);
    const nextData = data.data[counter - 1];
    const nextTitleData = nextData.titleData;

    tbhQuesDispatch({
      type: "RESET_STATE",
      payload: {
        counter,
        TitleID: nextTitleData._id || "",
        TitleName: nextTitleData.name || "",
        TitleImg: nextTitleData.img || "",
        TitleDescription: nextTitleData.description || "",
        TitleMeta: nextData.meta,
        OptionInfo: nextData.users.map((user) => ({
          _id: user._id,
          name: user.name,
          channelId: user.channelId || "",
          profilePicture: user.profilePicture || "",
          phoneNumber: user.phoneNumber,
        })),
      },
    });
  };

  const ResetContactOption = (contactData) => {
    const updatedMeta = {
      titleData: tbhQuesState.TitleMeta.titleData,
      users: contactData.meta.users,
    };
    console.log("up meta", updatedMeta);
    tbhQuesDispatch({
      type: "RESET_OPTION_INFO",
      payload: {
        TitleMeta: updatedMeta,
        OptionInfo: contactData.users.map((user) => ({
          _id: user._id,
          name: user.name,
          channelId: user.channelId || "",
          profilePicture: user.profilePicture || "",
          phoneNumber: user.phoneNumber,
        })),
      },
    });
  };

  const setCountFnc = (newCounter) => {
    setCounter(tbhQuesDispatch, newCounter);
  };

  const handleNextData = () => {
    const currentCounter = tbhQuesState.counter;

    if (currentCounter <= tbhQues.data.length) {
      let newCounter;
      if (!tbhQuesState.OptionInfo || tbhQuesState.OptionInfo.length === 0) {
        newCounter = 1;
      } else {
        newCounter = currentCounter + 1;
      }
      setCountFnc(newCounter);
      resetState(tbhQuesDispatch, tbhQues, newCounter);
    }
  };

  const handleShuffleContacts = () => {
    console.log("clicked");
    const tempStr = Math.random().toString(36).substring(2, 10);
    const tempFunctionName = `TBH${tempStr}`;
    window[tempFunctionName] = (data) => {
      console.log("Function:", tempFunctionName, "received data:", data.data);
      ResetContactOption(data.data);
      delete window[tempFunctionName];
    };
    console.log("checking Meta", tbhQuesState.TitleMeta);
    const body = {
      meta: tbhQuesState.TitleMeta,
    };
    const path = "/api/v1/tribe-games/shuffle/contact";
    customFetchPost(path, body, tempFunctionName);
  };

  const handleManageReveal = () => {
    console.log("clicked");
    if (vrData.coin > 1) {
      const path = "/api/v1/tribe-games/user/reveal";
      const body = {
        titleId: vRTitlesId,
      };
      const tempStr = Math.random().toString(36).substring(2, 10);
      const tempFunctionName = `TBH${tempStr}`;
      window[tempFunctionName] = (data) => {
        if (data.code === 200) {
          const tempStr2 = Math.random().toString(36).substring(2, 10);
          const tempFunctionName2 = `TBH${tempStr2}`;
          window[tempFunctionName2] = (data) => {
            console.log("Function:", tempFunctionName2, "received data:", data);
            setVrData(data.data);
            setRevealCoin(data.data.coin);
            delete window[tempFunctionName2];
          };
          const path2 = `/api/v1/tribe-games/user/titles?titleId=${vRTitlesId}`;
          // const userID = "66acd95a4a702ed543fefc03";
          const userID2 = "66bb25192117ebbca39c7bf7";
          customFetch(tempFunctionName2, path2, userID2);
        } else {
          console.log("Some error might Occured!!!");
        }
        delete window[tempFunctionName];
      };
      const userID = "66bb25192117ebbca39c7bf7";
      customFetchPost(path, body, tempFunctionName, userID);
    } else {
      console.log("You dont have Enough Coin");
    }
  };

  const handleSKipTitle = async () => {
    const path = "/api/v1/tribe-games/question/skip";
    const body = {
      meta: tbhQues.data[tbhQuesState.counter - 1].meta,
    };
    await customFetchPost(path, body);
    console.log("Skipped Successfully");
    if (tbhQuesState.counter === tbhQues.data.length) {
      console.log("calling mang Forw");
    } else {
      const titleDesc = document.getElementById("text_titleDesc");
      const gifTitleCont = document.getElementById("Gif_Title_cont");
      titleDesc.classList.add("abtest");
      gifTitleCont.classList.add("abtest");
      setTimeout(() => {
        handleNextData();
        titleDesc.classList.remove("abtest");
        gifTitleCont.classList.remove("abtest");
      }, 500);
    }
    return;
  };

  const handleVoteTitle = async (userID) => {
    const path = "/api/v1/tribe-games/vote";
    const body = {
      titleId: tbhQuesState.TitleID,
      userId: userID,
      meta: tbhQues.data[tbhQuesState.counter - 1].meta,
    };
    await customFetchPost(path, body);
    console.log("Successfully Voted");
    if (tbhQuesState.counter === tbhQues.data.length) {
      console.log("calling mang Forw");
    } else {
      const titleDesc = document.getElementById("text_titleDesc");
      const gifTitleCont = document.getElementById("Gif_Title_cont");
      titleDesc.classList.add("abtest");
      gifTitleCont.classList.add("abtest");
      setTimeout(() => {
        handleNextData();
        titleDesc.classList.remove("abtest");
        gifTitleCont.classList.remove("abtest");
      }, 500);
    }
    return;
  };

  const customFetch = async (tempFunctionName, path, userID = null) => {
    if (typeof tempFunctionName !== "string" || !window[tempFunctionName]) {
      console.error("Error: Invalid or undefined function name.");
      return;
    }
    // const body = {};
    // flutterFetch(path, body, "GET", tempFunctionName, userID);
    const url = `https://vyld-cb-dev-api.vyld.io${path}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: userID ? userID : "669764367d66dad334de7b06",
        },
      });

      if (!response.ok) {
        if (
          response.code === 400 &&
          response.data.message === "today limit reached"
        ) {
          console.log("limit Marked");
        }
      }

      if (!response.ok) {
        console.log(response);
        if (response.status === 400) {
          console.log("limit Marked");
        } else {
          throw new Error(`Network Response Not ok: ${response.statusText}`);
        }
      }

      const data = await response.json();
      if (data.code === 400) {
        if (data.data.message === "today limit reached") {
          console.log("limit Marked Again");
        } else {
          throw new Error(`Network Response Not ok: ${response.statusText}`);
        }
      }
      console.log("data", data);

      if (typeof window[tempFunctionName] === "function") {
        window[tempFunctionName](data);
      } else {
        console.error(`Error: ${tempFunctionName} is not a function.`);
      }
    } catch (error) {
      console.error("Error in customFetch:", error);
    }
  };

  async function customFetchPost(
    path,
    body,
    tempFunctionName = null,
    userID = null
  ) {
    // flutterFetch(path, body, "POST", tempFunctionName);
    const url = `https://vyld-cb-dev-api.vyld.io${path}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: userID ? userID : "669764367d66dad334de7b06",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (
      tempFunctionName != null &&
      typeof window[tempFunctionName] === "function"
    ) {
      window[tempFunctionName](data);
    }
    console.log("Successfull Post with Response", data);
    return ;
  }

  async function flutterFetch(
    path,
    body,
    method,
    tempFunctionName = null,
    userID = null
  ) {
    try {
      var request = {
        method: method,
        path: path,
        body: body,
        tempFunctionName: tempFunctionName,
        userId: userID,
      };

      console.log("Request sending by Custom fetch", request);

      window.flutterFetch.postMessage(btoa(JSON.stringify(request)));
    } catch (e) {
      console.error("Error in customFetch:", e);
    }
  }

  window.flutterResponse = async function (data) {
    try {
      const decoded = atob(data);
      var response = JSON.parse(decoded);
      var code = response.code;
      var body = response.body;
      var bodyCode = body?.code;
      var error = response.error;
      var tempFunctionName = response.tempFunctionName;

      if (code === 200 || bodyCode === 200) {
        console.log("ok response, now calling function");
        if (typeof window[tempFunctionName] === "function") {
          console.log("Function called with data", data, response.body);
          window[tempFunctionName](body);
        } else {
          console.error(`Error: ${tempFunctionName} is not a function.`);
        }
      } else {
        console.log("Error is coming", data);
        console.error("Error in customFetch:", error);
      }
    } catch (e) {
      console.error("Error in customFetch:", e);
    }
  };


  const calculateFinalTime = (backTimeInSeconds) => {
    // Get current time in milliseconds
    const currentTime = new Date();
  
    // Calculate the final time by adding backTimeInSeconds (converted to ms)
    const finalTime = new Date(currentTime.getTime() + backTimeInSeconds * 1000);
  
    // Extract hours, minutes, and seconds from finalTime
    let hours = finalTime.getHours();
    const minutes = finalTime.getMinutes();
    const seconds = finalTime.getSeconds();
  
    // Determine if the time is AM or PM
    const newPeriod = hours >= 12 ? "PM" : "AM";
  
    // Convert hours to 12-hour format
    hours = hours % 12 || 12; // Convert 0 to 12 for midnight
  
    // Format time as hr:min:sec
    const newTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  
    // Return newTime and newPeriod
    return { newTime, newPeriod };
  };

  return (
    <TBHContext.Provider
      value={{
        tbhQuesState,
        tbhQuesDispatch,
        customFetch,
        customFetchPost,
        tbhQues,
        setTbhQues,
        handleNextData,
        ResetContactOption,
        handleSKipTitle,
        handleShuffleContacts,
        handleVoteTitle,
        earnedTitles,
        setEarnedTitles,
        isTBHQuesFetched,
        setIsTBHQuesFetched,
        vRTitlesId,
        setVRTitlesId,
        isTBHQuesLimitReached,
        setIsTBHQuesLimitReached,
        backTime,
        setBackTime,
        vrData,
        setVrData,
        handleManageReveal,
        setCountFnc,
        revealCoin,
        setRevealCoin,
        isRevealed,
        setISRevealed,
        voteBy,
        setVoteBy,
        calculateFinalTime,
      }}
    >
      {children}
    </TBHContext.Provider>
  );
};

export { TBHContext, TBHProvider };
