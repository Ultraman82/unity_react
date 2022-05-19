import React, { useState, useEffect, useContext } from "react";
import { UserInfoContextStore } from './UserInfoContext';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const customStyles = {
    content: {
        position: 'absolute',
        top: '10%',
        left: '50px',
        right: '50px',
        bottom: '10%',
        border: '1px solid #ccc',
        background: '#fff',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '4px',
        outline: 'none',
        padding: '10px',
    },
    iframe: {
        justifySelf: 'center',
        alignSelf: 'center',
        width: '100%',
        height: '100%',
    },
};
export default function OpeningVideoContainer() {
    const { setIsVideoOver, links, progression, usernameInput, setUsernameInput, openingVideo, setOpeningVideo } = useContext(UserInfoContextStore)

    const [open, setOpen] = useState(true);
    const [url, setUrl] = useState();
    useEffect(() => {
        setUrl(links.openingVideo + "?autoplay=1&mute=1")
        setTimeout(() => {
            setIsVideoOver(true);
            setOpeningVideo(false)
        }, 47000)
    }, []);


    const handleClickOpen = () => {
        setOpeningVideo(true);
    };

    const handleClose = () => {
        console.log('opening close')
        setOpeningVideo(false);
        setUsernameInput(true);
    };

    return (
        <div>
            <Dialog
                fullScreen
                open={openingVideo}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            부산의 미래에 오신것을 환영합니다! (월드가 로딩 중입니다. {progression}%)
                        </Typography>
                    </Toolbar>
                </AppBar>
                <iframe style={customStyles.iframe} src={url} id="iframe-style" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen> </iframe>
            </Dialog>
        </div>
    );
}