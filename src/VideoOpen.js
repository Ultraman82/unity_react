import React, { useState, useContext, useEffect } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useTheme } from '@mui/material/styles';

const customStyles = {
    iframe: {
        justifySelf: 'center',
        alignSelf: 'center',
        width: '100%',
        height: '80vh',
    },
};

const default_url = "https://www.youtube.com/embed/862Yqyj1IAA";

export default function VideoOpen(props) {
    const unityContext = props.unityContext;

    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [url, setUrl] = useState(default_url);


    useEffect(function () {
        unityContext.on("OpenVideo", function (boardType, name) {
            console.log("Video", boardType)
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
        <React.Fragment>
            <Dialog
                fullWidth={true}
                maxWidth={"xl"}
                // maxHeight={"960px"}
                open={open}
                onClose={handleClose}
            // fullScreen={"true"}
            >
                {/* <DialogTitle>μμνκΈ°</DialogTitle> */}
                <DialogContent>
                    <iframe style={customStyles.iframe} src={url} id="iframe-style" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen> </iframe>

                    {/* <iframe style={customStyles.iframe} src={url} id="iframe-style" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen> </iframe> */}

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}