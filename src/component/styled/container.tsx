//页面布局
import styled from 'styled-components';
import color from 'color';

/**
 * 根容器
 */
const RootContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

/**
 * 顶部盒
 */
const TopBox = styled.div`
	box-sizing: border-box;
	width: auto;
	height: 100px;
`;

/**
 * 主区盒
 */
const MainBox = styled.div`
	display: flex;
	flex-direction: row;
`;

/**
 * 左侧盒
 */
const LeftBox = styled.div`
	flex: none;
	border-right: 1px solid ${(props) => color(props.theme.text).lighten(0.6).toString()};
`;

/**
 * 内容区盒
 */
const ContentBox = styled.div`
	flex: 1;
	/* min-height: 600px; */
	padding: 10px;
`;

/**
 * 脚区盒
 */
const FooterBox = styled.div`
	width: auto;
	border-top: 1px solid ${(props) => color(props.theme.text).lighten(0.6).toString()};
	& > div {
		padding-top: 20px;
		text-align: center;
	}
`;

/**
 * 盒子，可自定义外距
 */
const BaseBox = styled.div<{
	marginTop?: string | 0;
	marginBottom?: string | 0;
	marginLeft?: string | 0;
	marginRight?: string | 0;
}>`
	display: static;
	margin-top: ${(props) => props.marginTop ?? 0};
	margin-bottom: ${(props) => props.marginBottom ?? 0};
	margin-left: ${(props) => props.marginLeft ?? 0};
	margin-right: ${(props) => props.marginRight ?? 0};
	padding: 0;
`;

/**
 * 带边框的盒子,可自定义外距
 */
const BorderBox = styled.div<{
	marginTop?: string | 0;
	marginBottom?: string | 0;
	marginLeft?: string | 0;
	marginRight?: string | 0;
}>`
	display: static;
	margin-top: ${(props) => props.marginTop ?? 0};
	margin-bottom: ${(props) => props.marginBottom ?? 0};
	margin-left: ${(props) => props.marginLeft ?? 0};
	margin-right: ${(props) => props.marginRight ?? 0};
	padding: 10px;
	border: 1px solid ${(props) => color(props.theme.text).lighten(0.6).toString()};
	border-radius: ${(props) => props.theme.radius};
	background-color: #fff;
`;

/**
 * 带标签的盒子，标签使用legend元素
 */
const LabelBox = styled.fieldset<{
	marginTop?: string | 0;
	marginBottom?: string | 0;
	marginLeft?: string | 0;
	marginRight?: string | 0;
}>`
	display: static;
	margin-top: ${(props) => props.marginTop ?? 0};
	margin-bottom: ${(props) => props.marginBottom ?? 0};
	margin-left: ${(props) => props.marginLeft ?? 0};
	margin-right: ${(props) => props.marginRight ?? 0};
	padding: 10px;
	border: 1px solid ${(props) => color(props.theme.text).lighten(0.6).toString()};
	border-radius: ${(props) => props.theme.radius};
	background-color: #fff;

	& > legend {
		display: block;
		width: auto;
		padding: 2px 5px;
		background-color: #fff;
		font-size: 14px;
		font-weight: bold;
		color: ${(props) => props.theme.text};
		border: 1px solid ${(props) => color(props.theme.text).lighten(0.6).toString()};
	}
`;

/**
 * 强调盒子，强调色背景
 */
const StrongBox = styled.div<{
	marginTop?: string | 0;
	marginBottom?: string | 0;
	marginLeft?: string | 0;
	marginRight?: string | 0;
}>`
	display: inline-block;
	margin-top: ${(props) => props.marginTop ?? 0};
	margin-bottom: ${(props) => props.marginBottom ?? 0};
	margin-left: ${(props) => props.marginLeft ?? 0};
	margin-right: ${(props) => props.marginRight ?? 0};
	padding: 5px 10px;
	border: 1px solid ${(props) => color(props.theme.strong).darken(0.2).toString()};
	border-radius: ${(props) => props.theme.radius};
	font-weight: bold;
	color: ${(props) => props.theme.text};
	background-color: ${(props) => props.theme.strong};
`;

const SearchBar = styled.div``;

export {
	RootContainer,
	TopBox,
	MainBox,
	LeftBox,
	ContentBox,
	FooterBox,
	BaseBox,
	BorderBox,
	StrongBox,
	LabelBox,
	SearchBar
};
