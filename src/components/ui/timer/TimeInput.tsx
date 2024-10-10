import styled from 'styled-components';
import IconButton from '@components/common/button/IconButton.tsx';

const TimeInputContainer = styled.h3`
  display: flex;
  align-items: center;
  margin: 10px 0;

  @media ${({ theme }) => theme.device.tablet} {
    margin: 2px 0;
  }
`;

const TimeLabel = styled.div`
  margin: 0 10px;
  padding: 10px;
  width: 50px;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors['text-accent']};
  background: ${({ theme }) => theme.colors['sub-base']};
  border-radius: 20px;
  text-align: center;

  @media ${({ theme }) => theme.device.tablet} {
    font-size: ${({ theme }) => theme.fontSize.md};
    padding: 5px;
    margin: 5px;
  }
`;
const UnitLabel = styled.div`
  color: ${({ theme }) => theme.colors.text};
  margin-left: 10px;

  @media ${({ theme }) => theme.device.tablet} {
    font-size: ${({ theme }) => theme.fontSize.md};
  }
`;

interface TimeInputProps {
  unit: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  step?: number;
  maxValue?: number;
  minValue?: number;
}

export default function TimeInput({
  unit,
  label,
  value,
  onChange,
  step = 5,
  maxValue = 0,
  minValue = 0
}: TimeInputProps) {
  const onButtonClick = (dir: number) => {
    if (value <= minValue && dir < 0) {
      return;
    }
    if (value >= maxValue && dir > 0) {
      return;
    }
    onChange(value + dir * step);
  };

  return (
    <TimeInputContainer>
      <IconButton
        url={'/icons/arrow-down.svg'}
        disabled={false}
        buttonColor={'red'}
        onClick={() => onButtonClick(-1)}
      />
      <TimeLabel>{value}</TimeLabel>
      <IconButton
        url={'/icons/arrow-up.svg'}
        disabled={false}
        onClick={() => onButtonClick(1)}
      />
      <UnitLabel>
        {unit} {label}
      </UnitLabel>
    </TimeInputContainer>
  );
}
