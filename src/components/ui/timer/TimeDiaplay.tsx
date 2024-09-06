import styled from "styled-components";

const TimeLabel = styled.div`
  width: 100%;
  text-align: center;
  background-color: ${({ isFocus, theme }) =>
    isFocus ? theme.colors['sub-base'] : '#FBDBFF'};
  color: ${({ isFocus, theme }) =>
    isFocus ? theme.colors['text-accent'] : '#FF7AD8'};
  font-size: 21px;
  padding: 18px 0;
  border-bottom-right-radius: 18px;
  border-bottom-left-radius: 18px;
`;

const RepeatLabel = styled.div`
  width: 100%;
  text-align: center;
  color: white;
  font-size: ${({ theme }) => theme.fontSize.md};
  position: relative;
  background-color: ${({ theme }) => theme.colors.base};
  padding: 5px;
  margin: 10px 0;
  border-radius: 18px;
  @media ${({ theme }) => theme.device.tablet} {
    font-size: ${({ theme }) => theme.fontSize.sm};
  }
`;

const TimeTypeLabel = styled.div`
  margin-top: 10px;
  background-color: ${({ isFocus }) => (isFocus ? '#3ECEFE' : '#FF7AD8')};
  color: white;
  font-size: ${({ theme }) => theme.fontSize.lg};
  padding: 10px;
  text-align: center;
  border-top-right-radius: 18px;
  border-top-left-radius: 18px;
  @media ${({ theme }) => theme.device.tablet} {
    font-size: ${({ theme }) => theme.fontSize.md};
    padding: 5px;
  }
`;

interface TimerDisplayProps {
    timeType: 'FOCUS' | 'REST';
    currentRepeatCount: number;
    remainingTime: number;
}

const TimerDisplay = ({ timeType, currentRepeatCount, remainingTime }: TimerDisplayProps) => {
    const getMin = () => Math.floor(remainingTime / 60).toString().padStart(2, '0');
    const getSec = () => (remainingTime % 60).toString().padStart(2, '0');

    return (
        <>
            <RepeatLabel>{currentRepeatCount + 1} 번째 반복</RepeatLabel>
            <TimeTypeLabel isFocus={timeType === 'FOCUS'}>
                {timeType === 'FOCUS' ? '집중' : '휴식'}
            </TimeTypeLabel>
            <TimeLabel isFocus={timeType === 'FOCUS'}>
                {getMin()} : {getSec()}
            </TimeLabel>
        </>
    );
};

export default TimerDisplay;