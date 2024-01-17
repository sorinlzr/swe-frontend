import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

type Props = {
    children?: React.ReactNode
}

function CenteredContainer({ children }: Props) {
    return (
        <>
            <Container>
                {children}
            </Container>
        </>
    )
}

export default CenteredContainer;