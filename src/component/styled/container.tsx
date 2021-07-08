//页面布局
import styled from 'styled-components';

const RootContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const TopBox = styled.div`
	width: auto;
	height: 100px;
	border-bottom: 1px solid #7ee04d;
`;

const MainBox = styled.div`
	display: flex;
	flex-direction: row;
`;

const LeftBox = styled.div`
	flex: none;
`;

const ContentBox = styled.div`
	flex: 1;
`;

const FooterBox = styled.div`
	width: auto;
	border-top: 1px solid #7ee04d;
`;

export { RootContainer, TopBox, MainBox, LeftBox, ContentBox, FooterBox };
