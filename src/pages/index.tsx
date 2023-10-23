import { NextPageWithLayout } from '~/pages/_app';
import Home from '~/components/app/home';
import { Suspense } from 'react';

const IndexPage: NextPageWithLayout = () => {
    return (
        <Suspense fallback={<p>Loading home</p>}>
            <Home />
        </Suspense>
    )
};

export default IndexPage;
