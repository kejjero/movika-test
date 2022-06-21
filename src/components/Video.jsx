import cat from "../images/cat.jpeg"

function Video ({videos, index, videoRef, currentType}) {
    return(
        <video
            className="player__video"
            preload="metadata"
            muted="muted"
            ref={videoRef}
            src={videos[index]}
            placeholder={cat}
            autoPlay="autoplay"
            type={currentType}
            no-controls="true"
            playsInline
        >
            Ваш браузер не поддерживает встроенные видео :(
        </video>
    )
}

export default Video;