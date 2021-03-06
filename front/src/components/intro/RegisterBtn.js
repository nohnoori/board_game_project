import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const IOSSwitch = styled((props) => (
    <Switch
        focusVisibleClassName=".Mui-focusVisible"
        disableRipple
        {...props}
    />
))(({ theme }) => ({
    width: 340,
    height: 60,
    padding: 0,
    "& .MuiSwitch-switchBase": {
        padding: 0,
        margin: 5,
        transitionDuration: "300ms",
        "&.Mui-checked": {
            transform: "translateX(200px)",
            color: "#fff",
            "& + .MuiSwitch-track": {
                backgroundColor:
                    theme.palette.mode === "dark" ? "#2ECA45" : "#A98E64",
                opacity: 1,
                border: 0,
            },
            "&.Mui-disabled + .MuiSwitch-track": {
                opacity: 0.5,
            },
        },
        "&.Mui-focusVisible .MuiSwitch-thumb": {
            color: "#33cf4d",
            border: "6px solid #fff",
        },
        "&.Mui-disabled .MuiSwitch-thumb": {
            color:
                theme.palette.mode === "light"
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        "&.Mui-disabled + .MuiSwitch-track": {
            opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
        },
    },
    "& .MuiSwitch-thumb": {
        boxSizing: "border-box",
        width: 130,
        height: 50,
        borderRadius: 17 / 1,
    },
    "& .MuiSwitch-thumb:before": {
        content: "'Get started'",
        fontSize: "1.1rem",
        color: "gray",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        textAlign: "center",
        lineHeight: "50px",
    },
    "& .MuiSwitch-track": {
        borderRadius: 20 / 1,
        backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
        opacity: 1,
        transition: theme.transitions.create(["background-color"], {
            duration: 500,
        }),
    },
}));

const RegisterBtn = ({ open, handleOpen }) => {
    return (
        <FormControlLabel
            control={
                <IOSSwitch
                    sx={{ m: 1 }}
                    checked={open}
                    onChange={() => {
                        handleOpen();
                    }}
                />
            }
        />
    );
};

export default RegisterBtn;
