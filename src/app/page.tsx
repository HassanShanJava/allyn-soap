import dynamic from "next/dynamic";
import { Suspense } from "react";
const HomePage = dynamic(() => import('@/components/homepage'), {
  loading: () => <p>Loading... Homepage</p>,
})

export default async function Home() {


  return (
    <div>
      <Suspense >
        <HomePage />
        
      </Suspense>
    </div>
  );
}
