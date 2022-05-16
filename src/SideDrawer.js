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
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { UserInfoContextStore } from "./UserInfoContext"
import { makeStyles } from "@material-ui/core/styles";
import PageviewIcon from '@mui/icons-material/Pageview';
import HandshakeIcon from '@mui/icons-material/Handshake';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

const customStyles = {
    iframe: {
        justifySelf: 'center',
        alignSelf: 'center',
        width: '100%',
        height: '80vh',
        zIndex: 255
    },
    drawer: {
        background: 'transparent'
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
        default:
            return '';
    }
}

export default function SideDrawer() {
    const [state, setState] = useState(false);
    const { boards } = useContext(UserInfoContextStore)
    const [url, setUrl] = useState(false);
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const toggleDrawer = () => {
        setState(!state);
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
            onClick={toggleDrawer}
        >
            <List>
                {Object.keys(boards).map((key, index) => (
                    <ListItem key={index} disablePadding>
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
            <IconButton
                className='side-drawer'
                edge="start"
                aria-label="menu"
                sx={{ ml: 2 }}
                onClick={toggleDrawer}
            >
                <MenuIcon fontSize="inherit" />
            </IconButton>
            <Drawer
                style={customStyles.drawer}
                open={state}
                onClose={toggleDrawer}
            >
                {list()}
            </Drawer>
            <Dialog
                fullWidth={true}
                maxWidth={"xl"}
                open={open}
                onClose={handleClose}
            >
                <DialogContent>
                    <iframe style={customStyles.iframe} src={url} > </iframe>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
