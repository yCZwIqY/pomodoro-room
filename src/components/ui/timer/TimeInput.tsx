import styled from "styled-components";
import IconButton from "@components/common/button/IconButton.tsx";


const TimeInputContainer = styled.h3`
    display: flex;
    align-items: center;
    margin: 10px 0;
`

const TimeLabel = styled.div`
    margin: 0 10px;
    padding: 10px;
    width: 50px;
    justify-content: center;
    align-items: center;
    font-size: ${({theme}) => theme.fontSize.lg};
    color: ${({theme}) => theme.colors['text-accent']};
    background: ${({theme}) => theme.colors['sub-base']};
    border-radius: 20px;
    text-align: center;
`
const UnitLabel = styled.div`
    color: ${({theme}) => theme.colors.text};
    margin-left: 10px;
`

interface TimeInputProps {
    unit: string;
    label: string
}
export default function TimeInput({unit, label}: TimeInputProps) {

    const onButtonClick = (dir) => {

    }

    return <TimeInputContainer>
        <IconButton url={'/icons/arrow-down.svg'} disabled={false} buttonColor={'red'}/>
        <TimeLabel>
            {0}
        </TimeLabel>
        <IconButton url={'/icons/arrow-up.svg'} disabled={false}/>
        <UnitLabel>
            {unit} {label}
        </UnitLabel>
    </TimeInputContainer>
}