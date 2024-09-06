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
  height: ${({ isOpen }) => (isOpen ? '100px' : '20px')};
`;

const FurnitureInfoSummary = styled(SummaryContainer)``;
export default function FurnitureInfo() {
  const {
    isEditMode,
    lastClickedObject,
    removeTempPosition,
    setLastClickedObject
  } = useEditModeStore();
  const { put } = useMyBagStore();
  const [isOpen, onToggle] = useDetailSummary();

  const onPull = () => {
    const { category, key, id } = lastClickedObject;
    put(category, key);
    removeTempPosition(id);
    setLastClickedObject(null);
  };

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
                <Button onClick={onPull} buttonColor={'red'}>
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
