import { Container, Divider, FormControl, Grid, IconButton, List, ListItem, ListItemText, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Fragment, useEffect, useRef, useState, useContext } from "react";
import { UserInfoContextStore } from './../UserInfoContext';
import { makeStyles } from "@material-ui/core/styles";
import './Chat.css';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import useChat from "../useChat";
import Button from '@mui/material/Button';
import FlightIcon from '@mui/icons-material/Flight';
import HelpBoard from '../HelpBoard'

const useStyles = makeStyles(theme => ({
    paper: {
        backgroundColor: 'transparent',
        padding: theme.spacing(1),
    },
}));

export default function ChatTest(props) {
    const unityContext = props.unityContext;
    const { InGame, isUsernameSet, setIsUsernameSet, name, unityLoaded, isMobile, setIsMobile, cameraOver, connect, setUsernameInput } = useContext(UserInfoContextStore)
    const roomId = 'test'
    const ENTER_KEY_CODE = 13;
    const scrollBottomRef = useRef(null);

    const { messages, sendMessage } = useChat(roomId, name);
    const [newMessage, setNewMessage] = useState("");
    const [open, setOpen] = useState(false);
    const [view, setView] = useState(false);
    const classes = useStyles();
    const [focused, setFocused] = useState(false)


    const handleUserChange = (event) => {
        setUser(event.target.value);
    }

    useEffect(() => {
        if (scrollBottomRef.current) {
            scrollBottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    useEffect(() => {
        if (unityLoaded) {
            unityContext.send("WebManager", "SetInputWeb")
        }
    }, [unityLoaded]);


    const handleNewMessageChange = (event) => {
        setNewMessage(event.target.value);
    }

    const handleEnterKey = (event) => {
        if (event.keyCode === ENTER_KEY_CODE) {
            sendMessage(newMessage);
            setNewMessage("")
        }
    }

    const handleToggle = () => {
        setOpen(!open);
        unityContext.send("WebManager", "SetInputWeb")
    };

    const toggleView = () => {
        setView(!open);
        unityContext.send("WebManager", "ToggleView")
    };

    const handleConnect = () => {
        if (!isUsernameSet) {
            setUsernameInput(true);
        } else {
            console.log("handleConnect")
            unityContext.send("Setting", "JoinRoom")
        }
    }


    const onFocus = () => setFocused(true)
    const onBlur = () => setFocused(false)

    const listChatMessages = messages.map((message, index) =>
        <ListItem key={index}>
            {message.ownedByCurrentUser ?
                <ListItemText
                    primary={<Typography style={{ color: 'white' }}>{message.username}:{message.body}</Typography>}
                /> :
                <ListItemText
                    primary={<Typography style={{ color: '#00FFFF' }}>{message.username}:{message.body}</Typography>}
                />
            }
        </ListItem>
    );
    const mobileText = () => {
        return (
            <TextField className="mobile-aux-input" size="small"
                value={newMessage}
                variant="outlined" />
        )
    }

    return (
        <Fragment>
            <HelpBoard></HelpBoard>
            {(cameraOver && !InGame) &&
                <Button color="primary" size="small" variant="contained" className="connect-button" onClick={handleConnect}>접속</Button>
            }
            {InGame &&
                <>
                    <IconButton size="larg" aria-label="대화" onClick={handleToggle} className='chat-button'>
                        <ChatBubbleIcon className="button-icon" />
                    </IconButton>
                    <IconButton aria-label="SkyView" onClick={toggleView} className='view-button'>
                        <FlightIcon className="button-icon" />
                    </IconButton>
                </>
            }
            {
                open && <Grid xs={4} sm={3} className="chat-container">
                    {/* <Paper elevation={5} className={classes.paper}> */}
                    <Paper spacing={1} elevation={5} className="chat-window">
                        <Box p={0} >
                            <Grid container spacing={1} alignItems="center">
                                <Grid id="chat-window" xs={12} item>
                                    <List id="chat-window-messages">
                                        {listChatMessages}
                                        <ListItem ref={scrollBottomRef}></ListItem>
                                    </List>
                                </Grid>
                                <Grid xs={12} item >
                                    <FormControl fullWidth>
                                        {(isMobile && focused) ? <TextField size="small" onChange={handleNewMessageChange} onKeyDown={handleEnterKey}
                                            value={newMessage}
                                            variant="outlined"
                                            onFocus={onFocus} onBlur={onBlur}
                                            className="mobile-aux-input"
                                        />
                                            : <TextField size="small" onChange={handleNewMessageChange} onKeyDown={handleEnterKey}
                                                value={newMessage}
                                                variant="outlined"
                                                onFocus={onFocus} onBlur={onBlur}
                                            />}
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Grid>
            }
        </Fragment>
    );
}