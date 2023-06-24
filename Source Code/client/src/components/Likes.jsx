import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeLogbook } from "../actions/logbook";
import { likeNews } from "../actions/news";
import { likeVideo } from "../actions/videos";
import LoginModal from "./Modals/LoginModal";

const Likes = ({likes, user, type, postId}) => {
    const [ likeCount, setLikeCount ] = useState(0);
    const [ isLiked, setLiked ] = useState(false);
    const {postLikes} = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);

    useEffect(()=>{
        if(likes){
            setLikeCount(likes.length);
            if(!!user && !!user._id)
                setLiked(likes.includes(user._id));
        }
    },[likes]);
    useEffect(()=>{
        if(postLikes && postLikes._id === postId){
            setLikeCount(postLikes.likes.length);
            if(!!user && !!user._id)
                setLiked(postLikes.likes.includes(user._id));
        }
    }, [postLikes]);

    const likeHandler = (e)=>{
        e.preventDefault();
        if(user) {
            if(type){
                switch(type){
                    case "news":
                        dispatch(likeNews(postId));
                        break;
                    case "logbook":
                        dispatch(likeLogbook(postId));
                        break;
                    case "video":
                        dispatch(likeVideo(postId));
                        break;
                }
            }
        }else{
            setShow(true);
        }
    }


    return(
        <>
            <LoginModal show={show} setShow={setShow} text="Вы должны быть авторизованы для данного действия" />
            <div style={{cursor: 'pointer'}} className="action" onClick={likeHandler}>
                <div className="icon-container">
                    {isLiked ? (
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.0003 30C-13.75 9.73607 6.14811 -6.07988 14.6702 2.28609C14.7828 2.39609 14.8934 2.51009 15.0003 2.62809C15.1061 2.5102 15.2161 2.39678 15.3303 2.28809C23.8505 -6.08388 43.7505 9.73406 15.0003 30Z" fill="#457B9D"/>
                        </svg>                                    
                    ) : (
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.0003 5.49608L13.6558 4.02208C10.5001 0.562095 4.7137 1.75609 2.62488 6.10608C1.64423 8.15207 1.42297 11.1061 3.21365 14.876C4.9387 18.506 8.52756 22.854 15.0003 27.59C21.473 22.854 25.0599 18.506 26.7869 14.876C28.5775 11.1041 28.3582 8.15207 27.3756 6.10608C25.2868 1.75609 19.5004 0.560095 16.3447 4.02008L15.0003 5.49608ZM15.0003 30C-13.75 9.73607 6.14812 -6.07988 14.6702 2.28609C14.7828 2.39609 14.8934 2.51009 15.0003 2.62809C15.1061 2.5102 15.2161 2.39678 15.3303 2.28809C23.8505 -6.08388 43.7505 9.73407 15.0003 30Z" fill="black"/>
                        </svg>
                    )}
                </div>
                {likeCount}
            </div>
        </>
    )
};
export default Likes;