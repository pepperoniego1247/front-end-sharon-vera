import React from "react"
import { createTheme, ThemeProvider } from "@mui/material"
import CssBaseline from "@mui/material/CssBaseline/CssBaseline";
import { esES } from '@mui/material/locale';
import { esES as esEs } from '@mui/x-data-grid/locales';
import { esES as pickersesES } from '@mui/x-date-pickers/locales';
import { esES as coreesES } from '@mui/material/locale';

type themeProp = {
    children: JSX.Element;
}

export enum themePalette {
    BG = "#dbdbdb",
    GRAY = "#a3a3a3",
    BLACK = "#262726",
    FONT_GLOBAL = "'Roboto', sans-serif",
    ERROR_MAIN = "#f44336",
    BG_ERROR_MAIN = "rgba(244,67,54,8,1)"
}

const theme = createTheme({
    palette: {
        mode: "dark",
        background: {
            default: themePalette.BG
        },
        primary: {
            main: themePalette.GRAY
        },
        secondary: {
            main: themePalette.BLACK
        }
    },
    typography: {
        fontFamily: themePalette.FONT_GLOBAL,
        fontSize: 13
    },
    components: {
        MuiTextField: {
            defaultProps: {
                style: {
                    borderRadius: "0em"
                }
            }
        },
        MuiButton: {
            defaultProps: {
                style: {
                    textTransform: "none",
                    boxShadow: "none",
                    borderRadius: "5px",
                    fontWeight: 600
                }
            }
        },
        MuiAlert: {
            defaultProps: {
                style: {
                    borderRadius: "0.8em",
                    fontSize: "1em"
                }
            },
            styleOverrides: {
                standardError: {
                    border: `1px solid ${themePalette.ERROR_MAIN}`,
                    background: themePalette.BG_ERROR_MAIN
                }
            }
        }
    }
}, esES, esEs, pickersesES, coreesES);

export const ThemeConfig: React.FC<themeProp> = ({ children }) => {
    return (
       <ThemeProvider theme={theme}>
            <CssBaseline/>
            {children}
       </ThemeProvider>
    );
}

export default theme;
