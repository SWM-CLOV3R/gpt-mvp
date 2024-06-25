import { atom } from "jotai";
import { Answer, Product, Question, ResponseContent } from "./types";
import { update, ref ,child, get as read} from "firebase/database";
import { db } from "./firebase";
import OpenAI from "openai";
import { Thread } from "openai/resources/beta/threads/threads";
import { Assistant } from "openai/resources/beta/assistants";
import { Message } from "openai/resources/beta/threads/messages";
import { Run } from "openai/resources/beta/threads/runs/runs";
const openai = new OpenAI({
    apiKey: process.env.REACT_APP_GPT_API_KEY,
    dangerouslyAllowBrowser: true
});

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
export const gender = atom("남성");
gender.debugLabel = "gender";

export const loading = atom(true);
loading.debugLabel = "loading";

export const gift = atom({} as Product);
gift.debugLabel = "gift";
export const isValidGift = atom(false);
isValidGift.debugLabel = "isValidGift";

const thread = atom({} as Thread);
thread.debugLabel = "thread";
const assistant = atom({} as Assistant);

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

export const startChat = atom(null, async (get,set,prompt:string) => {
    set(loading, true)

    try {
        const userAssistant = await getGPTAssistant();
        set(assistant, userAssistant)

        const userThread = await getGPTThread();
        set(thread, userThread)

        const message = await openai.beta.threads.messages.create(
            userThread.id,
            {
                role: "user",
                content: prompt
            }
        );
        const newQuestion = await runGPT(userThread, userAssistant)

        if (newQuestion) {
            set(question, newQuestion);
        }
    } catch (error) {
        console.log(error);
        throw new Error("Failed to start chat");
    } finally{
        set(loading, false)
    }
})
startChat.debugLabel = "startChat";

export const updateQuestion = atom(null, async (get,set,answer:Answer) => {
    
    // API call to get next question
    try {
        set(loading, true)
        const message = await openai.beta.threads.messages.create(
            get(thread).id,
            {
                role: "user",
                content: answer.answer
            }
        );
        // console.log(message);
        
        const newQuestion = await runGPT(get(thread), get(assistant))
        set(question, newQuestion)
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

        const recommended = await getRecommendation(get(thread), get(assistant))

        set(gift, recommended)
        update(
            ref(db, `/chats/${chatID}`),
            { result: recommended }
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

const getGPTAssistant = async () => {
    try {
        const assistant = await openai.beta.assistants.retrieve(process.env.REACT_APP_GPT_ASSISTANT_ID||"");
        // console.log(assistant);
        
        return assistant;
    } catch (error) {
        console.log(error);
        return {} as Assistant;
    }
}

const getGPTThread = async () => {
    try {
        const thread = await openai.beta.threads.create();
        // console.log(thread);
        
        return thread;
    } catch (error) {
        console.log(error);
        return {} as Thread;
    }
};

const runGPT = async (thread: Thread, assistant: Assistant, retryCount = 3) => {
    return new Promise<Question>((resolve, reject) => {
        openai.beta.threads.runs.createAndPoll(
            thread.id,
            { 
                assistant_id: assistant.id,
            }
        ).then((run: Run) => {
            if (run.status === 'completed') {
                openai.beta.threads.messages.list(
                    run.thread_id,
                    {
                        limit: 1
                    }
                ).then((messages) => {
                    const response = messages.data[0].content[0] as ResponseContent;
                    const jsonData: Question = JSON.parse(response.text.value);
                    // console.log(jsonData);
                    
                    resolve(jsonData);
                })
            } else if (retryCount > 0) {
                console.log(`Retrying... Attempts left: ${retryCount}`);
                resolve(runGPT(thread, assistant, retryCount - 1));
            } else {
                console.log(run.status);
                reject(new Error("Run not completed after multiple attempts"));
            }
        }).catch((error) => {
            console.log(error);
            reject(new Error("Run failed"));
        });
    });
}

const getRecommendation = async (thread: Thread, assistant: Assistant) => {
    return new Promise<Product>((resolve, reject) => {
        openai.beta.threads.runs.createAndPoll(
            thread.id,
            { 
                assistant_id: assistant.id,
            }
        ).then((run: Run) => {
            if (run.status === 'completed') {
                openai.beta.threads.messages.list(
                    run.thread_id,
                    {
                        limit: 1
                    }
                ).then((messages) => {
                    const response = messages.data[0].content[0] as ResponseContent;
                    // console.log(response);
                    
                    const jsonData: Product = JSON.parse(response.text.value);
                    
                    resolve(jsonData);
                })
            } else {
                console.log(run);
                reject(new Error("Run not completed"));
            }
        }).catch((error) => {
            console.log(error);
            reject(new Error("Run failed"));
        });
    });
}