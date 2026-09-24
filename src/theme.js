const STORAGE_KEY = 'theme';
const DEFAULT_THEME = 'light';

function getSavedTheme() {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME;
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || DEFAULT_THEME;
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
}

applyTheme(getSavedTheme());

document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.theme-switcher');
    if (button) {
        button.addEventListener('click', toggleTheme);
    }
});