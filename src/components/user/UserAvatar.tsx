import {IconButton, Avatar} from "@mui/material";
import { useState } from "react";
import { User } from "../../models/User";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

function stringToColor(string: string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
}

function stringAvatar(user: User): { sx: {}; children: string } {
    let initials =
        user.firstname?.charAt(0).toUpperCase() +
        " " +
        user.lastname?.charAt(0).toUpperCase();

    return {
        sx: {
            bgcolor: stringToColor(initials),
        },
        children: initials,
    };
}

interface UserAvatarProps {
    user: User;
    isHorizontal?: boolean;
    hideName?: boolean;
}

export default function UserAvatar({
    user,
    isHorizontal = false,
    hideName = true,
}: UserAvatarProps) {
    const navigate = useNavigate();

    const handleClick = (event: React.MouseEvent) => {
        event.preventDefault();
        navigate(`/user/${user.username}`);
    };

    return (
        <>
            <Box
                display="flex"
                flexDirection={isHorizontal ? "row" : "column"}
                alignItems="center"
                gap={isHorizontal ? 2 : 0}
            >
                <IconButton onClick={handleClick}>
                    <Avatar
                        {...stringAvatar(user)}
                        sx={
                            isHorizontal
                                ? { width: 50, height: 50 }
                                : { width: 100, height: 100 }
                        }
                        src={user.avatar}
                    />
                </IconButton>
                {!hideName && (
                    <Typography
                        component="h1"
                        variant={isHorizontal ? "h6" : "h5"}
                        sx={
                            isHorizontal
                                ? { fontWeight: 400 }
                                : { fontWeight: 800 }
                        }
                    >
                        {user.firstname}
                    </Typography>
                )}
            </Box>
        </>
    );
}
