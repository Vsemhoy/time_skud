export const SKUD_PAGE_THEME_STORAGE_KEY = 'skud_page_theme';

export const SKUD_PAGE_THEMES = {
    CLASSIC: 'classic',
    NEW: 'new',
};

export const getSavedSkudPageTheme = () => {
    if (typeof window === 'undefined') {
        return SKUD_PAGE_THEMES.CLASSIC;
    }

    return window.localStorage.getItem(SKUD_PAGE_THEME_STORAGE_KEY) === SKUD_PAGE_THEMES.NEW
        ? SKUD_PAGE_THEMES.NEW
        : SKUD_PAGE_THEMES.CLASSIC;
};

export const saveSkudPageTheme = (theme) => {
    const nextTheme = theme === SKUD_PAGE_THEMES.NEW
        ? SKUD_PAGE_THEMES.NEW
        : SKUD_PAGE_THEMES.CLASSIC;

    window.localStorage.setItem(SKUD_PAGE_THEME_STORAGE_KEY, nextTheme);
};
