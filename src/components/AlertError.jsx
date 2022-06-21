import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import {useEffect, useState} from "react";

function AlertError({time, handleResetVideos}) {
    const [isOpenPopup, setIsOpenPopup] = useState(false)

    useEffect(() => {
        time === 0 && setIsOpenPopup(true)
    }, [time])

    const styleButton = {
        backgroundColor: 'rgba(225, 42, 42, 0.2)',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        padding: '5px 10px',
    }

    return (
        isOpenPopup &&
        <Stack sx={{width: '100%', position: 'absolute', top: '0', zIndex: '1'}} spacing={2}>
            <Alert severity="error">
                <AlertTitle>Вы не нажали на кнопку</AlertTitle>
                <button type="button" onClick={() => {
                    handleResetVideos()
                    setIsOpenPopup(false)
                }} style={styleButton}>Попробовать еще раз
                </button>
            </Alert>
        </Stack>
    )
}

export default AlertError;