import React, { createContext, useState, useEffect } from 'react'; // createContext를 불러온다.
import axios from 'axios';

export const UserInfoContextStore = createContext();

/**
 * Context를 생성할 때 기본 값을 세팅한다. 
 * React에서는 값을 컨트롤 할 때는 Component를 만들어 사용하는걸 지향한다.
 *
 * **/
const UserInfoContext = (props) => {
    const [name, setName] = useState();
    const [ip, setIp] = useState();
    const [avatar, setAvatar] = useState();
    const [localData, setLocalData] = useState()
    const [userBlackList, setUserBlackList] = useState()
    const [wordBlackList, setWordBlackList] = useState()
    const [isBlocked, setIsBlocked] = useState(false)
    const [postStatus, setPostStatus] = useState()
    const [helpToggle, setHelpToggle] = useState()
    const [usernameInput, setUsernameInput] = useState(false)
    const [wordReg, setWordReg] = useState(/[]/)
    const [unityLoaded, setUnityLoaded] = useState(false);
    const [gameLoaded, setGameLoaded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [openingVideo, setOpeningVideo] = useState(true);
    const [progression, setProgression] = useState(0);
    const [cameraOver, setCameraOver] = useState(false);
    const [isUsernameSet, setIsUsernameSet] = useState(false);
    const [InGame, setInGame] = useState(false);
    const [links, setLinks] = useState();
    const [boards, setBoards] = useState();
    const [isVideoOver, setIsVideoOver] = useState(false);

    // const backend_uri = "https://203.250.81.122:5000"
    const backend_uri = process.env.REACT_APP_DB_HOST
    // const backend_uri = "http://localhost:5000"

    useEffect(function () {
        setLocalData(localStorage.getItem('busanMayor'))
        getBlackList()
        setRandomColor()
        getLink()
    }, []);

    const getIp = async () => {
        const res = await axios.get("https://geolocation-db.com/json/d802faa0-10bd-11ec-b2fe-47a0872c6708")
        setIp(res.data)
    }

    const eraseLocal = () => {
        setLocalData(null)
        localStorage.setItem('busanMayor', null)
        console.log("erase Local Data")
    }

    const postUserdata = async (input) => {
        const post_connect_url = backend_uri + "/api/connection"
        axios.post(post_connect_url, input)
            .then(function (response) {
                setPostStatus(response.status);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    window.mobileCheck = function () {
        let check = false;
        (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
        setIsMobile(check)
    };

    const connect = () => {
        console.log("connect")
    }

    const setRandomColor = () => {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        // setTextColor("#" + randomColor);
    }
    function getBlackList() {
        axios.get(backend_uri + "/api/blacklist")
            .then(res => {
                let temp = {}
                res.data.forEach(list_component => {
                    temp[list_component.category] = list_component.list_items
                });
                setUserBlackList(temp.names)
                setWordBlackList(temp.words)
                let test_string = '('
                temp.words.forEach(word => {
                    test_string = test_string + word + '|'
                });
                temp.names.forEach(word => {
                    test_string = test_string + word + '|'
                });
                let string = test_string.substring(0, test_string.length - 1) + ')'
                setWordReg(new RegExp(string, 'i'));
            })
    }
    function getLink() {
        axios.get(backend_uri + "/api/boardlist")
            .then(res => {
                let temp = {}
                let board = {}
                res.data.forEach(element => {
                    temp[element.type_] = element.url
                    if (element.name) {
                        board[element.name] = element.url
                    }
                });
                setBoards(board)
                setLinks(temp)
            })
    }

    const UserInfo = {
        name, setName,
        isVideoOver, setIsVideoOver,
        ip, setIp,
        localData, setLocalData,
        avatar, setAvatar,
        getIp, eraseLocal,
        wordReg,
        postUserdata,
        setUsernameInput,
        usernameInput,
        unityLoaded, setUnityLoaded,
        gameLoaded, setGameLoaded,
        isMobile, setIsMobile,
        openingVideo, setOpeningVideo,
        progression, setProgression, boards,
        connect, getBlackList, helpToggle, setHelpToggle,
        cameraOver, setCameraOver, wordBlackList, setWordBlackList,
        isUsernameSet, setIsUsernameSet, InGame, setInGame, links, userBlackList
    }
    return (<UserInfoContextStore.Provider value={UserInfo}>{props.children}</UserInfoContextStore.Provider>);
};

export default UserInfoContext;
