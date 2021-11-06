import './CreateRooms.css';
import {v1 as uuid} from "uuid";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import {} from 'react-icons/fi'
import { MdRoom } from 'react-icons/md'

const VideoCHat = ({props}) => {
    const history = useHistory();
    const create = () =>{
        const id = uuid();
        history.push(`/video-chat/room/${id}`)
    }
    return (
        <button className="createRoomsButton" onClick={create}> <MdRoom/> Create a room</button>
    );
}

export default VideoCHat;