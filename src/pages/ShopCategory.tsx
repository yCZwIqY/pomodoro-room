import {Category, useShopItem} from "@hooks/useShopItem.ts";
import {useParams} from "react-router";
import ItemCard from "@components/shop/ItemCard.tsx";
import styled from "styled-components";
import {FurnitureData} from "@store/useMyFurnitureStore.ts";


const ShopItemListContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    overflow: hidden;
    padding: 20px;
`

// const ShowCase = styled.div<{
//     $showCaseVisible: boolean
// }>`
//     width: ${({$showCaseVisible}) => $showCaseVisible ? '60dvw' : 0};
//     height: 100dvh;
// `
const ShopItemList = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fill, 200px);
    grid-template-rows: repeat(auto-fill, 250px);
    list-style: none;
    overflow-y: scroll;
    height: 100%;
    width: -webkit-fill-available;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.2);
    padding: 20px;
    margin: 20px;
    border-radius: 20px;
`
export default function ShopCategory() {
    const params = useParams();
    const items = useShopItem(params.category as Category);
    // const [showCaseVisible] = useState(false);

    return <ShopItemListContainer>
        <ShopItemList>
            {(items && items.length > 0) &&
                items.map(it => <ItemCard key={`shop-${(it as FurnitureData).key as string}`} item={it}/>)}
        </ShopItemList>
        {/*<ShowCase $showCaseVisible={showCaseVisible}>*/}

        {/*</ShowCase>*/}
    </ShopItemListContainer>;
}
