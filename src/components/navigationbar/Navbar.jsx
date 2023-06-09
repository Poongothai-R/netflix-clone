import { GoSearch } from "react-icons/go";
import { MdOutlineNotificationsNone } from "react-icons/md";
import Logo from "../../assets/images/netflix-logo.svg";
import userIcon from "../../assets/netflix-profile-icons/216 - 6FgZxbi.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../state/useUser";
import { useCategory } from "../../state/useCategory";
import "../../scripts/scroll";
import { useEpisode } from "../../state/useEpisode";


export default function Navbar() {
    const Navigate = useNavigate();
    const { saveUID, setUid, setIsAdmin, saveAdmin } = useUser();
    const [toggle, setToggle] = useState(false);
    const { displayData, setDisplayData, initDisplayData } = useCategory();
    const { setIsSearch } = useEpisode();

    function showsearchbox() {
        setToggle(!toggle);
        document.getElementById('searchinput').focus();
    }

    function onLogout() {
        saveUID("");
        setUid("");
        saveAdmin(false);
        setIsAdmin(false);
        Navigate("/");
    }

    function searchVideo(event) {
        event.preventDefault();
        setIsSearch({ type: 'SET_ITEM', payload: true });
        const searchkey = event.target.value;
        const searchTerm = searchkey.toLowerCase();
        if (searchkey !== '') {
            const filterData = displayData.map((recs) => {
                return { ...recs, dataList: recs.dataList.filter((itm) => itm.Title.toLowerCase().includes(searchTerm)) }
            });
            let dataLength = 0;
            filterData.map((recs) => { dataLength += recs.dataList.length });
            if (dataLength > 0) {
                setDisplayData({ type: 'SET_ITEM', payload: filterData });
            }
            else {
                setDisplayData({ type: 'SET_ITEM', payload: initDisplayData });
            }
        }
        else {
            setDisplayData({ type: 'SET_ITEM', payload: initDisplayData });
            setIsSearch({ type: 'SET_ITEM', payload: false });
        }
    }


    return (
        <div id="navbar">
            <nav>
                <div className="logo">
                    <a href="/"><img src={Logo} alt="netflix red colour text" /></a>
                </div>
                <div className="nav-links">
                    <a href="/">Home</a>
                    <a href="/movies">Movies</a>
                    <a href="/tvshows">TVShows</a>
                    <a href="/documentaries">Documentary</a>
                </div>
                <div className="searchbox">
                    <input type="search" id="searchinput" placeholder="Titles, Genres" className={toggle ? "showsearch" : "hidesearch"}
                        onChange={(event) => searchVideo(event)} />
                    <div className={toggle ? "move-search-btn" : "search-btn"} onClick={() => showsearchbox()}><GoSearch id="searchicon" /></div>
                </div>
                <a href=""><MdOutlineNotificationsNone className="bell-icon" /></a>
                <ul>
                    <li>
                        <a href=""> <img src={userIcon} alt="default yellow" className="profile-icon" /> </a>
                        <ul>
                            <li><a href="./.">Manage Profile</a></li>
                            <li><a href="/" onClick={() => onLogout()}>Logout</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    )
}