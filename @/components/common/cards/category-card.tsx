

import Image from 'next/image';

const CategoryCard = () => {
    return (
        <>
        <div className='group relative bg-primary-foreground hover:bg-primary w-48 h-48 rounded-md space-y-2 transition ease-in delay-150 cursor-pointer'>
                <Image
                  height={1000}
                  width={1000}
                  className="h-4/6 w-full object-cover object-center rounded-t-md"
                  src="https://images.unsplash.com/photo-1534565337397-2a97f4e093b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=654&q=80"
                  alt="girl-image"
                />
                <div>

                   <p className="text-lg font-semibold text-center group-hover:text-text-white   text-text">Soaps</p>
                    <p className="text-sm text-text-light font-medium group-hover:text-text-white  text-center ">{"(28 Soaps)"} </p>
                </div>
           
          
        </div>
        </>
    )
}

export default CategoryCard