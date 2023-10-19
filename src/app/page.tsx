import Loading from "@/components/common/cards/global-loading";
import dynamic from "next/dynamic";
import { Suspense } from "react";
const HomePage = dynamic(() => import('@/components/homepage'), {
  loading: () =><Loading/>
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
