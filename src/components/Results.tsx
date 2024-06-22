import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { answers, depth, getGift, gift, isValidGift } from '../atoms'
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from './ui/button';
import React, { Suspense, useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import Kakao from '../images/kakao.png'
import Naver from '../images/naver_blog.png'
import Instagram from '../images/instagram.png'

const GiftCard = React.lazy(() => import('./GiftCard'))
const NotFound = React.lazy(() => import('./NotFound'))

const Results = () => {
    const [showModal, setShowModal] = useState(false)
    const navigate = useNavigate();
    const { chatID } = useParams()

    const [userAnswers, setUserAnswers] = useAtom(answers)
    const setCurrentQuestion = useSetAtom(depth)
    const getResult = useSetAtom(getGift)
    const product = useAtomValue(gift)
    const isValid = useAtomValue(isValidGift)
    

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
        <>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                추천 선물
            </h2>
            <Suspense fallback={<div>Loading...</div>}>
                {isValid?<GiftCard product={product}/>:<NotFound/>}
            </Suspense>
            <Button onClick={()=>setShowModal(true)} className=" w-full">
                다른 선물 찾기
            </Button>
            
        </div>
        {showModal && (
        <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>더 많은 선물을 추천 받고 싶다면?</DialogTitle>
                </DialogHeader>
                <div className='flex flex-col'>
                    <p className='m-1 text-lg'><strong className='text-xl font-Bayon'>One!t</strong>의 SNS 채널에서 확인하세요!</p>
                    <div className='flex justify-start'>
                        <a href='https://open.kakao.com/o/g9Pganwg' target='_blank' rel="noreferrer">
                            {/* <Button className='bg-[#FEE500] text-[#191919] hover:bg-[#FEE500] hover:text-[#191919]'> */}
                                <img src={Kakao} alt='kakao-channel' className='h-[35px] mr-1'></img>
                                {/* <p className='m-1'>오픈채팅</p> */}
                            {/* </Button> */}
                        </a>
                        <a href='https://www.instagram.com/oneit.gif' target='_blank' rel="noreferrer">
                            <img src={Instagram} alt='instagram' className='h-[35px] mr-1'></img>
                        </a>
                        <a href='https://blog.naver.com/oneit_gift' target='_blank' rel="noreferrer">
                            <img src={Naver} alt='naver-blog' className='h-[35px]'></img>
                        </a>
                    </div>
                </div>
                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setShowModal(false)}>
                    뒤로가기
                    </Button>
                    <Button type="submit" onClick={() => {setShowModal(false); handleRetry()}}>
                    메인으로
                    </Button>
                </div>
            </DialogContent>
            </Dialog>
        )}
        </>
    )
}

export default Results