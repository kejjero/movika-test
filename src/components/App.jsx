import '../vendor/normalize.css'
import '../scss/app.scss'
import {useEffect, useRef, useState} from "react";
import Panel from "./Panel";
import AlertError from "./AlertError";
import {videos} from "../videos/videos"
import {getTypeVideo} from "../videos/videos"
import Video from "./Video";

function App() {
    const videoRef = useRef(null); // реф плеера
    const [currentType, setCurrentType] = useState('mp4') // тип обрабатываемого видео
    const [duration, setDuration] = useState(0); // длина видео
    const [index, setIndex] = useState(0); // индекс текущего видео в массиве
    const [time, setTime] = useState(null); // оставшееся время видео
    const [currentTime, setCurrentTime] = useState(null) // текущее время видео
    const [percentProgress, setPercentProgress] = useState(0) // от 0 до 50% шкала прогресс бара
    const valueDanger = 8; // количество секунд до появления красной зоны прогресс бара

    // Ожидание загрузки и получение длины видео
    useEffect(() => {
        setPercentProgress(0)
        setCurrentType(getTypeVideo(index))
        if (videoRef.current.src) {
            const video = videoRef.current
            video.onloadedmetadata = function () {
                handleCountTime(video.duration)
                checkTime(videoRef.current)
            }
        } else {
            alert('Ошибка воспроизведения видео')
        }
    }, [index])

    // Обновление таймера и проверка на ноль
    useEffect(() => {
        if (videoRef.current.src) {
            getPercentProgress()
            const timeOut =setTimeout(() => {
                time !== 0 ? checkTime(videoRef.current) : stopVideo()
            }, 1000)
            return(() => clearTimeout(timeOut))
        } else {
            stopVideo()
            alert('Ошибка воспроизведения видео')
        }
    }, [time])

    function playVideo() {
        videoRef.current.play();
    }

    function stopVideo() {
        videoRef.current.currentTime = 0;
        setPercentProgress(0)
        videoRef.current.pause();
    }

    // Подсчет времени
    function checkTime() {
        const currentTime = Math.ceil(videoRef.current.currentTime);
        const durationVideo = Math.ceil(videoRef.current.duration);
        setTime(durationVideo - currentTime)
        setCurrentTime(currentTime)
    }

    // Получение длины видео
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

    // Рестарт видео
    function handleResetVideos() {
        setTime(null)
        setIndex(0)
        setCurrentType(getTypeVideo(index))
        playVideo();
    }

    // Получение следующего индекса из массива видео
    function getNextIndex(currentIndex) {
        return currentIndex < videos.length - 1 ? currentIndex + 1 : 0;
    }

    function getPercentProgress() {
        setPercentProgress((currentTime / duration * 100) / 2)
    }

    return (
        <main className="content">
            <div className="player">
                <Video
                    index={index}
                    videoRef={videoRef}
                    videos={videos}
                    currentType={currentType}
                />
                <Panel
                    time={time}
                    handleNextVideo={handleNextVideo}
                    index={index}
                    valueDanger={valueDanger}
                    progress={percentProgress}
                />
                <AlertError
                    time={time}
                    handleResetVideos={handleResetVideos}
                />
            </div>
        </main>
    )
}

export default App;
