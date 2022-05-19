import React, { useState, useContext, useEffect } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { UserInfoContextStore } from './UserInfoContext';

const customStyles = {
    iframe: {
        justifySelf: 'center',
        alignSelf: 'center',
        width: '100%',
        height: '80vh',
        zIndex: 255
    },
    dialog: {
        padding: '5px'
    },
    closeButton: {
        height: '12px'
    }
};

const boardMap = {
    'a': "ask",
    'b': "suggest",
    'c': "cheer"
}
const default_url = "https://padlet.com/exelcior99/i5bslrl8m525t97t";

export default function Board(props) {
    const unityContext = props.unityContext;
    const [open, setOpen] = useState(false);
    const [url, setUrl] = useState(default_url);
    const { links } = useContext(UserInfoContextStore)


    useEffect(function () {
        unityContext.on("OpenBoard", function (boardType, name) {
            console.log("Board", boardType)
            console.log(boardType)
            setUrl(links[boardMap[boardType]]);
            setOpen(true)
        });
    }, []);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            fullWidth={true}
            maxWidth={"xl"}
            open={open}
            onClose={handleClose}
        >
            <DialogContent style={customStyles.dialog}>
                <iframe style={customStyles.iframe} src={url} > </iframe>
            </DialogContent>
            <DialogActions style={customStyles.closeButton}>
                <Button onClick={handleClose}>닫기</Button>
            </DialogActions>
        </Dialog>
    );
}