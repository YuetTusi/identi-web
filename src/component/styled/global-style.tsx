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

    .ztree {
        li {
            a.curSelectedNode{
                background-color:#b5eaec ;
            }
        }
    }

    .over-right-popover-padding {
		.ant-popover-inner-content {
				padding: 0 !important;
			}
	}
`;

export { GlobalStyle };
