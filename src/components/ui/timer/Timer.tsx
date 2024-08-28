import styled from "styled-components";
import STYLE from '@styles/variables.ts';
import {Button, GlassContainer} from "@components/common";
import TimeInput from "@components/ui/timer/TimeInput.tsx";
import {Controller, useForm} from "react-hook-form";

const TimerContainer = styled(GlassContainer)`
    position: absolute;
    right: 10px;
    top: 15px;
    max-width: 190px;
    padding: 10px;
    font-weight: bold;
    border: 1px solid white;
`
const TimerRow = styled.label`
    font-size: ${STYLE.fontSize.md};
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
`

const TimerStartButton = styled(Button)`
    width: 100%;
    outline: none;
    border: none;
    font-size: ${STYLE.fontSize.lg};
    padding: 8px;
    margin-top: 10px;
    font-weight: bold;
`;

const TimerForm = styled.form`
    padding: 10px;
`

const TimerTitle = styled.h3`
    color: white;
    margin-bottom: 10px;
`
export default function Timer() {
    const {
        control,
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        defaultValues: {
            focusTime: 0,
            restTime: 0,
            repeatCount: 0
        }
    })
    const onStartTimer = (data) => {
        console.log(data)
    }

    const timeInputRule = (value) => {
        return value < 0 ? 'Value must be greater than or equal to 0' : '';
    }

    return <TimerContainer>
        <TimerTitle>Pomo d'oro Timer</TimerTitle>
        <TimerForm onSubmit={handleSubmit(onStartTimer)}>
            <TimerRow>
                <Controller
                    name="focusTime"
                    control={control}
                    render={({field: {onChange, value}}) => (
                        <TimeInput unit={'분'}
                                   value={value}
                                   onChange={onChange}
                        />
                    )}
                />
                집중
            </TimerRow>
            <TimerRow>
                <Controller
                    name="restTime"
                    control={control}
                    render={({field: {onChange, value}}) => (
                        <TimeInput unit={'분'}
                                   value={value}
                                   onChange={onChange}
                        />
                    )}
                />
                휴식
            </TimerRow>
            <TimerRow>
                <Controller
                    name="repeatCount"
                    control={control}
                    render={({field: {onChange, value}}) => (
                        <TimeInput unit={'번'}
                                   value={value}
                                   onChange={onChange}
                        />
                    )}
                />
                반복
            </TimerRow>
            <TimerStartButton type={'submit'}>
                시작
            </TimerStartButton>
        </TimerForm>

    </TimerContainer>
}