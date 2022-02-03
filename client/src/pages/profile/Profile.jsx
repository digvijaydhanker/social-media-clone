import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./profile.css"
import { useParams } from "react-router"
import { AuthContext } from "../../context/AuthContext";
export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const username = useParams().username;
    const { user: createUser } = useContext(AuthContext);
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?username=${username}`);
            setUser(res.data);
        };
        fetchUser();
    }, [username]);

    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img src={
                                createUser.coverPicture
                                    ? PF + createUser.coverPicture
                                    : PF + "person/noCover.png"
                            } alt=""
                                className="profileCoverImg" />
                            <img src={
                                createUser.profilePicture
                                    ? PF + createUser.profilePicture
                                    : PF + "person/noAvatar.png"
                            }
                                alt=""
                                className="profileUserImg" />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <h4 className="profileInfoDesc">{user.desc}</h4>
                        </div>

                    </div>
                    <div className="profileRightBottom">
                        <Feed username={username} />
                        <Rightbar user={user} />
                    </div>

                </div>

            </div>
        </>
    );
}
