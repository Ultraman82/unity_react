import React, { useState, useEffect, useContext } from "react";
import Box from '@mui/material/Box';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import OpeningVideoContainer from './OpeningVideo'
import IconButton from '@mui/material/IconButton';
import Board from './Board'
import Username from "./Username";
import Unity, { UnityContext } from "react-unity-webgl";
import { UserInfoContextStore } from './UserInfoContext';
import ChatTest from "./ChatRoom/ChatTest";
import SideDrawer from './SideDrawer'

import Icon from '@material-ui/core/Icon';
import { makeStyles } from "@material-ui/core/styles";

import HelpBoard from './HelpBoard'
import MC from "./MC/MC"
import Mayor from "./MC/Mayor"
const useStyles = makeStyles({
  imageIcon: {
    height: '100%',
    top: "5vw",
    justifySelf: "center",
    right: "10px"
  },
  iconRoot: {
    fontSize: "40px"
  },

  menuRoot: {
  }
});

const unityContext = new UnityContext({
  loaderUrl: "Build/public.loader.js",
  frameworkUrl: "Build/public.framework.js",
  // dataUrl: "Build/public.data",
  // codeUrl: "Build/public.wasm",
  dataUrl: process.env.REACT_APP_UNIY_DATA,
  codeUrl: process.env.REACT_APP_UNIY_WASM,
})

export default function App() {
  const handle = useFullScreenHandle();
  const [isFull, setIsFull] = useState(false);
  const { toggleHelp, toggleChat, toggleMenubar, name, isUsernameSet, isVideoOver, links, InGame, helpToggle, setHelpToggle, setInGame, setCameraOver, connect, localData, setLocalData, eraseLocal, unityLoaded, setUnityLoaded, progression, setProgression, isMobile } = useContext(UserInfoContextStore)

  useEffect(function () {
    unityContext.on("progress", function (progression) {
      setProgression(Math.floor(progression * 100));
    });
    unityContext.on("loaded", function () {
      setUnityLoaded(true);
      console.log("loaded")
    });
    unityContext.on("CameraOver", function () {
      setCameraOver(true);
      console.log("CameraOver from web")
    });
    unityContext.on("InGame", function () {
      setInGame(true);
      console.log("InGame true from web")
    });
  }, []);

  const classes = useStyles();

  useEffect(function () {
    if (unityLoaded) {
      unityContext.send("WebManager", "SetVideoUrl", links.boardVideo);
      handleFullScreen()
      if (isUsernameSet) {
        unityContext.send("WebManager", "ResumeGame")
        unityContext.send("WebManager", "SetNickName", name)
      }
    }
  }, [unityLoaded]);


  const SetAdmin = () => {
    unityContext.send("Connect", "SetAdmin");
  }

  document.addEventListener('visibilitychange', function () {
    // if (document.visibilityState == "hidden") {
    //   unityContext.send("WebManager", "Disconnect");
    // } else {
    //   unityContext.send("WebManager", "Reconnect");
    // }
  });
  function toggleFullscreen() {
    isFull ? handle.exit() : handle.enter()
    setIsFull(!isFull)
  }

  const toggleView = () => {
    unityContext.send("WebManager", "ToggleView")
  }

  function handleFullScreen() {
    if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {  // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }


  return (
    < Box className="main-container" >
      {links &&
        <>
          <OpeningVideoContainer />
          {!unityLoaded && <p>Loading {progression}%</p>}
          <FullScreen handle={handle}>
            <HelpBoard></HelpBoard>
            <Mayor></Mayor>
            <MC></MC>
            {unityLoaded &&
              <div className="icon-container">

                <IconButton aria-label="메뉴바" onClick={toggleMenubar}>
                  <Icon fontSize="large" className={{ root: classes.iconRoot }}>
                    <img className={classes.menuRoot} src="/icons/icon_menubar.svg" />
                  </Icon>
                </IconButton>
                <IconButton className="imageRoot" aria-label="전체화면" onClick={handleFullScreen}>
                  <Icon fontSize="large">
                    <img className="imageIcon" src="/icons/icon_fullscreen.svg" />
                  </Icon>
                </IconButton>
                <IconButton aria-label="도움말" onClick={toggleHelp}>
                  <Icon fontSize="large" className={{ root: classes.iconRoot }}>
                    <img className="imageIcon" src="/icons/icon_help.svg" />
                  </Icon>
                </IconButton>
                <IconButton aria-label="채팅" onClick={toggleChat}>
                  <Icon fontSize="large" className={{ root: classes.iconRoot }}>
                    <img className="imageIcon" src="/icons/icon_chat.svg" />
                  </Icon>
                </IconButton>
                <IconButton aria-label="지도" onClick={toggleView}>
                  <Icon fontSize="large" className={{ root: classes.iconRoot }}>
                    <img className="imageIcon" src="/icons/icon_map.svg" />
                  </Icon>
                </IconButton>
                <SideDrawer></SideDrawer>
              </div>
            }
            <>
              <Username unityContext={unityContext} />
            </>
            <Unity style={{
              width: '100%',
              height: 'auto',
              justifySelf: 'center',
              alignSelf: 'center',
            }} unityContext={unityContext} tabindex={-2} className={"game-canvas"} />
            <ChatTest unityContext={unityContext}></ChatTest>
            <Board unityContext={unityContext} />
          </FullScreen>
        </>
      }
    </Box >

  );
}