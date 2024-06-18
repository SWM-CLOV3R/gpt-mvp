import { useAtom } from 'jotai'
import { answers, depth, question } from '../atoms'
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import GiftCard from './GiftCard';

const Results = () => {
    const [_,setCurrentQuestion] = useAtom(depth)
    const [userAnswers, setUserAnswers] = useAtom(answers)
    const navigate = useNavigate();

    const handleRetry = () => {
        navigate('/');
        console.log(userAnswers);
        
        setCurrentQuestion(0)
        setUserAnswers([])
    }



    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                추천 선물
            </h2>
            <GiftCard/>
            <Button onClick={handleRetry} className=" w-full">
                다른 선물 찾기
            </Button>
        </div>
    )
}

export default Results