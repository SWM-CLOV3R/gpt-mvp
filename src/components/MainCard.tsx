import React from 'react'
import Gift from '../images/giftbox.png'
import { useAtom } from 'jotai'
import Quiz from './Quiz';
import { page } from '../atoms';
import Results from './Results';

const MainCard = () => {
    const [currentPage, setCurrentPage] = useAtom(page)

    return (
        <div className='flex justify-center w-[80%] '>
            {currentPage === "main" &&(
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 max-w-md w-full">
                    <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">선물 추천</h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">질문에 답하고 선물을 추천 받아 보세요!</p>
                    <div className='justify-center flex mb-3'>
                        <img src={Gift} alt='gift-box' className='w-[50%]'></img>
                    </div>
                    <div className='justify-end flex m-1'>
                        <button onClick={() => setCurrentPage('quiz')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Start
                        </button>
                    </div>
                </div>
            )}
            {currentPage === "quiz" && (
                <Quiz/>
            )}
            {currentPage === "result" && (
                <Results/>
            )}
        </div>
    )
}

export default MainCard