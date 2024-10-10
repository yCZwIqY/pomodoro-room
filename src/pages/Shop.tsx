import ShopNav from "@components/shop/ShopNav.tsx";
import {Outlet} from "react-router";
import {Suspense, useEffect, useState} from "react";
import Loading from "@pages/Loading.tsx";
import Token from "@components/ui/Token.tsx";
import styled from "styled-components";


const ShopContainer = styled.main`
    display: flex;
    flex-direction: column;
    background: ${(props) => props.theme.gradiant['linear']};
    padding-bottom: 20px;
    box-sizing: border-box;
`
export default function Shop() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return <ShopContainer>
        <ShopNav></ShopNav>
        <Token position={'right'} />
        <Outlet/>
    </ShopContainer>;
}
