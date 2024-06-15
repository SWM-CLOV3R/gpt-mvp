import { useAtom } from 'jotai'
import React from 'react'
import { answers, page, question } from '../atoms'

const Results = () => {
    const [currentPage, setCurrentPage] = useAtom(page)
    const [_,setCurrentQuestion] = useAtom(question)
    const [userAnswers, setUserAnswers] = useAtom(answers)

    const handleRetry = () => {
        setCurrentPage("main")
        console.log(userAnswers);
        
        setCurrentQuestion(0)
        setUserAnswers([])
    }



    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                추천 선물
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">구매하러 가기</p>
            <button onClick={handleRetry} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                다른 선물 찾기
            </button>
        </div>
    )
}

export default Results