import color from 'color';
import styled from 'styled-components';

const WarnBox = styled.div`
	position: absolute;
	left: 50%;
	top: 15%;
	margin-left: -200px;
	width: 400px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	z-index: 10;

	& > div {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	h1 {
		font-family: Arial, Helvetica, sans-serif;
		font-size: 6rem;
		color: ${(props) => props.theme.widget};
		margin: 0;
		span {
			margin-left: 2rem;
		}
	}
	h4 {
		color: #222;
		font-size: 1.6rem;
		margin: 10px 0 0 0;
	}
	hr {
		width: 100%;
		margin: 40px 0;
		border-top: none;
		border-left: none;
		border-right: none;
		border-bottom: 1px solid ${(props) => props.theme.widget};
	}
	.button-box {
	}
`;

export { WarnBox };
