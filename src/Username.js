import React, { useState, useEffect, useContext } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { UserInfoContextStore } from './UserInfoContext';

const customStyles = {
  iframe: {
    justifySelf: 'center',
    alignSelf: 'center',
  },
  dialog: {
    padding: '5px'
  },
  closeButton: {
    height: '12px'
  }
};

export default function Username(props) {
  const unityContext = props.unityContext;
  const [open, setOpen] = useState(false);
  const [nickname, setNickName] = useState('');
  const [invalid, setInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { isVideoOver, isUsernameSet, setIsUsernameSet, openingVideo, setOpeningVideo, name, setName, unityLoaded, setLocalData, getIp, ip, wordReg, postUserdata, postStatus, usernameInput, setUsernameInput } = useContext(UserInfoContextStore)
  const ENTER_KEY_CODE = 13;

  // const symbol_check = /[!?@#$%^&*():;+-=~{}<>\_\[\]\|\\\"\'\,\.\/\`\₩]/g
  const symbol_check = /[\[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"\\\'\\]/
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
    if (!isUsernameSet) setUsernameInput(isVideoOver)
  }, [isVideoOver]);

  useEffect(() => {
    if (open) {
      unityContext.send("WebManager", "SetInputWeb")
      console.log("resume game")
    } else {
      unityContext.send("WebManager", "SetInputUnity")
    }
  }, [open]);



  useEffect(() => {
    console.log('post success ', postStatus)
  }, [postStatus]);

  // useEffect(() => {
  //   setUsernameInput(usernameInput)
  // }, [usernameInput]);

  const saveLocalData = () => {
    let temp = ip
    temp.name = nickname;
    temp.avatar = 0;
    localStorage.setItem('busanMayor', JSON.stringify(temp))
    setLocalData(temp)
  }

  const handleClickOpen = () => {
    setUsernameInput(true);
  };
  const handleEnterKey = (event) => {
    if (event.keyCode === ENTER_KEY_CODE) {
      onSubmit()
    }
  }

  const onSubmit = () => {
    if (!invalid) {
      unityContext.send("WebManager", "SetInputUnity")
      unityContext.send("WebManager", "SetNickName", nickname)
      unityContext.send("WebManager", "ResumeGame")
      setName(nickname)
      setUsernameInput(false);
      setIsUsernameSet(true)
      if (openingVideo) {
        setOpeningVideo(false)
      }
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={usernameInput} onClose={handleClose}>
        <DialogTitle>아바타 생성</DialogTitle>
        <DialogContent style={customStyles.iframe}>
          <DialogContentText>
            사용하실 아바타 이름을 입력해 주세요.<br></br> 특수기호나 부적절한 단어는 사용하실수 없습니다.
          </DialogContentText>
          <br></br>
          <TextField fullWidth type="text" value={nickname} onChange={onChange} error={invalid} helperText={errorMessage} onKeyDown={handleEnterKey} />
        </DialogContent>
        <DialogActions>
          <Button onClick={onSubmit} disabled={invalid}>확인</Button>
        </DialogActions>
        { }
      </Dialog>
    </div>
  );
}


