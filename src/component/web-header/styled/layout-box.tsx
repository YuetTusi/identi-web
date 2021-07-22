import color from 'color';
import styled from 'styled-components';

const WebHeaderRoot = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	background-color: ${(props) => props.theme.widget};
	.first-row {
		flex: 1;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		background-color: ${(props) => props.theme.bg};
		.caption {
			margin-left: 1rem;
			font-size: 1.2rem;
			font-weight: lighter;
		}
		.fn {
			margin-right: 1rem;
			a {
				font-weight: bold;
				color: ${(props) => props.theme.text};
				border-radius: 2px;
				padding: 2px 10px;
				display: inline-block;
				background-color: ${(props) => props.theme.strong};
			}
		}
	}
	.second-row {
		flex: 1;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-top: 2px solid ${(props) => color(props.theme.text).lighten(0.2).toString()};
		border-bottom: 2px solid ${(props) => color(props.theme.text).lighten(0.2).toString()};
		background-color: ${(props) => props.theme.widget};

		.left {
			flex: 1;
			margin-left: 1rem;
			color: #fff;
		}
		.right {
			flex: none;
			margin-right: 1rem;
			display: flex;
			flex-direction: row;
			color: #fff;
			.btn {
				margin-right: 20px;
			}
			.user {
				display: flex;
				flex-direction: row;
				font-weight: bold;
				i {
					border: 1px solid #fff;
					width: 24px;
					height: 24px;
					display: block;
					border-radius: 50%;
					text-align: center;
					margin-right: 10px;
				}
			}
		}
	}
`;

export { WebHeaderRoot };