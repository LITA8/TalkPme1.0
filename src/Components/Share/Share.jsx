import React, { useState } from 'react';
import './Share.css'
import {} from 'react-icons/fa'
import {} from 'react-icons/fi'
import {MdCancel, MdPermMedia, MdTextFields} from 'react-icons/md'
import {AuthContext} from '../../Context/AuthContext';
import { useContext } from 'react';
import { useRef } from 'react';
import Axios from 'axios';

const Share = ({post}) => {
    const {user} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const description = useRef();
    const [file, setFile] = useState(null)

    const submitHandler = async (e) => {
        e.preventDefault();

        const newPost = {
            userId: user._id,
            description: description.current.value
        }

        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file",file);
            newPost.img = fileName;
            
            let extention = fileName.split('.')[1];
            if (extention=="mp4") {
                newPost.typePost = "video";
            }
           
            try {
                const res = await Axios.post("http://localhost:4000/app/upload/",data);
                window.location.reload();
            } catch (error) {
                console.log(error);
            }


        }

        try {
            await Axios.post("http://localhost:4000/app/posts/",newPost);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className="shareProfilePicture" src={user.profilePicture ? PF+user.profilePicture : PF+"./assets/chatWork.svg"} alt=""/>
                    <input
                        type="text"
                        className="shareInput"
                        placeholder={"   Une information a publier ..."+user.fullName+"?"}
                        ref={description}
                    />
                </div>
                <hr className="shareHr"/>
                {file &&(
                    <div className="shareImageContainer">
                        <img className="shareImage" src={URL.createObjectURL(file)} alt="" />
                        <MdCancel className="shareCancelImg" color="red" onClick={() => setFile(null)}/>
                    </div>
                )
                }
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <MdPermMedia className="shareIcons"/>
                            <span className="shareOptionText">Photo or Video</span>
                            <input 
                                type="file" 
                                id="file" 
                                accept=".png, .pdf, .svg, .jpeg, .jpg, .mp4, .webm, avi, mkv" 
                                onChange={(e)=>setFile(e.target.files[0])}
                                style={{display:"none"}}
                            />
                        </label>
                        <div className="shareOption">
                            <MdPermMedia className="shareIcons"/>
                            <span className="shareOptionText">Photo or Video</span>
                        </div>
                    </div>
                    <button className="shareButton" type="submit">Share</button>
                </form>
            </div>
        </div>
    );
}

export default Share;