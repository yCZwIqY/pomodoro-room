import styled from "styled-components";
import IconButton from "@components/common/button/IconButton.tsx";
import {useNavigate} from "react-router-dom";

const ShopNavContainer = styled.nav`
display: flex;
    height: 30px;
`;

const ShopNavButton = styled.a`
`

export default function ShopNav() {
const navigate = useNavigate();
    const onClickHome = () => {
        navigate('/room');
    }

    return <ShopNavContainer>
        <IconButton
            url={'/icons/home.svg'}
            onClick={onClickHome}
            size={'40px'}
        />
        <ShopNavButton href={'/shop/all'}> all </ShopNavButton>
        <ShopNavButton href={'/shop/bed'}> bed </ShopNavButton>
        <ShopNavButton href={'/shop/chair'}> chair </ShopNavButton>
        <ShopNavButton href={'/shop/desk'}> desk </ShopNavButton>
        <ShopNavButton href={'/shop/wallpaper'}> wallpaper </ShopNavButton>
        <ShopNavButton href={'/shop/tile'}> tile </ShopNavButton>
    </ShopNavContainer>
}