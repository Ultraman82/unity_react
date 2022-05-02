import React, { useState, useEffect, useContext } from "react";
import Button from '@mui/material/Button';
import axios from 'axios';
import SettingsOverscanIcon from '@mui/icons-material/SettingsOverscan';
import Username from './Username'
import { UserInfoContextStore } from './UserInfoContext';


export default function Utility(props) {
  const unityContext = props.unityContext;
  const [ip, setIP] = useState('');
  const { localData, setLocalData } = useContext(UserInfoContextStore)

  useEffect(function () {

  }, []);

  function handleOnClickTakeScreenshot() {
    const data = unityContext.takeScreenshot("image/jpeg", 1.0);
    if (data !== null) {
      window.open(data, "_blank");
    }
  }
  function getIPlist() {
    axios.get(`http://localhost:5000/api/iplist`)
      // axios.get(`http://localhost:5000/api/iplist`, {
      //   headers: headers
      // })
      .then(res => {
        const iplist = res.data;
        return iplist;
      })
  }

  let test_ = 'https://ipinfo.io/json'
  const headers = {
    "Content-Type": "application/json",
  };

  const getIp = async () => {
    const res = await axios.get(test_)
    console.log(res.data);
  }
  return (
    <>
      {!localData}
      <Username unityContext={unityContext} />
      <h6>{ }</h6>

      <Button variant="outlined" startIcon={<SettingsOverscanIcon />} onClick={handleOnClickTakeScreenshot}>
        take a shot
      </Button>
    </>
  );
}






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
