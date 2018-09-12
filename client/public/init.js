// Get the actual browser language
const language = (navigator.language || navigator.userLanguage)
  .split("")
  .slice(-2)
  .join("");

// Initialize the Elm Application
Elm.Main.init({
  node: document.getElementById("app"),
  flags: { language }
});
