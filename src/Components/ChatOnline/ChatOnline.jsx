import { useEffect, useState } from 'react';
import { MdMessage } from 'react-icons/md';
import './ChatOnline.css'
import Axios from 'axios'
const ChatOnline = ({currentId, setCurrentChat}) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFreinds] = useState([]);
    const [onlineFreinds , setOnlineFreinds] = useState([]);
    useEffect(() => {
        const getFreinds = async () => {
            const res = await Axios.get("http://localhost:4000/app/users/allUsers");
            setFreinds(res.data);
        }
        getFreinds();
    },[]);

    const handleClick = async (user) => {
        try {
            const res = await Axios.get(`http://localhost:4000/app/conversations/find/${currentId}/${friends._id}`);
            setCurrentChat(res.data);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
        <h4 className="textTitle">Online users</h4>
        <div className="chatOnline">
            {
                friends.map((o) =>(
                    <div key={o._id} className="chatOnlineFreind" onClick={(o)=>{handleClick(o)}}>
                        <div className="chatOnlineInfoContainer">   
                            <div className="chatOnlineImgContainer">
                                <img src={o?.profilePicture ? PF +o.profilePicture :PF +"chatWork.svg"} alt="" className="chatOnlineImg" />
                                <div className="chatOnlineBadge"></div>
                            </div>
                            <div className="chatOnlineUsername">{o.fullName}</div>
                        </div>
                        <div className="chatOnlineIcon onlineChat"> 
                            <MdMessage className="appColor" />
                        </div>
                    </div>
                ))
            }
        </div>
        </>
    );
}

export default ChatOnline;