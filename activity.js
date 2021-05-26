const textPatternEn = /Comment on line (?<lineNumber>\d+) of (?<filename>.*)/;
const textPatternJa = /(?<filename>.*)の (?<lineNumber>\d+) 行目についてコメントする/;

console.log('[codecommit-ui-extension] Activity page detected');

const timer = window.setInterval(() => {
  const filenameHeaders = [...document.querySelectorAll('.awsui-util-font-size-1')];
  if (filenameHeaders.length === 0) { return; }
  clearInterval(timer);
  filenameHeaders.forEach(header => {
    const matchResult = textPatternEn.exec(header.innerText) || textPatternJa.exec(header.innerText);
    if (!matchResult) { return; }
    const { groups: { lineNumber, filename } } = matchResult;
    const a = document.createElement('a');
    a.href = `./changes?ln=${lineNumber}&fn=${filename}`;
    a.innerText = header.innerText;
    header.removeChild(header.firstChild);
    header.append(a);
  });
  console.log('[codecommit-ui-extension] Placed links to changes page');
}, 300);
