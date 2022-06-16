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

const useStyles = makeStyles(theme => ({
    paper: {
        backgroundColor: 'transparent',
        padding: theme.spacing(1),
    },
}));

export default function ChatTest(props) {
    const unityContext = props.unityContext;
    const { myMessage, isChatOpen, setIsChatOpen, toggleChat, InGame, isUsernameSet, setIsUsernameSet, name, unityLoaded, isMobile, setIsMobile, cameraOver, connect, setUsernameInput } = useContext(UserInfoContextStore)
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
        if (isChatOpen) {
            unityContext.send("WebManager", "SetInputWeb")
        } else {
            unityContext.send("WebManager", "SetInputUnity")
        }
        let last_message = messages[messages.length - 1]
        if (last_message) {
            let temp = last_message.username + ":" + last_message.body
            console.log(temp)
            unityContext.send("WebManager", "CallCaht", temp)
        }
    }, [messages, isChatOpen]);

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

    const handleConnect = () => {
        if (!isUsernameSet) {
            setUsernameInput(true);
        } else {
            console.log("handleConnect")
            unityContext.send("Setting", "JoinRoom")
        }
    }

    const onFocus = () => {
        setFocused(true)
        unityContext.send("WebManager", "SetInputWeb")
    }
    const onBlur = () => {
        setFocused(false)
        unityContext.send("WebManager", "SetInputUnity")
    }

    const listChatMessages = messages.map((message, index) =>
        <ListItem key={index}>
            {message.ownedByCurrentUser ?
                <ListItemText
                    primary={<Typography style={{ color: '#00FFFF', wordWrap: "break-word" }}>{message.username}:{message.body}</Typography>}
                /> :
                <ListItemText
                    primary={<Typography style={{ color: 'white', wordWrap: "break-word" }}>{message.username}:{message.body}</Typography>}
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
            {(cameraOver && !InGame) &&
                <Button color="primary" size="small" variant="contained" className="connect-button" onClick={handleConnect}>접속</Button>
            }
            {
                isChatOpen && <Grid xs={4} sm={3} className="chat-container">
                    {/* <Paper elevation={5} className={classes.paper}> */}
                    <Paper spacing={1} elevation={5} className="chat-window">
                        <Box p={0} >
                            <Grid container spacing={1} alignItems="center">
                                <Grid id="chat-window" xs={12} item>
                                    <Typography style={{ paddingLeft: '1Rem', color: '#7CFC00', wordWrap: "break-word" }}>박형준 부산시장후보: {myMessage}</Typography>

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