

import Image from 'next/image';

const CategoryCard = (props: { item: object, index: number }) => {
    console.log({ props })
    return (
        <>
            <div className='group relative bg-primary-foreground hover:bg-primary w-48 h-48 rounded-xl  transition ease-in delay-150 cursor-pointer'>
                <div className='relative h-4/6 w-full p-4'>
                    {props?.item?.image ? <>
                        <Image
                            height={1000}
                            width={1000}
                            className=" h-full w-full object-cover object-center rounded-xl "
                            src={props?.item?.image?.src}
                            alt="girl-image"
                        />
                    </> : <div className=' h-full w-full flex items-center justify-center bg-white border border-text-light rounded-xl'>
                    <i className="fa-solid fa-image text-2xl text-text-light text-center"></i></div>}


                </div>
                <div className=' px-4'>

                    <p className="w-full text-lg font-semibold text-center group-hover:text-text-white line-clamp-1   text-text">{props?.item?.title}</p>
                    <p className="text-sm text-text-light font-medium group-hover:text-text-white line-clamp-1  text-center ">
                        
                        {`(${props?.item?.products?.filters[0]?.values[0]?.count} ${props?.item?.title})`} </p>
                </div>


            </div>
        </>
    )
}

export default CategoryCard