import { createGlobalStyle } from 'styled-components';

/**
 * 定义全局样式
 */
const GlobalStyle = createGlobalStyle`

    html{
        margin:0;
        padding:0;
        font-size: 62.5%;
    }
    body{
        margin:0;
        padding:0;
        position: relative;
        font-size: 1.4rem;
        background-color: #f6f7f9;
    }
`;

export { GlobalStyle };
