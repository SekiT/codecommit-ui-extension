window.setInterval(() => {
  [...document.querySelectorAll('a')].forEach((elem) => {
    const match = elem.innerText.match(/\/[a-f0-9]{40}/)
    if (match) {
      elem.innerText = match[0].substr(1, 8)
    }
  })
}, 300)
