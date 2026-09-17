export const SKUD_PAGE_THEME_STORAGE_KEY = 'skud_page_theme';

export const SKUD_PAGE_THEMES = {
    CLASSIC: 'classic',
    NEW: 'new',
    MODERN: 'modern',
};

export const getSavedSkudPageTheme = () => {
    if (typeof window === 'undefined') {
        return SKUD_PAGE_THEMES.CLASSIC;
    }

    const savedTheme = window.localStorage.getItem(SKUD_PAGE_THEME_STORAGE_KEY);
    return Object.values(SKUD_PAGE_THEMES).includes(savedTheme)
        ? savedTheme : SKUD_PAGE_THEMES.CLASSIC;
};

export const saveSkudPageTheme = (theme) => {
    const nextTheme = Object.values(SKUD_PAGE_THEMES).includes(theme)
        ? theme
        : SKUD_PAGE_THEMES.CLASSIC;

    window.localStorage.setItem(SKUD_PAGE_THEME_STORAGE_KEY, nextTheme);
};
