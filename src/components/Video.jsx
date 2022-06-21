import {videosArray} from "../videos/videos";
import cat from "../images/cat.jpeg"

function Video ({index, videoRef}) {
    return(
        <video
            className="player__video"
            preload="metadata"
            muted="muted"
            ref={videoRef}
            src={videosArray[index]}
            placeholder={cat}
            autoPlay="autoplay"
            type="video/mp4"
            no-controls="true"
            playsInline
        >
            Ваш браузер не поддерживает встроенные видео :(
        </video>
    )
}

// type="video/mp4"/>
// type="video/webm"/>
// type="video/ogv"/>
export default Video;