import { useAtom } from 'jotai'
import { answers, mockQuestions, page, question } from '../atoms'

const Quiz = () => {
    const [questions] = useAtom(mockQuestions)
    const [_, setCurrentPage] = useAtom(page)
    const [currentQuestion, setCurrentQuestion] = useAtom(question)
    const [userAnswers, setUserAnswers] = useAtom(answers)

    const handleAnswerClick = (index:number) => {
        setUserAnswers([...userAnswers, {question: currentQuestion, answer: index}])   
        
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion((prev) => prev + 1)
        }else{
            setCurrentPage("result")
        }
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                {questions[currentQuestion].question}
            </h2>
            <div className="grid grid-cols-1 gap-4">
                {questions[currentQuestion].options.map((option, index) => (
                <button
                    key={index}
                    onClick={() => handleAnswerClick(index)}
                    className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 font-bold py-2 px-4 rounded"
                >
                    {option}
                </button>
                ))}
            </div>
        </div>
    )
}

export default Quiz