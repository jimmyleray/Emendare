// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const platforms = ['chrome', 'electron', 'node']

  for (const versionType of platforms) {
    document.getElementById(`${versionType}-version`).innerText =
      process.versions[versionType]
  }
})
