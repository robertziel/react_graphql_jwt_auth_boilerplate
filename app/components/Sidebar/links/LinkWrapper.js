import styled from 'styled-components';

import { colors } from 'styles/constants';

export default styled.div`
  background: white;

  a,
  button {
    border: none;
    display: flex;
    flex-direction: row;
    position: relative;
    text-transform: uppercase;
    color: #495057;
    font-weight: 300;
    background-color: inherit;
    cursor: pointer;
    outline: none;

    &:hover,
    &.active {
      background-color: ${colors.lightMain};
      color: ${colors.main};
    }
  }

  .main-sidebar-link {
    height: 50px;
    font-size: 18px;
    line-height: 50px;
    padding-left: 40px;
    width: 100%;
    margin-top: 10px;

    .sidebarlink-container {
      background: inherit;

      .sidebarlink-icon {
        width: 60px;
        left: 0px;
        position: fixed;
        text-align: center;
        transition: padding 200ms ease-out;
        z-index: 2;

        .fa {
          transition: font-size 200ms ease-out;
        }
      }

      .mask {
        position: fixed;
        left: 0px;
        background: inherit;
        height: 50px;
        width: 35px;
        z-index: 1;
      }
    }

    span::before {
      margin-right: 10px;
    }
  }
`;
