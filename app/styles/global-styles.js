import { createGlobalStyle } from 'styled-components';

import 'animate.css';
import 'font-awesome/css/font-awesome.css';
import 'roboto-fontface/css/roboto/roboto-fontface.css';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  * {
    margin: 0;
    padding: 0;
  }

  body {
    font-family: Roboto, Times, 'Times New Roman', serif;
  }

  #app {
    background-color: #f4f6f8;
    height: 100%;
    width: 100%;
  }

  p,
  label {
    line-height: 1.5em;
  }

  a {
    text-decoration: none;
    color: black;
  }

  h1, h2, h3 {
    font-weight: 400;
  }
`;

export default GlobalStyle;
