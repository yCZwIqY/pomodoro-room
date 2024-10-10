import styled from "styled-components";
import IconButton from "@components/common/button/IconButton.tsx";
import {useLocation, useNavigate} from "react-router-dom";

const ShopNavContainer = styled.nav`
    display: flex;
    height: 30px;
    padding: 15px;
    margin-bottom: 20px;
`;

const ShopNavButton = styled.ul`
    list-style: none;
    display: flex;
    gap: 5px;
`

export default function ShopNav() {
    const navigate = useNavigate();
    const location = useLocation()
    const onClick = (path: string) => {
        navigate(path);
    }

    const isSelected = (path: string) => location.pathname.split('/').pop() === path;

    return <ShopNavContainer>
        <div style={{marginRight: '15px'}}>
            <IconButton
                url={'/icons/home.svg'}
                onClick={() => onClick('/')}
                size={'40px'}
            />
        </div>
        <div>
            <ShopNavButton>
                <IconButton
                    url={'/icons/menu.svg'}
                    onClick={() => onClick('/shop/all')}
                    buttonColor={'purple'}
                    disabled={isSelected('all')}
                    size={'40px'}
                />
                <IconButton
                    url={'/icons/bed.svg'}
                    onClick={() => onClick('/shop/bed')}
                    buttonColor={'pink'}
                    disabled={isSelected('bed')}
                    size={'40px'}
                />
                <IconButton
                    url={'/icons/chair.svg'}
                    onClick={() => onClick('/shop/chair')}
                    buttonColor={'pink'}
                    disabled={isSelected('chair')}
                    size={'40px'}
                />
                <IconButton
                    url={'/icons/desk.svg'}
                    onClick={() => onClick('/shop/desk')}
                    disabled={isSelected('desk')}
                    buttonColor={'pink'}
                    size={'40px'}
                />
                <IconButton
                    url={'/icons/wallpaper.svg'}
                    onClick={() => onClick('/shop/wallpaper')}
                    disabled={isSelected('wallpaper')}
                    buttonColor={'pink'}
                    size={'40px'}
                />
                <IconButton
                    url={'/icons/tile.svg'}
                    onClick={() => onClick('/shop/tile')}
                    disabled={isSelected('tile')}
                    buttonColor={'pink'}
                    size={'40px'}
                />
            </ShopNavButton>
        </div>

    </ShopNavContainer>
}