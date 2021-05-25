const textPattern = /Comment on line (\d+) of (.*)/;

console.log('[codecommit-ui-extension] Activity page detected');

const timer = window.setInterval(() => {
  const filenameHeaders = [...document.querySelectorAll('.awsui-util-font-size-1')];
  if (filenameHeaders.length === 0) { return; }
  clearInterval(timer);
  filenameHeaders.forEach(header => {
    const matchResult = textPattern.exec(header.innerText);
    if (!matchResult) { return; }
    const [_, lineNumber, filename] = matchResult;
    const a = document.createElement('a');
    a.href = `./changes?ln=${lineNumber}&fn=${filename}`;
    a.innerText = header.innerText;
    header.removeChild(header.firstChild);
    header.append(a);
  });
  console.log('[codecommit-ui-extension] Placed links to changes page');
}, 300);
