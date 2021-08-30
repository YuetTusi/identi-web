
import styled from 'styled-components';

const SearchBox = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

const InnerTableBox = styled.div`
	display: static;
	margin: 0;
	padding: 0;
	border: 1px solid #f0f0f0;
	border-radius: 2px;
	.ant-table-wrapper:only-child .ant-table {
		margin: 0 !important;
		padding: 0 !important;
	}
`;

export { SearchBox, InnerTableBox };
