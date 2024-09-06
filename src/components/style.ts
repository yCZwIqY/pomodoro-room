import styled from 'styled-components';

export const DetailContainer = styled.details`
  position: absolute;
  right: 10px;
  top: 10px;
  background: white;
  padding: 20px;
  border-radius: 21px;
  box-shadow: 0 4px 1px ${({ theme }) => theme.colors.shadow};
  transition: height 0.3s ease-in-out;
  *:not(summary) {
    opacity: ${({ isOpen }) => (isOpen ? 100 : 0)};
    transition: ${({ isOpen }) => (isOpen ? 'opacity 0.8s' : 'none')};
  }

  summary {
    list-style-type: none;
  }

  summary::before {
    position: absolute;
    content: '';
    width: 20px;
    height: 20px;
    left: 0;
    display: inline-block;
    background: url('/icons/arrow-right-blue.svg') no-repeat center center;
    background-size: contain;
    vertical-align: middle;
    transition: transform 0.1s ease-out;
  }

  &[open] {
    summary::before {
      transform: rotate(90deg);
    }
  }
`;

export const SummaryContainer = styled.summary`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.lg};
  cursor: pointer;
  position: relative;
  padding-left: 25px;
  overflow: hidden;

  @media ${({ theme }) => theme.device.tablet} {
    font-size: ${({ theme }) => theme.fontSize.md};
  }
`;
