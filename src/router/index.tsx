import {createBrowserRouter} from 'react-router-dom';
import Home from '@pages/Home.tsx';
import {lazy, Suspense} from 'react';
import Loading from '@pages/Loading.tsx';
import Error from '@pages/Error.tsx';
import Shop from "@pages/Shop.tsx";

const Room = lazy(() => import('../pages/Room.tsx'));
const ShopCategory = lazy(() => import('../pages/ShopCategory.tsx'));

const router = createBrowserRouter([
    {
        path: '/',
        children: [
            {
                path: '/room',
                element: (
                    <Suspense fallback={<Loading/>}>
                        <Room/>
                    </Suspense>
                )
            },
            {
                path: '/home',
                element: <Home/>
            },
            {
                path: '/shop',
                element: <Shop/>,
                children: [{
                    path: '/shop/:category',
                    element: (
                            <Suspense fallback={<Loading />}>
                                <ShopCategory />
                            </Suspense>
                    ),
                }]
            }
        ],
        errorElement: <Error/>
    }
]);

export default router;
