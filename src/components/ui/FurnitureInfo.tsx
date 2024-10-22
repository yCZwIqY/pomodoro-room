import useEditModeStore from '@store/useEditModeStore.ts';
import styled from 'styled-components';
import { DetailContainer, SummaryContainer } from '@components/style.ts';
import useMyBagStore from '@store/useMyBagStore.ts';
import { useDetailSummary } from '@hooks/useDetailSummary.ts';
import IconButton from '@components/common/button/IconButton.tsx';

const FurnitureInfoContainer = styled(DetailContainer)<{
  $isOpen: boolean;
}>`
  min-width: 150px;
  text-align: right;
  padding: 8px 15px;
  min-height: ${({ $isOpen }) => ($isOpen ? '100px' : '20px')};
`;

const ColorList = styled.ul`
  list-style: none;
  margin: 10px;
  & > li {
    display: flex;
    justify-content: space-between;
    margin: 5px 0;
    gap: 10px;
  }
`;

const ColorPicker = styled.input`
  width: 30px;
  height: 30px;
  border: none;
  outline: none;
  border-radius: 8px;

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: transparent;

  &::-webkit-color-swatch {
    padding: 0;
    border-radius: 8px;
    border: 0;
    outline: none;
    box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.5);
  }
`;

const ColorText = styled.div`
  flex: 1;
  align-content: center;
`;
const ColorInput = styled.input`
  width: 80px;
  outline: none;
  border: none;
  border-radius: 8px;
  padding: 5px;
  box-shadow: inset 1px 1px 2px 0 rgba(0, 0, 0, 0.5);
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
  const { put } = useMyBagStore();
  const [isOpen, onToggle] = useDetailSummary();

  const onPull = () => {
    const { category, key, id } = lastClickedObject;
    put(category, key);
    removeTempPosition(id);
    setLastClickedObject(null);
  };

  const onColorChange = (part: string, color: string) => {
    setTempPosition(lastClickedObject.id, {
      ...tempPosition[lastClickedObject.id],
      currentColors: {
        ...tempPosition[lastClickedObject.id].currentColors,
        [part]: color
      }
    });
  };

  const onClickRotation = () => {
    setTempPosition(lastClickedObject.id, {
      ...tempPosition[lastClickedObject.id],
      rotation: [
        tempPosition[lastClickedObject.id].rotation[0],
        (tempPosition[lastClickedObject.id].rotation[1] + 90) % 360,
        tempPosition[lastClickedObject.id].rotation[2]
      ]
    });
  };

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
                  {lastClickedObject.parts.map((part) => (
                    <li key={part}>
                      <ColorText>{part}</ColorText>
                      <ColorInput
                        value={
                          tempPosition[lastClickedObject.id].currentColors![
                            part
                          ]
                        }
                        onChange={(e) => onColorChange(part, e.target.value)}
                      />
                      <ColorPicker
                        type={'color'}
                        value={
                          tempPosition[lastClickedObject.id].currentColors![
                            part
                          ]
                        }
                        onChange={(e) => onColorChange(part, e.target.value)}
                      />
                    </li>
                  ))}
                </ColorList>
                <div
                  style={{
                    margin: '5px 0',
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '10px',
                    gap: '10px'
                  }}
                >
                  <IconButton
                    url={'/icons/rotation.svg'}
                    buttonColor={'blue'}
                    onClick={onClickRotation}
                  />
                  <IconButton
                    url={'/icons/put.svg'}
                    buttonColor={'red'}
                    onClick={onPull}
                  />
                </div>
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
