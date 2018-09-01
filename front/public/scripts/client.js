const getBrowserLanguage = () =>
  (navigator.language || navigator.userLanguage)
    .split("")
    .slice(-2)
    .join("");

const app = Elm.Main.init({
  node: document.getElementById("app"),
  flags: {
    language: getBrowserLanguage()
  }
});
