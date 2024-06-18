import { useAtom } from 'jotai'
import { answers, depth, getGift, gift, isValidGift } from '../atoms'
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from './ui/button';
import GiftCard from './GiftCard';
import { Suspense, useEffect } from 'react';

const Results = () => {
    const [_,setCurrentQuestion] = useAtom(depth)
    const [userAnswers, setUserAnswers] = useAtom(answers)
    const [product, setProduct] = useAtom(gift)
    const navigate = useNavigate();
    const { chatID } = useParams()
    const [isValid, setIsValid] = useAtom(isValidGift)
    const getResult = useAtom(getGift)[1]
    

    const handleRetry = () => {
        navigate('/');
        console.log(userAnswers);
        
        setCurrentQuestion(0)
        setUserAnswers([])
    }

    useEffect(() => {
        if (!chatID || chatID === "") {
            navigate('/')
        }
        getResult(chatID)
    }, [])
    



    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                추천 선물
            </h2>
            <Suspense fallback={<div>Loading...</div>}>
                {isValid&&<GiftCard product={product}/>}
            </Suspense>
            <Button onClick={handleRetry} className=" w-full">
                다른 선물 찾기
            </Button>
        </div>
    )
}

export default Results