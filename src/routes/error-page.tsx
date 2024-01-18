import { useRouteError } from "react-router-dom";
import Logo from "../components/logo/Logo";
import CenteredContainer from "../containers/CenteredContainer";

export default function ErrorPage(props?: any) {
    const message = props.message;
    const error: any = useRouteError();
    console.error(error);

    return (
        <>
            <CenteredContainer>
                <Logo height={"100px"} />
                <div id="error-page">
                    <h1>Oops!</h1>
                    <p>Sorry, an unexpected error has occurred.</p>
                    <p>
                        <i>
                            {error
                                ? error.response?.data?.error ||
                                  error.message ||
                                  error.statusText
                                : message
                                ? message
                                : "Unknown error"}
                        </i>
                    </p>
                </div>
            </CenteredContainer>
        </>
    );
}
