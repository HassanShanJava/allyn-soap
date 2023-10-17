

import Image from 'next/image';

const CategoryCard = () => {
    return (
        <>
        <div className=' bg-primary-foreground w-48 h-48'>
         <Image
         height={1000}
         width={1000}
                  className="h-full w-full object-cover object-center"
                  src="https://images.unsplash.com/photo-1534565337397-2a97f4e093b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=654&q=80"
                  alt="girl-image"
                />
        </div>
        </>
    )
}

export default CategoryCard