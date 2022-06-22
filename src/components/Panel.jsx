import {useEffect, useState} from "react";

function Panel({time, handleNextVideo, valueDanger, progress}) {
    const [color, setColor] = useState('#fff')
    const [isDangerZone, setIsDangerZone] = useState(false)
    const clipPathProgress = {clipPath: `inset(${progress}% -10px ${progress}% -10px)`}
    const animationOnsetButton = {animation: `buttonScale ease-in-out ${0.7}s`}

    useEffect(() => {
        if (time !== null) {
            switch (!time) {
                case (time >= valueDanger + 1): {
                    activeDangerZone();
                    break;
                }
                case (time < valueDanger): {
                    disableDangerZone();
                    break;
                }
                case (time === 0): {
                    disableDangerZone();
                    break;
                }
                default:
                    disableDangerZone();
                    break;
            }
        }
    }, [time, valueDanger])

    function disableDangerZone() {
        setIsDangerZone(false)
        setColor("#fff")
    }

    function activeDangerZone() {
        setIsDangerZone(true)
        setColor("#FF0059")
    }

    return (
        <div className={`panel ${isDangerZone && 'panel__type_isDangerZone'}`}>
            <div className="panel__wrapper">
                <div className="panel__progress-bar panel__progress-bar_left">
                    <svg className="panel__progress-bar-svg" viewBox="0 0 62 280" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M26.4609 0.500916C26.4609 0.500916 1.0154 72.1433 1.0154 142.755C1.0154 211.363 26.4609 278.998 26.4609 278.998"
                            stroke="white" strokeWidth="2"/>
                        <path opacity="0.2"
                              d="M33 19.7908L28.9385 3.00537C28.9385 3.00537 4.06154 71.7456 4.06154 140.426C4.06154 208.99 28.9385 277.496 28.9385 277.496L33 260.711C33 260.711 8.12308 209.087 8.12308 140.572C8.12308 71.8418 33 19.7908 33 19.7908Z"
                              fill="white"/>
                    </svg>
                    {
                        time !== 0 &&
                        <svg className="panel__progress-bar-svg panel__progress-bar_animate"
                             viewBox="0 0 62 280"
                             fill="none"
                             xmlns="http://www.w3.org/2000/svg"
                             style={clipPathProgress}
                        >
                            <path
                                d="M26.4609 0.500916C26.4609 0.500916 1.0154 72.1433 1.0154 142.755C1.0154 211.363 26.4609 278.998 26.4609 278.998"
                                stroke={color} strokeWidth="2"
                            />
                            <path
                                opacity="0.2" fill={color}
                                d="M33 19.7908L28.9385 3.00537C28.9385 3.00537 4.06154 71.7456 4.06154 140.426C4.06154 208.99 28.9385 277.496 28.9385 277.496L33 260.711C33 260.711 8.12308 209.087 8.12308 140.572C8.12308 71.8418 33 19.7908 33 19.7908Z"/>
                        </svg>
                    }
                    <p style={{color}} className="panel__duration panel__duration_left">{time}</p>
                </div>


                {
                    isDangerZone &&
                    <button
                        type="button"
                        className='panel__button'
                        onClick={() => {
                            disableDangerZone();
                            handleNextVideo()
                        }}
                        style={animationOnsetButton}
                    >
                        <svg viewBox="0 0 40 45" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.833184 0.168973L39.327 21.8813L1.04571 44.2949L0.833184 0.168973Z"
                                  fill={color} fillOpacity="1"
                                  stroke="#fff" strokeWidth="1" strokeOpacity="0.3"/>
                        </svg>
                    </button>
                }

                <div className="panel__progress-bar panel__progress-bar_right">
                    <p style={{color}} className="panel__duration panel__duration_right">{time}</p>
                    <svg className="panel__progress-bar-svg" viewBox="0 0 62 280" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M29.0261 0.500916C29.0261 0.500916 60.7347 72.1433 60.7347 142.755C60.7347 211.363 29.0261 278.998 29.0261 278.998"
                            stroke="white" strokeWidth="2"/>
                        <path opacity="0.2"
                              d="M20.8776 19.7908L25.9388 3.00537C25.9388 3.00537 56.9388 71.7456 56.9388 140.426C56.9388 208.99 25.9388 277.496 25.9388 277.496L20.8776 260.711C20.8776 260.711 51.8776 209.087 51.8776 140.572C51.8776 71.8418 20.8776 19.7908 20.8776 19.7908Z"
                              fill="white"/>
                    </svg>
                    {
                        time !== 0 &&
                        <svg className="panel__progress-bar-svg panel__progress-bar_animate" viewBox="0 0 62 280"
                             fill="none"
                             xmlns="http://www.w3.org/2000/svg"
                             style={clipPathProgress}
                        >
                            <path
                                d="M29.0261 0.500916C29.0261 0.500916 60.7347 72.1433 60.7347 142.755C60.7347 211.363 29.0261 278.998 29.0261 278.998"
                                stroke={color} strokeWidth="2"
                            />
                            <path
                                opacity="0.2" fill={color}
                                d="M20.8776 19.7908L25.9388 3.00537C25.9388 3.00537 56.9388 71.7456 56.9388 140.426C56.9388 208.99 25.9388 277.496 25.9388 277.496L20.8776 260.711C20.8776 260.711 51.8776 209.087 51.8776 140.572C51.8776 71.8418 20.8776 19.7908 20.8776 19.7908Z"/>
                        </svg>
                    }
                </div>
            </div>
        </div>
    )
}

export default Panel;