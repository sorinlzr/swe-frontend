import { IconButton, Avatar } from "@mui/material";
import { User } from "../../models/User";
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
    size?: "small" | "medium" | "large";
}

const avatarSize = {
    small: { width: 45, height: 45 },
    medium: { width: 75, height: 75 },
    large: { width: 100, height: 100 },
};

const typographyFontWeight = {
    small: 400,
    medium: 600,
    large: 800,
};

const typographyFontSize = {
    small: 15,
    medium: 20,
    large: 25,
};

export default function UserAvatar({
    user,
    isHorizontal = false,
    hideName = true,
    size = "large",
}: UserAvatarProps) {
    return (
        <>
            {" "}
            <Box
                display="flex"
                flexDirection={isHorizontal ? "row" : "column"}
                alignItems="center"
                gap={isHorizontal ? 1 : 0}
            >
                <IconButton href={`/user/${user.username}`}>
                    <Avatar
                        {...stringAvatar(user)}
                        sx={avatarSize[size]}
                        src={user.avatar}
                    />
                </IconButton>
                {!hideName && (
                    <Typography
                        component="span"
                        sx={{
                            fontWeight: typographyFontWeight[size],
                            fontSize: typographyFontSize[size],
                            fontFamily: 'Contrail One, sans-serif',
                        }}
                    >
                        {user.firstname}
                    </Typography>
                )}
            </Box>
        </>
    );
}
