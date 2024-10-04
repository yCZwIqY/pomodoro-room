import useEditModeStore from '@store/useEditModeStore.ts';
import styled from 'styled-components';
import { DetailContainer, SummaryContainer } from '@components/style.ts';
import Button from '@components/common/button/Button.tsx';
import { useDetailSummary } from '@hooks/useDetailSummary.ts';
import useMyBagStore from '@store/useMyBagStore.ts';

const FurnitureInfoContainer = styled(DetailContainer)`
  min-width: 150px;
  text-align: right;
  padding: 8px 15px;
  min-height: ${({ isOpen }) => (isOpen ? '100px' : '20px')};
`;

const ColorList = styled.ul`
  list-style: none;
  display: flex;
  gap: 10px;
  margin: 5px 0;
`
const ColorItem = styled.button`
  width: 25px;
  height: 25px;
  border-radius: 100%;
  border: 2px solid white;
  box-shadow: 1px 1px 2px 2px rgba(0,0,0,0.2);
  background-color:${({$color}) => $color};
`

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
  const { put } = useMyBagStore();
  const [isOpen, onToggle] = useDetailSummary();

  const onPull = () => {
    const { category, key, id } = lastClickedObject;
    put(category, key);
    removeTempPosition(id);
    setLastClickedObject(null);
  };

  const onColorClick = (color) => {
    setTempPosition(lastClickedObject.id, {
      ...tempPosition[lastClickedObject.id],
      currentTexture: color
    })
  }

  return (
    <>
      {isEditMode && (
        <>
          <FurnitureInfoContainer isOpen={isOpen} onToggle={onToggle}>
            {lastClickedObject ? (
              <>
                <FurnitureInfoSummary>
                  {lastClickedObject.name}
                </FurnitureInfoSummary>
                {lastClickedObject.hasTexture
                    && <ColorList>
                      {
                        lastClickedObject.textures.map(it =>
                           <li key={`${lastClickedObject.id}-${it}`}>
                             <ColorItem $color={it}
                                        onClick={() => onColorClick(it)}
                             />
                           </li>)
                      }
                    </ColorList>}
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
