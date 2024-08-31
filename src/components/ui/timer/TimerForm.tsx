import { Controller, useForm } from 'react-hook-form';
import TimeInput from '@components/ui/timer/TimeInput.tsx';
import Button from '@components/common/button/Button.tsx';
import styled from 'styled-components';
import { TimerFormData } from '@components/ui/timer/Timer.tsx';

const StartButtonContainer = styled.div`
  padding: 0 20%;
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

export default function TimerForm({ onSubmit }) {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<TimerFormData>({
    defaultValues: {
      focusTime: 25,
      restTime: 5,
      repeatCount: 1
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: '15px' }}>
      <Controller
        name="focusTime"
        control={control}
        rules={{
          min: 5,
          max: 100,
          required: true
        }}
        render={({ field: { onChange, value } }) => (
          <TimeInput
            value={value}
            onChange={onChange}
            minValue={5}
            maxValue={100}
            unit={'분'}
            label={'집중'}
          />
        )}
      />
      <Controller
        name="restTime"
        control={control}
        rules={{
          min: 5,
          max: 100,
          required: true
        }}
        render={({ field: { onChange, value } }) => (
          <TimeInput
            value={value}
            onChange={onChange}
            minValue={5}
            maxValue={100}
            unit={'분'}
            label={'휴식'}
          />
        )}
      />
      <Controller
        name="repeatCount"
        control={control}
        rules={{
          min: 1,
          required: true
        }}
        render={({ field: { onChange, value } }) => (
          <TimeInput
            value={value}
            onChange={onChange}
            unit={'번'}
            minValue={1}
            step={1}
            label={'반복'}
          />
        )}
      />
      <StartButtonContainer>
        <Button fullWidth={true}>시작!</Button>
      </StartButtonContainer>
    </form>
  );
}
