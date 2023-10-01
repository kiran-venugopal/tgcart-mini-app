export const onMainButtonClick = (callback) => {
  Telegram.WebApp.onEvent("mainButtonClicked", callback);
};
