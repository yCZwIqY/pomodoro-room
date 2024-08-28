import {ChangeEventHandler, useState} from "react";
import {IconButton, SmallIconButton} from "@components/common";
import styled from "styled-components";
import STYLE from '@styles/variables.ts';
import {ChangeHandler} from "react-hook-form";

const TimeInputContainer = styled.div`
    display: flex;
    align-items: center;
    //border: 2px solid white;
    border-radius: 5px;
`
const TimeLabel = styled.p`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${STYLE.fontSize.md};
    width: 40px;
    height: 30px;
    color: black;
    background: white;
    border-radius: 20px;

`
const TimerUnitLabel = styled.p`
    margin-right: 10px;
`

const ArrowButton = styled(IconButton)`
    border: 2px solid white;
    border-radius: 20px;
    margin: 0 5px;
`

interface TimeInputProps {
    unit: string;
    value: number;
    onChange: (value: number) => void;
}

export default function TimeInput({unit, value, onChange}: TimeInputProps) {

    const onButtonClick = (dir) => {
        if (dir > 100) {
            return;
        }
        onChange(value + (5 * dir))
    }

    return <div style={{display: 'flex', alignItems: 'center', marginRight: '5px'}}>
        <TimeInputContainer>
            <ArrowButton url={'/icons/arrow-down.svg'}
                         type={'button'}
                         disabled={value <= 0}
                         onClick={(e) => onButtonClick(-1)}/>
            <TimeLabel>
                {value}
            </TimeLabel>
            <ArrowButton url={'/icons/arrow-up.svg'}
                         type={'button'}
                         disabled={value >= 100}
                         onClick={(e) => onButtonClick(1)}/>


        </TimeInputContainer>
        <TimerUnitLabel>
            {unit}
        </TimerUnitLabel>
    </div>
}