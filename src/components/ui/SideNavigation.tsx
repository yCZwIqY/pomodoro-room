import IconButton from '@components/common/button/IconButton.tsx';
import styled from "styled-components";

const SideNav = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    position: absolute;
    left: 10px;
    top: 60px;
    height: 100dvh;
`;

interface SideNavigationProps {
    isEditMode: boolean;
    onClickHome: () => void;
    onClickEdit: () => void;
    onClickShop: () => void;
    onClickReset: () => void;
    onClickSave: () => void;
}

export const SideNavigation = ({
                                   isEditMode,
                                   onClickHome,
                                   onClickEdit,
                                   onClickShop,
                                   onClickReset,
                                   onClickSave
                               }: SideNavigationProps) => (
    <SideNav>
        {isEditMode ? (
            <>
                <IconButton
                    url={'/icons/home.svg'}
                    onClick={onClickHome}
                    size={'40px'}
                />
                <IconButton
                    url={'/icons/cancel.svg'}
                    onClick={onClickReset}
                    buttonColor={'red'}
                    size={'40px'}
                />
                <IconButton
                    url={'/icons/save.svg'}
                    onClick={onClickSave}
                    buttonColor={'green'}
                    size={'40px'}
                />
            </>
        ) : (
            <>
                <IconButton
                    url={'/icons/edit-move.svg'}
                    onClick={onClickEdit}
                    buttonColor={'pink'}
                    size={'40px'}
                />
                <IconButton
                    url={'/icons/shop.svg'}
                    onClick={onClickShop}
                    buttonColor={'purple'}
                    size={'40px'}
                />
            </>
        )}
    </SideNav>
);