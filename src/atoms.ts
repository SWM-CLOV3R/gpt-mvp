import { atom } from "jotai";
import { Answer, Product } from "./types";
import { update, ref ,child, get as read} from "firebase/database";
import { db } from "./firebase";

const MockQuestions = {
    question: "Loading...",
    options: ["One", "Two", "Three"],
}

export const question = atom(MockQuestions);
question.debugLabel = "question";
export const depth = atom(0);
depth.debugLabel = "depth";
export const answers = atom([] as Answer[]);
answers.debugLabel = "answers";

export const recipient = atom("친구");
recipient.debugLabel = "recipient";
export const occasion = atom("생일");
occasion.debugLabel = "occasion";
export const priceRange = atom([30000, 100000]);
priceRange.debugLabel = "priceRange";

export const loading = atom(false);
loading.debugLabel = "loading";

export const gift = atom({} as Product);
gift.debugLabel = "gift";
export const isValidGift = atom(false);
isValidGift.debugLabel = "isValidGift";

export const getGift = atom(null, async (get,set,chatID) => {
    const dbRef = ref(db);
    read(child(dbRef, `/chats/${chatID}`))
    .then(snapshot => {
    if (snapshot.exists()) {
        const data = snapshot.val();
        set(gift, data.result)
        set(isValidGift, true)
    } else {
        console.log("No data available");
        set(isValidGift, false)
    }
    })
        .catch(error => {
        console.error(error);
        set(isValidGift, false)
    });
})
getGift.debugLabel = "getGift";

export const startChat = atom(null, async (get,set,prompt) => {
    
    // API call to get next question
    try {
        set(loading, true)
        // const message = await CallGPT({prompt})
        const mockMessage = JSON.stringify({
            question: `question ${get(depth) + 1}`,
            options: ["one", "two", "three"],
        })
        set(question, JSON.parse(mockMessage))
    } catch (error) {
        console.log(error);
    } finally{
        set(loading, false)
    }
})
startChat.debugLabel = "startChat";

export const updateQuestion = atom(null, async (get,set,answer:Answer) => {
    
    // API call to get next question
    try {
        set(loading, true)
        // const message = await CallGPT(`${answer.answer}`)
        const mockMessage = JSON.stringify({
            question: `question ${get(depth) + 1}`,
            options: ["one", "two", "three"],
        })
        set(question, JSON.parse(mockMessage))
        set(answers, [...get(answers), answer])
    } catch (error) {
        console.log(error);
    } finally{
        set(loading, false)
    }
})
updateQuestion.debugLabel = "updateQuestion";

export const finishChat = atom(null, async (get,set,answer:Answer, chatID) => {
    set(answers, [...get(answers), answer])
    try {
        set(loading, true)
        update(
            ref(db, `/chats/${chatID}`),
            { answers: get(answers) }
        );
        // const message = await CallGPT({prompt:`${answer.answer}`})
        const MockMessage = JSON.stringify({
            result: {
                title: "Gift Title",
                description: "Gift Description",
                image: "https://via.placeholder.com/150",
                price: 10000,
                url: "https://www.29cm.co.kr/",
            }
        })
        update(
            ref(db, `/chats/${chatID}`),
            { result: JSON.parse(MockMessage).result }
        );

    } catch (error) {
        console.log(error);
    } finally{
        set(loading, false)
        set(depth, 0)
        set(answers, [])
        set(question, MockQuestions)
    }
})
finishChat.debugLabel = "finishChat";

// const MockQuestions = [
//     {
//         question: "What is the capital of France?",
//         options: ["London", "Paris", "Berlin"],
//     },
//     {
//         question: "What is the largest ocean on Earth?",
//         options: ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean"],
//     },
//     {
//         question: "Who painted the Mona Lisa?",
//         options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci"],
//     },
// ]



// export const mockQuestions = atom(MockQuestions)