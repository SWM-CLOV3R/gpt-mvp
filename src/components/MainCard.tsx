import Gift from '../images/giftbox.png'
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { Button } from './ui/button';
import { ref, set } from "firebase/database";
import {db} from '../firebase';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { useState } from 'react';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { useAtom } from 'jotai';
import { occasion, priceRange, recipient, startChat } from '../atoms';

const MainCard = () => {
    const navigate = useNavigate();
    const [price, setPrice] = useAtom<number[]>(priceRange)
    const [showModal, setShowModal] = useState(false)
    const [userRecipient, setUserRecipient] = useAtom(recipient)
    const [userOccasion, setUserOccasion] = useAtom(occasion)
    const [_,getQuestion] = useAtom(startChat)

    const handleStart = async () => {
        const chatID = nanoid(10);
        try { // API call to get first question
            set(ref(db, `chats/${chatID}`), {
                chatID,
                recipient: userRecipient,
                occasion: userOccasion,
                priceRange: price
            });
            const prompt = `I wanna buy a gift for my ${userRecipient} for ${userOccasion} within the price range of ${price[0]} to ${price[1]}`
            getQuestion(prompt)
        } catch (error) {
            console.log(error);
        } finally{
            navigate(`/quiz/${chatID}`);
        }
    }

    return(
        <>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 max-w-md w-full">
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">선물 추천</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">질문에 답하고 선물을 추천 받아 보세요!</p>
            <div className='justify-center flex mb-3'>
                <img src={Gift} alt='gift-box' className='w-[50%]'></img>
            </div>
            <div className='justify-end flex m-1'>
                <Button  onClick={() => setShowModal(true)} className="text-lg">
                    시작하기
                </Button>
            </div>
        </div>
        {showModal && (
        <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>시작하기</DialogTitle>
                <DialogDescription></DialogDescription>
                </DialogHeader>
                <div className="flex items-center gap-2 justify-around">
                    <Select onValueChange={setUserRecipient} value={userRecipient}>
                    <SelectTrigger className="w-[35%]">
                        <SelectValue placeholder="누구" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        <SelectItem value="친구">친구</SelectItem>
                        <SelectItem value="여자친구">여자친구</SelectItem>
                        <SelectItem value="남자친구">남자친구</SelectItem>
                        <SelectItem value="부모님">부모님</SelectItem>
                        <SelectItem value="동료">동료</SelectItem>
                        <SelectItem value="지인">지인</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                    </Select>
                    <p className="text-gray-500 dark:text-gray-400">에게</p>
                    <Select onValueChange={setUserOccasion} value={userOccasion}>
                    <SelectTrigger className="w-[35%]">
                        <SelectValue placeholder="무슨 선물을" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup >
                        <SelectItem value="생일">생일</SelectItem>
                        <SelectItem value="기념일">기념일</SelectItem>
                        <SelectItem value="졸업 축하">졸업</SelectItem>
                        <SelectItem value="응원">응원</SelectItem>
                        <SelectItem value="기타">기타</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2 w-full my-2">
                    <Slider
                    id="gift-price"
                    min={0}
                    max={500000}
                    step={10000}
                    value={price}
                    onValueChange={setPrice}
                    className="w-full"
                    />
                    <div className='flex justify-end align-middle'>
                        <div className="flex justify-around text-sm text-gray-500 dark:text-gray-400">
                            <Input value={price[0].toLocaleString()} onChange={(e)=>setPrice([Number(e.target.value),price[1]])} className='w-[30%]'/>
                            <p className="text-gray-500 dark:text-gray-400 content-center">원부터</p>  
                            <Input value={price[1].toLocaleString()} onChange={(e)=>setPrice([price[0],Number(e.target.value)])} className='w-[30%]'/>
                            <p className="text-gray-500 dark:text-gray-400 content-center">원까지</p>  
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setShowModal(false)}>
                    뒤로가기
                    </Button>
                    <Button type="submit" onClick={() => {setShowModal(false); handleStart()}}>
                    추천받기
                    </Button>
                </div>
            </DialogContent>
            </Dialog>
        )}
        </>
    )
}

export default MainCard