import styled from 'styled-components';

const SidebarCollapse = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 260px;
  background: #fff;
  box-shadow: 0 8px 10px -5px rgba(0, 0, 0, 0.2);
  transition: left 200ms ease-out;
  z-index: 9;

  .evaporating {
    transition: opacity 200ms ease-out;
  }

  &:not(.collapsed):not(:hover) {
    left: -200px;

    .evaporating {
      opacity: 0;
    }

    .sidebarlink-icon {
      padding-left: 10px;
      padding-top: 5px;

      .fa {
        font-size: 30px;
      }
    }

    .sidebar-collapse-link {
      .line {
        transition-delay: 200ms;
        transition: left 300ms linear;
        left: 200px;
      }
    }
  }
`;

export default SidebarCollapse;
