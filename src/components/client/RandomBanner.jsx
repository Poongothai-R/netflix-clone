import { useCategory } from "../../state/useCategory";
import { FaPlay, FaInfoCircle } from "react-icons/fa";
import DisplayModal from "./DisplayModal";
import { useNavigate } from "react-router-dom";
import Placeholder from "../../assets/images/placeholder.jpg";

export default function RandomBanner() {

    const { displayData } = useCategory();
    const data = displayData[0].dataList[0];
    const {Title, ShortDesc} = data;
    const {setModal} = useCategory();
    const Navigate = useNavigate();

    const ImageSource = (data.BannerImage === null) ? Placeholder : data.BannerImage;

    return (
        <div className="Banner" id="banner">
            <img src={ImageSource} alt={Title} />
            <div className="BannerContent">
                <span >{Title}</span>
                <p >{ShortDesc}</p>
                <div className="Banner-btn">
                    <button className="play-btn" onClick={() =>
                        Navigate(`/${displayData[0].id}/${Title}`,{ state: { data:data } } ) }>
                        <FaPlay  /><h3>Play</h3>
                    </button>
                    <button className="info-btn" onClick={()=>
                        setModal(<DisplayModal data={data}/>)}>
                        <FaInfoCircle /><h3>More Info</h3>
                    </button>
                </div>
            </div>
        </div>
    )
}