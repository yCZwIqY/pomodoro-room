import useEditModeStore from '@store/useEditModeStore.ts';
import styled from 'styled-components';
import {DetailContainer, SummaryContainer} from '@components/style.ts';
import Button from '@components/common/button/Button.tsx';
import useMyBagStore from '@store/useMyBagStore.ts';
import {useState} from "react";

const FurnitureInfoContainer = styled(DetailContainer)<{
    $isOpen: boolean;
}>`
    min-width: 150px;
    text-align: right;
    padding: 8px 15px;
    min-height: ${({isOpen}) => (isOpen ? '100px' : '20px')};
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
    const [isOpen, setIsOpen] = useState(false);


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
                    <FurnitureInfoContainer isOpen={isOpen} onToggle={(e:ToggleEvent) => setIsOpen(e.target.open)}>
                        {lastClickedObject ? (
                            <>
                                <FurnitureInfoSummary>
                                    {lastClickedObject.name}
                                </FurnitureInfoSummary>
                                {lastClickedObject.parts.map(part =>
                                    <div key={part}>
                                        {part}
                                        <input type={'color'}
                                               value={tempPosition[lastClickedObject.id].currentColors![part]}
                                               onChange={(e) => onColorChange(part, e.target.value)}/>
                                    </div>
                                )}
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
