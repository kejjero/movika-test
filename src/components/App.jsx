import '../vendor/normalize.css'
import '../scss/app.scss'
import {useEffect, useRef, useState} from "react";
import Panel from "./Panel";
import PopupError from "./PopupError";
import {videosArray} from "../videos/videos"

const App = () => {
    const videoRef = useRef(null);
    const [duration, setDuration] = useState(0); // длина видео
    const [index, setIndex] = useState(0); // индекс текущего видео в массиве
    const [time, setTime] = useState(); // текущее время видео
    const valueDanger = 7; // количество секунд до появления красной зоны прогресс бара

    // Для надежности нужны проверки для подгруженного контента

    // Ожидание загрузки и получение длины видео
    useEffect(() => {
        if (videoRef.current.src) {
            const video = videoRef.current
            video.onloadedmetadata = function () {
                handleCountTime(video.duration)
                checkTime(video)
                playVideo(video)
            }
        }
    }, [])

    // Обновление таймера и проверка на ноль
    useEffect(() => {
        if (videoRef.current.src) {
            const video = videoRef.current;
            const timer = setTimeout(() => {
                time !== 0 ? checkTime(video) : stopVideo(video)
                return (() => {
                    clearTimeout(timer)
                })
            }, 1000)
        } else {
            alert('Ошибка воспроизведения видео')
        }
    }, [time])


    function playVideo(video) {
        video.play();
    }

    function stopVideo(video) {
        video.pause();
        video.currentTime = 0;
        setDuration(null)
    }

    // Функция счетчика времени
    function checkTime(video) {
        if (video.currentTime && video.duration) {
            const currentTime = Math.ceil(video.currentTime);
            const durationVideo = Math.ceil(video.duration);
            setTime(durationVideo - currentTime)
        }
    }

    // Функция получения длины видео
    const handleCountTime = (value) => {
        const durationCeil = Math.ceil(value)
        setDuration(durationCeil)
    }

    // Функция клика на кнопку
    const handleOnClick = () => {
        if (index < videosArray.length - 1) {
            setIndex(index + 1)
        } else {
            setIndex(0)
        }
        playVideo(videoRef.current)
        setTime(null);
    }

// Могу ошибаться, но я думаю, что здесь некорректно использую ref.
// Так как получаю элемент video, а не source.
// Значит type не задается конкретному видео.
// Но при этом браузер корректно воспроизводит оба формата.
    return (
        <main className="content">
            <div className="player">
                <PopupError time={time} handleOnClick={handleOnClick}/>
                <video
                    className="player__video"
                    preload="metadata"
                    muted="muted"
                    ref={videoRef}
                    src={videosArray[index]}
                    autoPlay="autoplay"
                >
                    <source src={videosArray[index]} type="video/mp4"/>
                    <source src={videosArray[index]} type="video/webm"/>
                    <source src={videosArray[index]} type="video/ogv"/>
                    Ваш браузер не поддерживает встроенные видео :(
                </video>
                <Panel
                    duration={duration}
                    time={time}
                    handleOnClick={handleOnClick}
                    index={index}
                    valueDanger={valueDanger}
                />
            </div>
        </main>
    )
}

export default App;
