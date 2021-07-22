import { createGlobalStyle } from 'styled-components';

/**
 * 定义全局样式
 */
const GlobalStyle = createGlobalStyle`

    html{
        margin:0;
        padding:0;
    }
    body{
        margin:0;
        padding:0;
        position: relative;
        background-color: #f6f7f9;
    }
`;

export { GlobalStyle };
