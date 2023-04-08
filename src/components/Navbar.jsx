import { useState } from "react";
import Logo from "../assets/images/netflix-logo.svg";
import { GoSearch } from "react-icons/go";
import { MdOutlineNotificationsNone } from "react-icons/md";
import userIcon from "../assets/netflix-profile-icons/216 - 6FgZxbi.png";
import UserDropdown from "./UserDropDown";



export default function Navbar() {
    const [toggle, setToggle] = useState(false);
    const [userToggle, setUserToggle] = useState(false);

    function showsearchbox() {
        setToggle(!toggle);
    }
    function showUserDetail() {
        setUserToggle(!userToggle);
    }

    return (
        <div id="navbar">
            <img src={Logo} alt="netflix" />
            <div className="menu">
                <ul>
                    <li><a href=".">Home</a></li>
                    <li><a href="/movies">Movies</a> </li>
                    <li><a href="/tvshows">Tv Shows</a></li>
                    <li><a href="/documentary"> Documentaries</a></li>
                </ul>
            </div>
            <div className="searchbox">
                <input type="search" id="searchinput" placeholder="Type to search..." className={toggle ? "showsearch" : "hidesearch"} />
                <div className="search-btn" onClick={() => showsearchbox()}><GoSearch id="searchicon" /></div>
            </div>
            <MdOutlineNotificationsNone className="reacticons" />
            <img src={userIcon} alt={"yellow default icon"} className="reacticons" onM={() => showUserDetail()} />
            {userToggle && <UserDropdown />}
        </div>
    )
}