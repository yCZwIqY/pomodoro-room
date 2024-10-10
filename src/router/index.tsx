import {createBrowserRouter, Navigate} from 'react-router-dom';
import Home from '@pages/Home.tsx';
import {lazy, Suspense} from 'react';
import Loading from '@pages/Loading.tsx';
import Error from '@pages/Error.tsx';
import Shop from "@pages/Shop.tsx";
import {Outlet} from "react-router";

const Room = lazy(() => import('../pages/Room.tsx'));
const ShopCategory = lazy(() => import('../pages/ShopCategory.tsx'));

const router = createBrowserRouter([
    {
        path: '/',
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
]);

export default router;
