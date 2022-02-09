import './rightbar.css'
import { Users } from "../../dummyData"
import Online from '../online/Online'
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { AuthContext } from '../../context/AuthContext';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
export default function Rightbar({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);
    const { user: currentUser, dispatch } = useContext(AuthContext);
    const [followed, setFollowed] = useState(currentUser.following.includes(user?.id));
    useEffect(() => {
        setFollowed(currentUser.following.includes(user?.id));
    }, [currentUser, user?.id]);
    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendList = await axios.get("/users/friends/" + user._id);
                setFriends(friendList.data);
            } catch (err) {
                console.log(err);
            }
        };
        getFriends();
    }, [user]);
    const handleClick = async () => {
        try {
            if (followed) {
                await axios.put("/users/" + user._id + "/unfollow", { userId: currentUser._id });
                dispatch({ type: "UNFOLLOW", payload: user._id })
            } else {
                await axios.put("/users/" + user._id + "/follow", { userId: currentUser._id });
                dispatch({ type: "FOLLOW", payload: user._id })

            }
        } catch (err) {
            console.log(err)
        }
        setFollowed(!followed);
    }
    const HomeRightbar = () => {
        return (
            <>
                <div className="birthdayContainer">
                    <img src={`${PF}/gift.png`} alt="" className="birthdayImg" />
                    <span className="birthdayText">Pola Foster and 3 others have birthday today</span>
                </div>

                <img src={`${PF}/ad.png`} alt="" className="rightbarAd" />
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    {Users.map(u => (
                        <Online key={u.id} user={u} />
                    ))}
                </ul>
            </>
        );
    }
    const ProfileRightbar = () => {
        return (
            <>
                {user.username !== currentUser.username && (
                    <button className="rightbarFollowButton" onClick={handleClick}>
                        {followed ? "Unfollow" : "Follow"}
                        {followed ? <RemoveIcon /> : <AddIcon />}

                    </button>
                )}
                <h4 className="rightbarTitle"> User Information </h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City: </span>
                        <span className="rightbarInfoValue">{user.city}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From: </span>
                        <span className="rightbarInfoValue">{user.from}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship: </span>
                        <span className="rightbarInfoValue">{user.relationship === 1 ? "Single" : user.relationship === 2 ? "Married" : "Complicated"}</span>
                    </div>
                </div>
                <h4 className="rightbarTitle"> User Friends </h4>
                <div className="rightbarFollowings">
                    {friends.map((friend) => (
                        <Link to={"/profile/" + friend.username} style={{ textDecoration: "none" }}>
                            <div className="rightbarFollowing">
                                <img src={friend.profilePicture ? PF + friend.profilePicture : PF + "person/noAvatar.png"} alt="" className="rightbarFollowingImg" />
                                <span className="rightbarFollowingName">{friend.username}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </>
        );
    }
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">

                {user ? <ProfileRightbar /> : <HomeRightbar />}
            </div>
        </div>
    )
}
