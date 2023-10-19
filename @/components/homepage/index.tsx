import Image from 'next/image'
import Demo from "public/demo.png"
import Outline from "public/outline.png"
import CategorySection from '../categorySection'
const Home = () => {
  return (
    <div className='relative '>
        {/* for bg color */}
        <div className='absolute bg-secondary min-w-[300px] w-full  max-w-[85%] h-96 rounded-br-[100px] '></div>

        <div className='p-6 lg:px-12 flex justify-between'>
            <div className=''>
            <p className='text-text-dark text-2xl font-black'>Somthing</p>    
            <p className='text-text-light'>sup</p>    
            
             </div>
            
            <div className='relative overflow-hidden' >
                <Image src={Outline.src} alt='/' width={400} height={250} className='absolute '/>
                <Image src={Demo.src} alt='/' width={400} height={250} className=''/>
            
            </div>
        </div>
        
        <div className="h-screen">
           <CategorySection />
        </div>

    </div>

  )
}

export default Home;
 