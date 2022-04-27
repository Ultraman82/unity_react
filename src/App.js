import React, { useState, useEffect } from "react";
import Unity, { UnityContext } from "react-unity-webgl";
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

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function App() {
  const unityContext = new UnityContext({
    loaderUrl: "Build/public.loader.js",
    dataUrl: "Build/public.data",
    frameworkUrl: "Build/public.framework.js",
    codeUrl: "Build/public.wasm",
  })
  const [modalIsOpen, setIsOpen] = useState(false);
  const [linkType, setLinkType] = useState("default");
  const handle = useFullScreenHandle();

  return (
    // <Container>
    // <Box sx={{ my: 4 }}>
    <Box>
      <OpeningVideoContainer />
      <Board unityContext={unityContext} />
      <LinkContainer unityContext={unityContext} />
      <VideoOpen unityContext={unityContext} />


      <Unity style={{
        width: '100%',
        height: '100%',
        justifySelf: 'center',
        alignSelf: 'center'
      }} unityContext={unityContext} />

      <Button variant="outlined" startIcon={<SettingsOverscanIcon />} onClick={handle.enter}>
        Full Screen
      </Button>

      {/* <Copyright /> */}
    </Box>
    // </Container>
  );
}
