import '../vendor/normalize.css'
import '../scss/app.scss'
import {useEffect, useRef, useState} from "react";
import Panel from "./Panel";
import AlertError from "./AlertError";
import {videos} from "../videos/videos"
import {getTypeVideo} from "../videos/videos"
import Video from "./Video";

const App = () => {
    const videoRef = useRef(null); // реф плеера
    const [currentType, setCurrentType] = useState('mp4') // тип обрабатываемого видео
    const [duration, setDuration] = useState(0); // длина видео
    const [index, setIndex] = useState(0); // индекс текущего видео в массиве
    const [time, setTime] = useState(null); // текущее время видео
    const valueDanger = 10; // количество секунд до появления красной зоны прогресс бара

    // Ожидание загрузки и получение длины видео
    useEffect(() => {
        setCurrentType(getTypeVideo(index))
        if (videoRef.current.src) {
            const video = videoRef.current
            video.onloadedmetadata = function () {
                handleCountTime(video.duration)
            }
        } else {
            alert('Ошибка воспроизведения видео')
            stopVideo()
        }
    }, [index, time])

    // Обновление таймера и проверка на ноль
    useEffect(() => {
        if (videoRef.current.src) {
            setTimeout(() => {
                time !== 0 ? checkTime(videoRef.current) : stopVideo()
            }, 1000)
        } else {
            alert('Ошибка воспроизведения видео')
            stopVideo()
        }
    }, [time])

    function playVideo() {
        videoRef.current.play();
    }

    function stopVideo() {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
    }

    // Функция счетчика времени
    function checkTime() {
        const currentTime = Math.ceil(videoRef.current.currentTime);
        const durationVideo = Math.ceil(videoRef.current.duration);
        setTime(durationVideo - currentTime)
    }

    // Функция получения длины видео
    function handleCountTime(value) {
        const durationCeil = Math.ceil(value)
        setDuration(durationCeil)
    }

    // Обработка успешного клика на кнопку
    function handleNextVideo() {
        setIndex(getNextIndex(index))
        setCurrentType(getTypeVideo(index))
        setTime(null)
    }

    function handleResetVideos() {
        setTime(null)
        setIndex(0)
        setCurrentType(getTypeVideo(index))
        playVideo();
    }

    function getNextIndex(currentIndex) {
        return currentIndex < videos.length - 1 ? currentIndex + 1 : 0;
    }

    return (
        <main className="content">
            <div className="player">
                <AlertError
                    time={time}
                    handleResetVideos={handleResetVideos}
                />
                <Video
                    index={index}
                    videoRef={videoRef}
                    videos={videos}
                    currentType={currentType}
                />
                <Panel
                    duration={duration}
                    time={time}
                    handleNextVideo={handleNextVideo}
                    index={index}
                    valueDanger={valueDanger}
                />
            </div>
        </main>
    )
}

export default App;
