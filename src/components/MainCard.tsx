import Gift from '../images/giftbox.png'
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { Button } from './ui/button';

const MainCard = () => {
    const navigate = useNavigate();

    const handleStart = () => {
        const chatID = nanoid(10);
        navigate(`/quiz/${chatID}`);
    }

    return(
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 max-w-md w-full">
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">선물 추천</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">질문에 답하고 선물을 추천 받아 보세요!</p>
            <div className='justify-center flex mb-3'>
                <img src={Gift} alt='gift-box' className='w-[50%]'></img>
            </div>
            <div className='justify-end flex m-1'>
                <Button onClick={handleStart} className="text-lg">
                    시작하기
                </Button>
            </div>
        </div>
    )
}

export default MainCard