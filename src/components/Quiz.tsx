import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { depth, finishChat, loading, question, updateQuestion } from '../atoms'
import { useNavigate, useParams } from 'react-router-dom';
import { Spinner } from './ui/spinner';

// MAX DEPTH of the chat
const MAXDEPTH = 3

const Quiz = () => {
    const questions = useAtomValue(question)
    const isloading = useAtomValue(loading)
    const [currentQuestion, setCurrentQuestion] = useAtom(depth)
    const getNextQuestion = useSetAtom(updateQuestion)
    const endChat = useSetAtom(finishChat)
    const navigate = useNavigate();
    const { chatID } = useParams()

    // Debugging logs
    // console.log('Questions:', questions, 'Loading:', isloading);
    

    const handleAnswerClick = async (index:number) => {
        if (currentQuestion < MAXDEPTH -1) {
            setCurrentQuestion((prev) => prev + 1)
            await getNextQuestion({question: questions.question, answer: questions.options[index]})
            
        }else if (currentQuestion === MAXDEPTH - 1) { // last question
            // API call to get a result
            await endChat({question: questions.question, answer: questions.options[index]},chatID)
            navigate(`/result/${chatID}`);
        } else {
            console.log("Error: Out of bounds");
        }
    }

    if (isloading || !questions || !questions.options || questions.options.length === 0) {
        return <Spinner/>
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