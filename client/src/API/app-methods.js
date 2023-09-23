const Telegram = window.Telegram;

export const getTheme = () => {
  return Telegram?.WebApp.themeParams;
};
