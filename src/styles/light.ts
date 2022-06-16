import { createTheme } from "@shopify/restyle";

const pallete = {
    white: '#ffffff',
    black: '#202020',
    grayPrimary: "#EBEBED",
    bgWhite: '#fafafa',
    yellowDark: "#F6C056",
    blue: "#55A4ED",
    bgSoftYellow: '#FBF9F4',
    grayBackground:'#dee2e6',
    darkGray: '#495057',
    grayText: '#838B90',
    mainRed: '#f66156'

}

const theme = createTheme({
    colors:{
        mainBackground: pallete.bgWhite,
        black: pallete.black,
        white: pallete.white,
        yellow: pallete.yellowDark,
        blue: pallete.blue,
        bgSoftYellow: pallete.bgSoftYellow,
        softGray: pallete.grayPrimary,
        grayBg: pallete.grayBackground,
        darkGray: pallete.darkGray,
        grayText: pallete.grayText,
        mainRed: pallete.mainRed
    },
    spacing:{
        "0": "0",
        xs: 8,
        xm: 12,
        md: 16,
        lg: 24,
        xl:40,
    },
    breakpoints:{
        phone: 0,
        tablet:768
    },
    borderRadii: {
        xs: 4,
        sm: 16,
        md: 24,
        lg: 64,
        hg: 126
    },
    textVariants: {
        defaults: {
           color: 'black',
           fontSize: 16,
        },
        medium:{
            color: 'black',
            fontSize: 20
        },
        pageTitle: {
            color: 'black',
            fontSize:25,
        }
    }
    
})

export type Theme = typeof theme
export default theme