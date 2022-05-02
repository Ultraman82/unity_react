import React, { useState, useEffect, useContext, useMemo } from "react";

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import OpeningVideoContainer from './OpeningVideo'
import SettingsOverscanIcon from '@mui/icons-material/SettingsOverscan';
import LinkContainer from './LinkContainer'
import Board from './Board'
import VideoOpen from './VideoOpen'

import Username from "./Username";
import Unity, { UnityContext } from "react-unity-webgl";
import { UserInfoContextStore } from './UserInfoContext';

const unityContext = new UnityContext({
  loaderUrl: "Build/public.loader.js",
  dataUrl: "Build/public.data",
  frameworkUrl: "Build/public.framework.js",
  codeUrl: "Build/public.wasm",
  webglContextAttributes: {
    preserveDrawingBuffer: true,
  },
})

export default function App() {
  const handle = useFullScreenHandle();
  const { localData, setLocalData, eraseLocal } = useContext(UserInfoContextStore)


  return (
    // <Container>
    // <Box sx={{ my: 4 }}>
    <Box>
      {/* <OpeningVideoContainer /> */}
      {/* <Board unityContext={unityContext} />
      <LinkContainer unityContext={unityContext} />
      <VideoOpen unityContext={unityContext} /> */}
      {/* <Unity style={{
        width: '100%',
        height: '100%',
        justifySelf: 'center',
        alignSelf: 'center',
      }} unityContext={unityContext} /> */}
      {
        !localData &&
        <Username unityContext={unityContext} />
      }

      <Button variant="outlined" onClick={eraseLocal}>
        Reset localStorage
      </Button>
      {/* <Button variant="outlined" startIcon={<SettingsOverscanIcon />} onClick={handle.enter}>
        Full Screen
      </Button> */}
      {/* <Copyright /> */}
    </Box >

    // </Container>
  );
}

