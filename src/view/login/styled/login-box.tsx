import styled from 'styled-components';

const LoginRoot = styled.div`
	position: absolute;
	top: 20%;
	left: 50%;
	margin-left: -300px;
	width: auto;
	/* background: ${(props) => props.theme.widget}; */

	.login-box {
		margin: 0;
		padding: 0;
		width: 600px;
		height: auto;
		margin: 0 auto;
		background-color: #fff;
		border: 4px solid ${(props) => props.theme.widget};
		border-radius: 2px;
		box-shadow: -1px 1px 20px 5px ${(props) => props.theme.widget};

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		> h1 {
			font-weight: lighter;
			margin-top: 22px;
			margin-bottom: 22px;
		}

		& > .ant-form {
			width: 450px;
		}
	}
`;

export { LoginRoot };
