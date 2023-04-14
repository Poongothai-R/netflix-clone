import {useLocation} from "react-router-dom";

export default function PlayVideo() {

    const Location = useLocation();
    const videoURL = Location.state.data;
    const {Trailer,id,Title} = videoURL;

    if(Trailer===null) { return <h1> video unavailable.</h1>}

    return (
        <div id="playvideo">
            <iframe
                key={id}
                src={Trailer+'?autoplay=1'}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={Title}
            />
        </div>
    )
}