import React, { useState, useEffect, useContext } from "react";
import {
    Card,
    CardHeader,
    CardContent,
    Typography
} from "@material-ui/core";
import './MC.css';
import { UserInfoContextStore } from '../UserInfoContext';

export default function MC() {
    const { mcMessage } = useContext(UserInfoContextStore)
    const [open, setOpen] = useState(false)
    const [time, setTime] = useState(0);
    // 시간 경과 체크를 위한 useEffect
    useEffect(() => {
        console.log(mcMessage)
        // handleToggle()

        setOpen(true)
        const tick = setTimeout(() => {
            setOpen(false)
        }, 5000);

        // eslint-disable-next-line consistent-return
        return () => clearTimeout(tick);
    }, [time, mcMessage]);

    function handleToggle() {
        setOpen(!open)
    }

    return (
        <>
            {open && <div className="mc-parent">
                <Card elevation={5} className="mc-container">
                    <CardContent>
                        <Typography style={{ paddingLeft: '1Rem', fontSize: "2rem", color: '#f3fff0', wordWrap: "break-word" }}>
                            {mcMessage}
                        </Typography>
                    </CardContent>
                </Card>
            </div>}
        </>




    )
}
