import React, { createContext, useEffect, useReducer, useState } from "react";

const TBHContext = createContext();

const TBHProvider = ({ children }) => {
  const [tbhQues, setTbhQues] = useState();
  const [isTBHQuesFetched, setIsTBHQuesFetched] = useState(false);
  const [earnedTitles, setEarnedTitles] = useState();
  const initialState = {
    counter: 0,
    TitleID: "",
    TitleName: "",
    TitleImg: "",
    TitleDescription: "",
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
        return { ...tbhQuesState, OptionInfo: action.payload.OptionInfo };
      case "RESET_STATE":
        return {
          ...tbhQuesState,
          counter: action.payload.counter,
          TitleID: action.payload.TitleID,
          TitleName: action.payload.TitleName,
          TitleImg: action.payload.TitleImg,
          TitleDescription: action.payload.TitleDescription,
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
    if (counter > 10) return;
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
    tbhQuesDispatch({
      type: "RESET_OPTION_INFO",
      payload: {
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

  const handleNextData = () => {
    const cachedCounter = localStorage.getItem("counter");
    const currentCounter = cachedCounter
      ? parseInt(cachedCounter)
      : tbhQuesState.counter;

    if (currentCounter <= 10) {
      let newCounter =
        !tbhQuesState.counter || tbhQuesState.counter === 0
          ? currentCounter
          : currentCounter + 1;
      if (newCounter === 0) {
        newCounter = 1;
      }
      localStorage.setItem("counter", newCounter);
      setCounter(tbhQuesDispatch, newCounter);
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
    const body = {
      meta: tbhQues.data[tbhQuesState.counter - 1].meta,
    };
    const path = "/api/v1/tribe-games/shuffle/contact";
    customFetchPost(path, body, tempFunctionName);
  };

  const handleSKipTitle = () => {
    const path = "/api/v1/tribe-games/question/skip";
    const body = {
      meta: tbhQues.data[tbhQuesState.counter - 1].meta,
    };
    customFetchPost(path, body);
    console.log("Skipped Successfully");
    handleNextData();
  };

  const handleVoteTitle = (userID) => {
    const path = "/api/v1/tribe-games/vote";
    const body = {
      titleId: tbhQuesState.TitleID,
      userId: userID,
      meta: tbhQues.data[tbhQuesState.counter - 1].meta,
    };
    customFetchPost(path, body);
    console.log("Successfully Voted");
    handleNextData();
  };

  const customFetch = async (tempFunctionName, path, userID = null) => {
    if (typeof tempFunctionName !== "string" || !window[tempFunctionName]) {
      console.error("Error: Invalid or undefined function name.");
      return;
    }
    const body={};
    // const url = `https://vyld-cb-dev-api.vyld.io${path}`;
    flutterFetch(path, body, "GET", tempFunctionName, userID);

    // try {
    //   const response = await fetch(url, {
    //     method: "GET",
    //     headers: {
    //       Authorization: userID ? userID : "669764367d66dad334de7b06",
    //     },
    //   });

    //   if (!response.ok) {
    //     throw new Error(`Network response was not ok: ${response.statusText}`);
    //   }

    //   const data = await response.json();

    //   if (typeof window[tempFunctionName] === "function") {
    //     window[tempFunctionName](data);
    //   } else {
    //     console.error(`Error: ${tempFunctionName} is not a function.`);
    //   }
    // } catch (error) {
    //   console.error("Error in customFetch:", error);
    // }
  };

  async function customFetchPost(path, body, tempFunctionName = null) {

    flutterFetch(path, JSON.stringify(body), "POST", tempFunctionName);
    // const url = `https://vyld-cb-dev-api.vyld.io${path}`;
    // const response = await fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: "669764367d66dad334de7b06",
    //   },
    //   body: JSON.stringify(body),
    // });
    // const data = await response.json();
    // if (
    //   tempFunctionName != null &&
    //   typeof window[tempFunctionName] === "function"
    // ) {
    //   window[tempFunctionName](data);
    // }
    // console.log("Successfull Post with Response", data);
  }

  async function flutterFetch(
    path,
    body,
    method,
    tempFunctionName = null,
    userID = null,
  ) {
    try {
      var request = {
        method: method,
        path: path,
        body: body,
        tempFunctionName: tempFunctionName,
        userId: userID,
      };

      window.flutterFetch.postMessage(JSON.stringify(request));

      console.log("Successfull Post with Request", data);
    } catch (e) {
      console.error("Error in customFetch:", e);
    }
  }

  window[flutterResponse] = async (data) => {
    try {
      var response = JSON.parse(data);
      var code = response.code;
      var body = response.body;
      var error = response.error;
      var tempFunctionName = response.tempFunctionName;

      if (code == 200) {
        if (typeof window[tempFunctionName] === "function") {
          window[tempFunctionName](body);
        } else {
          console.error(`Error: ${tempFunctionName} is not a function.`);
        }
      } else {
        console.error("Error in customFetch:", error);
      }
    } catch (e) {
      console.error("Error in customFetch:", e);
    }
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
      }}
    >
      {children}
    </TBHContext.Provider>
  );
};

export { TBHContext, TBHProvider };
