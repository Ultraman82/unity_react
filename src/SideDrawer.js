import React, { useEffect, useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { UserInfoContextStore } from "./UserInfoContext"
import PageviewIcon from '@mui/icons-material/Pageview';
import HandshakeIcon from '@mui/icons-material/Handshake';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import StreetviewIcon from '@mui/icons-material/Streetview';
import SportsHandballIcon from '@mui/icons-material/SportsHandball';
import SignLanguageIcon from '@mui/icons-material/SignLanguage';
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

function renderSwitch(param) {
    switch (param) {
        case '박형준 보기':
            return <PageviewIcon />;
        case '박형준의 약속':
            return <HandshakeIcon />;
        case '박형준 입니다':
            return <AddReactionIcon />;
        case '부산시장, 박형준':
            return <DirectionsRunIcon />;
        case '박형준 응원하기':
            return <SignLanguageIcon />;
        case '정책 제안하기':
            return <StreetviewIcon />;
        case '박형준에게 바란다':
            return <SportsHandballIcon />;
        default:
            return null;
    }
}

export default function SideDrawer() {
    const { toggleMenubar, isMenuOpen, boards } = useContext(UserInfoContextStore)
    const [url, setUrl] = useState(false);
    const [open, setOpen] = useState(false);


    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const OpenBoard = (key) => {
        setUrl(boards[key])
        setOpen(true)
    };


    useEffect(function () {
    }, []);

    const list = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleMenubar}
        >{ }
            <List>
                {Object.keys(boards).map((key, index) => (
                    renderSwitch(key) && <ListItem key={index} disablePadding>
                        {/* <ListItem key={index} disablePadding> */}
                        <ListItemButton onClick={() => OpenBoard(key)}>
                            <ListItemIcon>
                                {renderSwitch(key)}
                            </ListItemIcon>
                            <ListItemText primary={key} />
                        </ListItemButton>
                    </ListItem>

                ))}
            </List>
            <Divider />
        </Box>
    );

    return (
        <div >
            {/* <IconButton
                className='side-drawer'
                edge="start"
                aria-label="menu"
                sx={{ ml: 2 }}
                onClick={toggleMenubar}
            >
                <MenuIcon fontSize="inherit" />
            </IconButton> */}
            <Drawer
                style={customStyles.drawer}
                open={isMenuOpen}
                onClose={toggleMenubar}
            >
                {list()}
            </Drawer>
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
        </div>
    );
}
