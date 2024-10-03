import ShopNav from "@components/shop/ShopNav.tsx";
import {Outlet} from "react-router";
import {Suspense, useEffect, useState} from "react";
import Loading from "@pages/Loading.tsx";

export default function Shop() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return <main style={{display: 'flex', flexDirection: 'column'}}>
        <ShopNav></ShopNav>
        <Outlet/>
    </main>;
}
