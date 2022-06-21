import video_1 from './items/video_1.mp4'
import video_2 from './items/video_2.mp4'
import video_3 from './items/video_3.mp4'
import badVideo from './items/test.jpeg' // тест на неправильный формат "видео"

const videosArray = [video_1, badVideo, video_2, video_3]
const typesArray = ['mp4', 'webm', 'avi']

// Проверка на корретный тип видео
export const videos =  videosArray.filter((item) => {
    const currentType = item.toString().split('.').pop();
    const res = typesArray.indexOf(currentType)
    return res !== -1 && item
})

// Получение тип видео
export const getTypeVideo = (i) => {
    return videos[i].toString().split('.').pop();
}