// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const platforms = ['chrome', 'electron', 'node']

  platforms.forEach(platform => {
    document.getElementById(`${platform}-version`).innerText =
      process.versions[platform]
  })
})
