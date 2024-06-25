import { Product } from "@/types"
import { useEffect } from "react"
import Logo from '../images/oneit.png'
import { Button } from "./ui/button";

declare global {
    interface Window {
        Kakao: any;
    }
}
const {Kakao} = window;

const KakaoShare = (props:{chatID:string|undefined, product: Product|undefined}) => {
    const {chatID, product} = props
    const prodUrl = `https://oneit-gpt.vercel.app/result/${chatID}`
    useEffect(() => {
        console.log(Kakao);
        if(!Kakao.isInitialized()){
            Kakao.init(process.env.REACT_APP_KAKAO_API_KEY);
        }

    }, [])
    
    const handleShare = () =>{
        Kakao.Share.sendDefault({
            objectType: 'feed',
            content: {
                title: 'One!t 선물 추천 결과',
                description: product?.title||"선물 추천 결과",
                imageUrl: product?.image||Logo,
                link: {
                    mobileWebUrl: prodUrl,
                    webUrl: prodUrl,
                },
            },
            buttons: [
                {
                    title: '결과 확인하기',
                    link: {
                        mobileWebUrl: prodUrl,
                        webUrl: prodUrl,
                    },
                },
            ],
        });
    }

  return (
    <>
        <Button onClick={handleShare} className="bg-[#FEE500] text-black w-[40%]">
            카카오톡 공유하기
        </Button>
    </>
  )
}

export default KakaoShare