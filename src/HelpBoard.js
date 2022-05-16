import React, { useState, useContext, useEffect } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useTheme } from '@mui/material/styles';
import { UserInfoContextStore } from './UserInfoContext'
const customStyles = {
    iframe: {
        justifySelf: 'center',
        alignSelf: 'center',
        width: '100%',
        height: '80vh'
    },
};
const default_url = "https://busanmayor.org/info.png";

export default function HelpBoard() {
    const { helpToggle, setHelpToggle } = useContext(UserInfoContextStore);
    const [url, setUrl] = useState(default_url);

    useEffect(function () {
        console.log(helpToggle)
    }, [helpToggle]);


    const handleClose = () => {
        setHelpToggle(false);
    };

    return (

        <Dialog
            fullWidth={true}
            maxWidth={"xl"}
            // maxHeight={"960px"}
            open={helpToggle}
            onClose={handleClose}
        // fullScreen={"true"}
        >
            {/* <DialogTitle>응원하기</DialogTitle> */}
            <DialogContent>
                <img style={customStyles.iframe} src={url} />
                {/* <iframe style={customStyles.iframe} src={url} id="iframe-style" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen> </iframe> */}

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}