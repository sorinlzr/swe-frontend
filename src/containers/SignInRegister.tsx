import * as React from "react";
import { useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Login from "../components/authentication/Login";
import Register from "../components/authentication/Register";
import { Card } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Logo from "../components/logo/Logo";
import CenteredContainer from "./CenteredContainer";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, index, value, ...other } = props;

    return (
        <Card sx={{ boxShadow: 3, border: 0 }}>
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        </Card>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

interface SignInRegisterProps {
    tab: "login" | "register";
}

export default function SignInRegister(props: SignInRegisterProps) {
    const [value, setValue] = React.useState(0);

    useEffect(() => {
        setValue(props.tab === "login" ? 0 : 1);
    }, [props.tab]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <CenteredContainer>
                <Logo height={"100px"} />
                <Box>
                    <Box 
                    sx={{ borderBottom: 1, borderColor: "divider", }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="basic tabs example"
                        >
                            <RouterLink to="/login">
                                <Tab label="Sign In" {...a11yProps(0)} />
                            </RouterLink>
                            <RouterLink to="/register">
                                <Tab label="Register" {...a11yProps(1)} />
                            </RouterLink>
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <Login />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <Register />
                    </CustomTabPanel>
                </Box>
            </CenteredContainer>
        </>
    );
}
