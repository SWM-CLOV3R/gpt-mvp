import { atom } from "jotai";
import { Answer } from "./types";

export const page = atom("main");
export const question = atom(0);
export const answers = atom([] as Answer[]);


const MockQuestions = [
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

export const mockQuestions = atom(MockQuestions)