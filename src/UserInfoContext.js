import React, { createContext, useState, useEffect } from 'react'; // createContext를 불러온다.
import axios from 'axios';
import Unity, { UnityContext } from "react-unity-webgl";
//하나의 Context를 생성합니다.
export const UserInfoContextStore = createContext();

/**
 * Context를 생성할 때 기본 값을 세팅한다. 
 * React에서는 값을 컨트롤 할 때는 Component를 만들어 사용하는걸 지향한다.
 *
 * **/
const UserInfoContext = (props) => {
    const [name, setName] = useState(); // 유저 이름
    const [ip, setIp] = useState(); // 유저 나이
    const [avatar, setAvatar] = useState(); // 유저 나이
    const [localData, setLocalData] = useState()
    const [isBlocked, setIsBlocked] = useState(false)
    const [postStatus, setPostStatus] = useState()
    const [wordReg, setWordReg] = useState(/[]/)

    useEffect(function () {
        setLocalData(localStorage.getItem('busanMayor'))
        getWordList()
    }, []);
    const getIp = async () => {
        const res = await axios.get("https://geolocation-db.com/json/d802faa0-10bd-11ec-b2fe-47a0872c6708")
        setIp(res.data)
    }

    const eraseLocal = () => {
        setLocalData(null)
        localStorage.setItem('busanMayor', null)
        console.log(localData)
    }

    const postUserdata = async (input) => {
        const post_connect_url = "http://localhost:5000/api/connection"
        axios.post(post_connect_url, input)
            .then(function (response) {
                setPostStatus(response.status);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function getWordList() {
        axios.get(`http://localhost:5000/api/blacklist`)
            .then(res => {
                let word_black_list = res.data[0].list_items;
                let test_string = '('
                word_black_list.forEach(word => {
                    test_string = test_string + word + '|'
                });
                let string = test_string.substring(0, test_string.length - 1) + ')'
                console.log(string)
                setWordReg(new RegExp(string, 'i'));
            })
    }

    const UserInfo = {
        name,
        setName,
        ip,
        setIp,
        localData,
        setLocalData,
        avatar,
        setAvatar,
        getIp,
        eraseLocal,
        wordReg,
        postUserdata
    }
    return (<UserInfoContextStore.Provider value={UserInfo}>{props.children}</UserInfoContextStore.Provider>);
};

export default UserInfoContext;