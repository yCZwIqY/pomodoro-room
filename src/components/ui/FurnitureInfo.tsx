import useEditModeStore from '@store/useEditModeStore.ts';
import styled from 'styled-components';
import {DetailContainer, SummaryContainer} from '@components/style.ts';
import Button from '@components/common/button/Button.tsx';
import useMyBagStore from '@store/useMyBagStore.ts';
import {useDetailSummary} from "@hooks/useDetailSummary.ts";

const FurnitureInfoContainer = styled(DetailContainer)<{
    $isOpen: boolean;
}>`
    min-width: 150px;
    text-align: right;
    padding: 8px 15px;
    min-height: ${({$isOpen}) => ($isOpen ? '100px' : '20px')};

`;

const ColorList = styled.ul`
    list-style: none;
    & > li {
        display: flex;
        justify-content: space-between;
        margin: 5px 0;
    }
`;

const ColorInput = styled.input`
    width: 25px;
    height:20px;
    border: none;
    outline: none;
    border-radius: 8px;
    
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: transparent;
    box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.2);
    
    &::-webkit-color-swatch {
        padding: 0;
        border-radius: 8px;
        border: 0;
        outline: none;
    }
`;


const FurnitureInfoSummary = styled(SummaryContainer)``;
export default function FurnitureInfo() {
    const {
        isEditMode,
        lastClickedObject,
        removeTempPosition,
        setLastClickedObject,
        tempPosition,
        setTempPosition
    } = useEditModeStore();
    const {put} = useMyBagStore();
    const [isOpen, onToggle] = useDetailSummary();


    const onPull = () => {
        const {category, key, id} = lastClickedObject;
        put(category, key);
        removeTempPosition(id);
        setLastClickedObject(null);
    };

    const onColorChange = (part: string, color: string) => {
        setTempPosition(lastClickedObject.id, {
            ...tempPosition[lastClickedObject.id],
            currentColors: {...tempPosition[lastClickedObject.id].currentColors, [part]: color}
        })
    }

    return (
        <>
            {isEditMode && (
                <>
                    <FurnitureInfoContainer $isOpen={isOpen} onToggle={onToggle}>
                        {lastClickedObject ? (
                            <>
                                <FurnitureInfoSummary>
                                    {lastClickedObject.name}
                                </FurnitureInfoSummary>
                              <ColorList>
                                  {lastClickedObject.parts.map(part =>
                                      <li key={part}>
                                          <div>{part}</div>
                                          <ColorInput type={'color'}
                                                 value={tempPosition[lastClickedObject.id].currentColors![part]}
                                                 onChange={(e) => onColorChange(part, e.target.value)}/>
                                      </li>
                                  )}
                              </ColorList>
                                <Button onClick={onPull}
                                        fullWidth
                                        size={'sm'}
                                        buttonColor={'red'}>
                                    넣기
                                </Button>
                            </>
                        ) : (
                            <FurnitureInfoSummary></FurnitureInfoSummary>
                        )}
                    </FurnitureInfoContainer>
                </>
            )}
        </>
    );
}
