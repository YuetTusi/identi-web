import styled from 'styled-components';
import color from 'color';

/**
 * 表格
 */
const TablePanel = styled.div`
	.az-table-row {
		&:nth-child(even) {
			background-color: ${(props) => color(props.theme.text).fade(0.9).toString()};
		}
	}
`;

/**
 * 列表
 */
const ListView = styled.ol<{
	marginTop?: string | 0;
	marginBottom?: string | 0;
	marginLeft?: string | 0;
	marginRight?: string | 0;
}>`
	margin-top: ${(props) => props.marginTop ?? 0};
	margin-bottom: ${(props) => props.marginBottom ?? 0};
	margin-left: ${(props) => props.marginLeft ?? 0};
	margin-right: ${(props) => props.marginRight ?? 0};
	padding: 0;
	background-color: #fff;
	border: 1px solid ${(props) => color(props.theme.text).fade(0.6).toString()};
	border-radius: ${(props) => props.theme.radius};

	& > li {
		list-style-type: none;
		margin: 0;
		padding: 8px 8px;
		&:nth-child(even) {
			background-color: ${(props) => color(props.theme.text).fade(0.9).toString()};
		}
		&:last-child {
			border-bottom: none;
		}
		& > label {
		}
	}
`;

/**
 * 附件列表
 */
const AttachList = styled.ol<{
	marginTop?: string | 0;
	marginBottom?: string | 0;
	marginLeft?: string | 0;
	marginRight?: string | 0;
}>`
	margin-top: ${(props) => props.marginTop ?? 0};
	margin-bottom: ${(props) => props.marginBottom ?? 0};
	margin-left: ${(props) => props.marginLeft ?? 0};
	margin-right: ${(props) => props.marginRight ?? 0};
	padding: 0;
	background-color: #fff;
	border: 1px solid ${(props) => color(props.theme.text).fade(0.6).toString()};
	border-radius: ${(props) => props.theme.radius};

	& > li {
		list-style-type: none;
		margin: 0;
		padding: 8px 8px;
		cursor: pointer;

		a {
			display: inline-block;
			cursor: pointer;
		}
		i {
			padding-left: 10px;
			&:hover {
				color: red;
			}
		}
		&:nth-child(even) {
			background-color: ${(props) => color(props.theme.text).fade(0.9).toString()};
		}
		&:last-child {
			border-bottom: none;
		}
	}
`;

export { TablePanel, ListView, AttachList };
