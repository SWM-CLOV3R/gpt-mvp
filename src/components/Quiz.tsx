import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { depth, finishChat, loading, question, updateQuestion } from '../atoms'
import { useNavigate, useParams } from 'react-router-dom';
import { Spinner } from './ui/spinner';
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { DialogHeader } from './ui/dialog';
import { Button } from './ui/button';

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
    const [error, setError] = useState(false)
    const [selected, setSelected] = useState(0)

    // Debugging logs
    // console.log('Questions:', questions, 'Loading:', isloading);
    

    const handleAnswerClick = async (index:number) => {
        setSelected(index)
        try {
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
        } catch (error) {
            setError(true)
        }

    }

    if (isloading) {
        return <Spinner/>
    }

    return (
        <>
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
        {error && (
            <Dialog open={error} onOpenChange={setError}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>문제 발생</DialogTitle>
                </DialogHeader>
                <DialogDescription>문제가 발생했습니다. 다시 시도해주세요.</DialogDescription>
                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => {setError(false); navigate('/'); } }>
                    메인으로
                    </Button>
                    <Button type="submit" onClick={() => {setError(false); handleAnswerClick(selected);} }>
                    다시시도
                    </Button>
                </div>
            </DialogContent>
            </Dialog>
            )}
        </>
    )
}

export default Quiz