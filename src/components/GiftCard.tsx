import { Product } from '@/types'
import Gift from '../images/giftbox.png'
import { Button } from './ui/button'

interface GiftCardProps {
  product: Product
}

const GiftCard = (props:GiftCardProps) => {
  const { product } = props
  return (
    <div className='w-full px-8'>
      <a href={product.url} target='_blank' rel="noreferrer">
        <div className='flex justify-center'>
          <img
            src={product.image || Gift}
            // src="https://img1.kakaocdn.net/thumb/C320x320@2x.fwebp.q82/?fname=https%3A%2F%2Fst.kakaocdn.net%2Fproduct%2Fgift%2Fproduct%2F20240129103642_a5ca62d182ec419285ba708b51cb72c2.jpg"
            alt="recommended product"
            width={200}
            height={200}
            className="object-cover group-hover:opacity-50 transition-opacity"
          />
        </div>
        <div className="py-2 bg-white dark:bg-gray-950">
          <h3 className="text-lg font-semibold md:text-xl">{product.title}</h3>

          <div className="flex items-center justify-end mt-2">
            <h4 className="text-base font-semibold md:text-lg text-onei">{product.price}원</h4>
            {/* <Button size="sm" className='py-0 px-2 text-black'>구매하러 가기</Button> */}
          </div>
        </div>
      </a>
    </div>
  )
}

export default GiftCard