import ru from "antd/es/date-picker/locale/ru_RU";
import ruRU from "antd/es/locale/ru_RU";

export const PRODMODE = false;
// Тянем токен со страницы
export const CSRF_TOKEN = document.querySelector('meta[name="csrf-token"]') ? document.querySelector('meta[name="csrf-token"]').content : null;
export const HTTP_HOST = document.querySelector('meta[name="host"]') ? document.querySelector('meta[name="host"]').content : null;

export const theme_1 = {
    // 1. Use dark algorithm
    components: {
        Input: {
            borderRadiusSM: 6,
            colorTextDisabled: '#f1f1f1',
            hoverBorderColor: '#2c0272',
            activeBorderColor: '#2c0272',
            itemDisabledColor: '#f1f1f1'
        },
        Menu: {
            horizontalItemSelectedColor: '#2c0272',
        },
        Select: {
            borderRadiusSM: 6,
            hoverBorderColor: '#2c0272',
            activeBorderColor: '#2c0272',
        },
        DatePicker: {
            borderRadiusSM: 6,
            borderRadius: 6,
            hoverBorderColor: '#2c0272',
            activeBorderColor: '#2c0272',
        },
        InputNumber: {
/*            colorText: '#253e5d',
            borderRadiusSM: 0,
            colorTextDisabled: '#253e5d',*/
        },
        Table: {
            cellPaddingBlockSM: 5,
            cellMarginBlockSM: 0,
            headerBorderRadius: 0,
            cellFontSizeSM: 11,
            cellPaddingInlineSM: 5,
            rowHoverBg: 'rgba(154,154,154,0.45)',
            borderColor: '#d3d3d3',
            lineWidth: 1,
            headerBg: '#f3f3f3',
            headerHeight: 25
            //headerSplitColor: '#fff',
            //lineHeight: 0
            // fontFamily: 'arial'
        },
        Tooltip: {
            colorBgSpotlight: '#fff',
            colorTextLightSolid: '#1e0d21'
        },
        Tabs: {
            itemSelectedColor: '#2c0272',
            inkBarColor: '#2c0272',
            itemHoverColor: '#2c0272',
            fontSizeSM: 8,
/*            "itemColor": "#7f7f7f",
            "itemHoverColor": "#253e5d",
            "itemActiveColor": "#253e5d",
            "inkBarColor": "#253e5d",
            "itemSelectedColor": "#253e5d",
            "verticalItemPadding": "2px 2px 2px 20px",
            "verticalItemMargin": "5px 10px 0 0"*/
        },
        Pagination: {
            colorPrimary: '#2c0272',
            colorPrimaryHover: '#2c0272',
            itemSizeSM: 18,
            controlHeightSM: 16,
            fontSizeSM: 10,
            marginSM: 5,
            paddingXXS: 5
        },
        Segmented: {

        },
        Checkbox: {
            colorPrimary: '#7c7c7c',
            controlInteractiveSize: 14,
            fontSize: 14
        },
        Button: {
            colorPrimary: '#7c7c7c',
            controlInteractiveSize: 10,
            fontSize: 12
        },
        Timeline: {
            itemPaddingBottom: 1,
            fontSize: 12
        }

    },


}
export const theme_2 =  {
    // 1. Use dark algorithm

    components: {
        Table: {
            cellFontSizeSM: 12,
            headerBorderRadius: 0,
            lineWidth: 1,
            borderColor: '#253e5d52',
            rowHoverBg: '#ccc',
            colorText: '#253e5d',
            cellPaddingBlockSM: 0,
            cellPaddingInlineSM: 2,
            fontSizeSM: 12,
            lineHeight: 2,
        },
        Input: {
            colorTextDisabled: '#00000040',
            inputFontSizeSM: 14,

        },
        InputNumber: {
            inputFontSizeSM: 14
        },
        Select: {
            optionFontSize: 12,
            fontSizeSM: 10,
            paddingSM: 8

        }
    },
}
export const theme_3 =  {
    // 1. Use dark algorithm

    components: {
        Table: {
            cellFontSizeSM: 12,
            headerBorderRadius: 0,
            lineWidth: 0,
            rowHoverBg: '#fff',
            colorText: '#253e5d',
            cellPaddingBlockSM: 0,
            cellPaddingInlineSM: 2,
            fontSizeSM: 12,
            lineHeight: 0,
        },
    },
}
export const theme_4 =  {
    // 1. Use dark algorithm

    components: {
        Table: {
            cellFontSizeSM: 10,
            headerBorderRadius: 0,
            lineWidth: 0,
            rowHoverBg: '#fff',
            colorText: '#253e5d',
            cellPaddingBlockSM: 0,
            cellPaddingInlineSM: 2,
            fontSizeSM: 10,
            lineHeight: 2,
        },
    },
}

const buddhistLocale = {
    ...ru,
    lang: {
        ...ru.lang,
    },
};

export const globalBuddhistLocale = {
    ...ruRU,
    DatePicker: {
        ...ruRU.DatePicker,
        lang: buddhistLocale.lang,
    },
};