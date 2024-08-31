import {createBrowserRouter} from 'react-router-dom';
import Home from '@pages/Home.tsx';
import {lazy, Suspense} from 'react';
import Loading from '@pages/Loading.tsx';
import Error from '@pages/Error.tsx';

const Room = lazy(() => import('../pages/Room.tsx'));
const Shop = lazy(() => import('../pages/Shop.tsx'));
const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <Suspense fallback={<Loading/>}>
                <Room/>
            </Suspense>
        ),
        children: [
            {
                path: '/home',
                element: <Home/>
            },
            {
                path: '/room',

            },
            {
                path: '/shop',
                element: (
                    <Suspense fallback={<Loading/>}>
                        <Shop/>
                    </Suspense>
                )
            }
        ],
        errorElement: <Error/>
    }
]);

export default router;
