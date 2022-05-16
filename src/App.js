import React, { useState, useEffect, useContext, useMemo } from "react";
import Box from '@mui/material/Box';

import { FullScreen, useFullScreenHandle } from "react-full-screen";
import OpeningVideoContainer from './OpeningVideo'

import IconButton from '@mui/material/IconButton';

import LinkContainer from './LinkContainer'
import Board from './Board'
import VideoOpen from './VideoOpen'
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Username from "./Username";
import Unity, { UnityContext } from "react-unity-webgl";
import { UserInfoContextStore } from './UserInfoContext';
import ChatTest from "./ChatRoom/ChatTest";
import SideDrawer from './SideDrawer'
import { ViewSidebar } from "@mui/icons-material";

const unityContext = new UnityContext({
  loaderUrl: "Build/public.loader.js",
  dataUrl: "Build/public.data",
  frameworkUrl: "Build/public.framework.js",
  codeUrl: "Build/public.wasm",
})

export default function App() {
  const handle = useFullScreenHandle();
  const [isFull, setIsFull] = useState(false);

  const { isVideoOver, links, InGame, helpToggle, setHelpToggle, setInGame, setCameraOver, connect, localData, setLocalData, eraseLocal, unityLoaded, setUnityLoaded, progression, setProgression, isMobile } = useContext(UserInfoContextStore)


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

  useEffect(function () {
    if (unityLoaded) {
      unityContext.send("WebManager", "SetVideoUrl", links.boardVideo);
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

  const toggleHelp = () => {
    setHelpToggle(!helpToggle)
  }

  return (
    // 
    // <Box sx={{ my: 4 }}>

    < Box className="main-container" >
      {links &&
        <>
          <OpeningVideoContainer />
          <LinkContainer unityContext={unityContext} />
          <VideoOpen unityContext={unityContext} />
          {!unityLoaded && <p>Loading {progression}%</p>}
          <FullScreen handle={handle}>
            {unityLoaded &&
              <>
                <IconButton aria-label="전체화면" onClick={toggleFullscreen} className='full-button'>
                  <FullscreenIcon fontSize="inherit" />
                </IconButton>
                <IconButton aria-label="도움말" onClick={toggleHelp} className='question-button'>
                  <QuestionMarkIcon fontSize="inherit" />
                </IconButton>
                <SideDrawer></SideDrawer>
              </>
            }
            <>
              <Username unityContext={unityContext} />
            </>
            <Unity style={{
              width: '100%',
              height: 'auto',
              justifySelf: 'center',
              alignSelf: 'center',
            }} unityContext={unityContext} tabIndex={1} className={"game-canvas"} />
            <ChatTest unityContext={unityContext}></ChatTest>
            <Board unityContext={unityContext} />

          </FullScreen>

        </>
      }
    </Box >

  );
}

{/* <Button variant="outlined" onClick={eraseLocal}>
        Reset localStorage
      </Button> */}
{/* <Button variant="outlined" startIcon={<SettingsOverscanIcon />} onClick={handle.enter}>
      Full Screen
    </Button> */}


