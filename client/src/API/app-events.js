

export const onThemeChange = (callback) => {
    Telegram.WebApp.onEvent("themeChanged",callback)
}