import styled from 'styled-components';
import logo from '../../logo.png';
import { Link as RouterLink } from 'react-router-dom';

interface LogoProps {
    height?: string;
}

const Img = styled.img<LogoProps>`
  height: ${(props) => props.height || '100px'};
  margin-bottom: 20px; /* Add space between the logo and SignInRegister */
`;

function Logo({ height }: LogoProps) {
    return (
        <>
            <RouterLink to="/">
                <Img src={logo} className="App-logo" alt="logo" height={height}/>
            </RouterLink>
        </>
    )
}

export default Logo;