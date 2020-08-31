import styled from 'styled-components';

import { colors } from 'styles/constants';

const Wrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 100ms linear;

  .hamburger-container {
    position: relative;
    height: 40px;
    width: 40px;

    span {
      display: block;
      height: 2px;
      width: 40px;
      background: #495057;
      border-radius: 5px;
      transform-origin: center center;
      position: absolute;

      &:nth-of-type(1n) {
        transform: translate3d(0px, 0px, 0px) rotate(0deg);
      }

      &:nth-of-type(2n) {
        top: 15px;
      }

      &:nth-of-type(3n) {
        transform: translate3d(0px, 30px, 0px) rotate(0deg);
      }
    }
  }

  &:hover {
    background: ${colors.lightMain};
  }

  &.open {
    .hamburger-container {
      span {
        &:nth-of-type(1n) {
          transform: translate3d(0px, 15px, 0px) rotate(45deg);
        }

        &:nth-of-type(2n) {
          opacity: 0;
        }

        &:nth-of-type(3n) {
          transform: translate3d(0px, 15px, 0px) rotate(-45deg);
        }
      }
    }
  }
`;

export default Wrapper;
