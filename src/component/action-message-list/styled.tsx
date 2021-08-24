import color from 'color';
import styled from 'styled-components';

const MessageListRoot = styled.div`
	.empty-panel {
		border: 1px solid #fff;
		width: 200px;
		background-color: #fff;
	}
	.list-panel {
		max-height: 230px;
		overflow-y: auto;
	}
	.button-panel {
		padding: 15px 10px;
		text-align: center;
	}

	ul {
		margin: 0;
		padding: 0;
		font-size: 1.2rem;
		border-radius: ${(props) => props.theme.radius};
	}

	li {
		display: flex;
		flex-direction: column;
		cursor: pointer;
		margin: 0;
		padding: 10px 20px;
		list-style-type: none;
		border-bottom: 1px solid ${(props) => color(props.theme.text).fade(0.9).toString()};

		a {
			display: block;
			width: 360px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			color: ${(props) => props.theme.text};
		}
		time {
			color: #00000073;
		}
		em {
			display: none;
			font-size: 1.2rem;
			font-style: normal;
			margin-left: 1rem;
			color: #52c41a;
			span {
				margin-left: 4px;
			}
		}

		:hover {
			background-color: ${(props) => color(props.theme.text).fade(0.9).toString()};
			em {
				display: inline-block;
			}
		}
	}
`;

export { MessageListRoot };
