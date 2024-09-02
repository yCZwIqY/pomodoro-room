import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import useMyBagStore from '@store/useMyBagStore.ts';
import MyBagItem from '@components/room/MyBagItem.tsx';

const MyBagContainer = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  height: 30dvh;
  perspective: 100px;
  transform: translateY(100%);
`;

const MyBagList = styled.ul`
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.72);
  border-top-left-radius: 21px;
  border-top-right-radius: 21px;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 120px));
  padding: 20px;
  box-sizing: border-box;
  overflow-y: scroll;
`;

const CloseButton = styled.button`
  background-color: white;
  width: 30px;
  height: 30px;
  outline: none;
  border: none;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  margin-left: 20px;
  position: fixed;
  margin-top: -30px;
`;

export default function MyBag({ editMode }) {
  const [showCloseBtn, setShowCloseBtn] = useState(false);
  const [isClose, setIsClose] = useState(false);
  const { myBag } = useMyBagStore();

  useEffect(() => {
    console.log(getAllMyBag());
    if (editMode) {
      onShow(true);
    } else {
      onHide();
    }
  }, [editMode]);

  const getAllMyBag = () => {
    return Object.values(myBag).flat();
  };
  const onHide = () => {
    gsap.to('.my-bag-container', {
      transform: 'translateY(100%)',
      duration: 0.5,
      onComplete: () => {
        if (!editMode) {
          setShowCloseBtn(false);
        }
      }
    });
  };

  const onShow = (firstShow = false) => {
    let delay = 0;
    if (firstShow) delay = 1.5;
    gsap.to('.my-bag-container', {
      transform: 'translateY(0)',
      duration: 0.5,
      delay: delay,
      onComplete: () => setShowCloseBtn(true)
    });
  };

  const onClose = () => {
    console.log(isClose);
    if (isClose) {
      onShow();
    } else {
      onHide();
    }
    setIsClose(!isClose);
  };

  return (
    <MyBagContainer className={'my-bag-container'}>
      {showCloseBtn && <CloseButton onClick={onClose} />}
      <MyBagList>
        {getAllMyBag().map((it) => (
          <MyBagItem data={it} key={it.id} />
        ))}
      </MyBagList>
    </MyBagContainer>
  );
}
