import { useAtom } from 'jotai'
import { depth, finishChat, question, updateQuestion } from '../atoms'
import { useNavigate, useParams } from 'react-router-dom';

// MAX DEPTH of the chat
const MAXDEPTH = 3

const Quiz = () => {
    const [questions] = useAtom(question)
    const [currentQuestion, setCurrentQuestion] = useAtom(depth)
    const getNextQuestion = useAtom(updateQuestion)[1]
    const endChat = useAtom(finishChat)[1]
    const navigate = useNavigate();
    const { chatID } = useParams()
    

    const handleAnswerClick = async (index:number) => {
        if (currentQuestion < MAXDEPTH -1) {
            setCurrentQuestion((prev) => prev + 1)
            getNextQuestion({question: questions.question, answer: questions.options[index]})
            
        }else if (currentQuestion === MAXDEPTH - 1) { // last question
            // API call to get a result
            endChat({question: questions.question, answer: questions.options[index]},chatID)
            navigate(`/result/${chatID}`);
        } else {
            console.log("Error: Out of bounds");
        }
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                {questions.question}
            </h2>
            <div className="grid grid-cols-1 gap-4">
                {questions.options.map((option, index) => (
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