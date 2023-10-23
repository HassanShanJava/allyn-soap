import { NextPageWithLayout } from '~/pages/_app';
import Home from '~/components/app/home';
import { Suspense } from 'react';

const IndexPage: NextPageWithLayout = () => {
    return (
        <Suspense>
            <Home />
        </Suspense>
    )
};

export default IndexPage;
