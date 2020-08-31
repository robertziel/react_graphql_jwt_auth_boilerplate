import styled from 'styled-components';

const ContentWrapper = styled.div`
  margin-left: ${({ marginLeft }) => `${marginLeft}px`};
  height: calc(100% - 100px);
  transition: margin 100ms ease-out;
  position: relative;
  top: 60px;
`;

export default ContentWrapper;
