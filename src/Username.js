import React, { useState, useEffect, useContext } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { UserInfoContextStore } from './UserInfoContext';

export default function Username(props) {
  const unityContext = props.unityContext;
  const [open, setOpen] = useState(false);
  const [nickname, setNickName] = useState('');
  const [invalid, setInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { localData, setLocalData, getIp, ip, wordReg, postUserdata, postStatus } = useContext(UserInfoContextStore)

  const symbol_check = /[!?@#$%^&*():;+-=~{}<>\_\[\]\|\\\"\'\,\.\/\`\₩]/g
  const onChange = (e) => {
    let name = e.target.value
    setNickName(name)
    if (wordReg.test(name)) {
      setInvalid(true)
      setErrorMessage("부적절한 단어가 사용 되었습니다.")
    } else if (symbol_check.test(name)) {
      setInvalid(true)
      setErrorMessage("특수기호는 사용하실수 없습니다.")
    } else {
      setInvalid(false)
      setErrorMessage("")
    }
  }

  useEffect(() => {
    getIp()
  }, [nickname]);

  useEffect(() => {
    console.log('post success')
  }, [postStatus]);

  const saveLocalData = () => {
    let temp = ip
    temp.name = nickname;
    temp.avatar = 0;
    localStorage.setItem('busanMayor', JSON.stringify(temp))
    setLocalData(temp)
    console.log(postUserdata(temp))
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const onSubmit = () => {
    if (!invalid) {
      unityContext.send("WebManager", "SetInputUnity")
      unityContext.send("Connect", "ConnectFromWeb", nickname)
      saveLocalData()
      setOpen(false);
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>아바타 생성</DialogTitle>
        <DialogContent>
          <DialogContentText>
            사용하실 아바타 이름을 입력해 주세요.<br></br> 특수기호나 부적절한 단어는 사용하실수 없습니다.
          </DialogContentText>
          <TextField type="text" value={nickname} onChange={onChange} error={invalid} helperText={errorMessage} />
        </DialogContent>
        <DialogActions>
          <Button onClick={onSubmit} disabled={invalid}>확인</Button>
        </DialogActions>
        { }
      </Dialog>
    </div>
  );
}


