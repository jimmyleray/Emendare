// Return the browser language
const getBrowserLanguage = () =>
  (navigator.language || navigator.userLanguage)
    .split("")
    .slice(-2)
    .join("");

// Start Elm Application
Elm.Main.init({
  node: document.getElementById("app"),
  flags: {
    language: getBrowserLanguage()
  }
});
