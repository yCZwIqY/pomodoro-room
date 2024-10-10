import {FurnitureData} from "@store/useMyFurnitureStore.ts";
import FurnitureModelViewer from "@components/room/model/FurnitureModelViewer.tsx";
import {Canvas} from "@react-three/fiber";
import styled from "styled-components";
import Button from "@components/common/button/Button.tsx";
import useMyBagStore from "@store/useMyBagStore.ts";
import useTokenStore from "@store/useTokenStore.tsx";
import {useEffect, useState} from "react";

const ItemCardContainer = styled.li`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px;
    gap: 5px;
`

interface ItemCardProps {
    item: FurnitureData;
}

export default function ItemCard({item}: ItemCardProps) {
    const {buy, myBag} = useMyBagStore();
    const {token, useToken} = useTokenStore();
    const [text, setText] = useState(" 구매하기");

    useEffect(() => {
        if (['tile', 'wallpaper'].includes(item.category)
            && myBag[item.category].find((it: FurnitureData) => it.key === item.key)) {
            setText("보유중");

        } else if (item.price > token) {
            setText("토큰 부족");
        }

    }, []);
    const isDisabled = (): boolean => {
        return item.price > token
            || (['tile', 'wallpaper'].includes(item.category)
                && myBag[item.category].filter((it:FurnitureData) => it.key === item.key).length > 0
            )
    }

    const onBuyButtonClick = () => {
        if (token < item.price) {
            alert('토큰 부족');
            return;
        }
        buy(item);
        useToken(item.price)
    }
    return <ItemCardContainer>
        {['wallpaper', 'tile'].includes(item.category)
            ? <img src={`/textures/${item.path}`}
                   width={'130px'}
                   height={'130px'}/>
            : <Canvas key={`shop-${item.key}`}
                      orthographic
                      camera={{
                          zoom: 25,
                          near: 0.1,
                          far: 100,
                          fov: 200,
                          position: [10, 10, 13],
                          // rotation: [0, THREE.MathUtils.degToRad(5), 0]
                      }}
                      style={{
                          display: 'block',
                          borderRadius: '20px',
                          margin: '5px'
                      }}>
                <rectAreaLight
                    width={100}
                    height={100}
                    intensity={1}
                    position={[0, 10, 0]}
                    rotation-x={-Math.PI / 2}
                    castShadow={false}
                />
                <color attach="background" args={['#9999A4']}/>
                <FurnitureModelViewer path={item.path} />
            </Canvas>
        }
        {item.name}
        <div>
            {item.price} 토큰
        </div>
        <Button fullWidth={true}
                disabled={isDisabled()}
                onClick={onBuyButtonClick} size={'sm'}>
            {text}
        </Button>
    </ItemCardContainer>
}