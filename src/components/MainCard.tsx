import React from 'react'
import Gift from '../images/giftbox.png'
import { atom, useAtom } from 'jotai'

type Answer = {
    question: number;
    answer: number;
}

const page = atom("main");
const question = atom(0);
const answers = atom([] as Answer[]);

const MainCard = () => {
    const [currentPage, setCurrentPage] = useAtom(page)
    const [currentQuestion, setCurrentQuestion] = useAtom(question)
    const [userAnswers, setUserAnswers] = useAtom(answers)
    const questions = [
      {
        question: "What is the capital of France?",
        options: ["London", "Paris", "Berlin"],
      },
      {
        question: "What is the largest ocean on Earth?",
        options: ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean"],
      },
      {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci"],
      },
    ]

    const handleRetry = () => {
        setCurrentPage("main")
        setCurrentQuestion(0)
        setUserAnswers([])
    }

    const handleAnswerClick = (index:number) => {
        setUserAnswers([...userAnswers, {question: currentQuestion, answer: index}])   
        
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1)
        }else{
            setCurrentPage("result")
        }
    }


    return (
        <div className='flex justify-center w-[80%] '>
            {currentPage === "main" &&(<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 max-w-md w-full">
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
            </div>)}
            {currentPage === "quiz" && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                {questions[currentQuestion].question}
            </h2>
            <div className="grid grid-cols-1 gap-4">
                {questions[currentQuestion].options.map((option, index) => (
                <button
                    key={index}
                    onClick={() => handleAnswerClick(index)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    {option}
                </button>
                ))}
            </div>
        </div>
        )}
        {currentPage === "result" && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Your Answers:
                {userAnswers.map((answer, index) => {
                return (
                    <p key={index} className="text-gray-600 dark:text-gray-400">
                    answer {index + 1}: {questions[answer.question].options[answer.answer]}
                    </p>
                );
                })}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Thanks for playing!</p>
            <button onClick={handleRetry} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                Retry
            </button>
        </div>
        )}
        </div>
    )
}

export default MainCard