import Image from 'next/image'
import Demo from "public/demo.png"
import Outline from "public/outline.png"
import CategorySection from '../categorySection'
const Home = () => {
    return (
        <>
            <div className='relative '>
                {/* for bg color */}
                <div className='absolute bg-secondary min-w-[300px] w-full  max-w-[80%] h-48 rounded-br-[100px] '></div>

                <div className='p-6 lg:px-12 flex justify-between'>
                    <div className=''>
                        <p className='text-text-dark text-6xl font-black'>PLANT BASED & HANDMADE DAILY</p>
                        <p className='text-text-light'>Discover your perfect scent, handcrafted in a Makery near you.</p>
                    </div>

                    <div className=' '>
                        <div className='  border-4 border-primary   '>
                            <Image src={Demo.src} className='overflow-clip' alt='/' width={650} height={550} />
                        </div>
                    </div>
                </div>

                <div className="h-screen">
                    <CategorySection />
                </div>
            </div>


        </>

    )
}

export default Home;
