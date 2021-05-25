console.log('[codecommit-ui-extension] Changes page detected');

const params = new URL(document.URL).searchParams;
const [lineNumber, filename] = [params.get('ln'), params.get('fn')];

const timer = lineNumber && filename && window.setInterval(() => {
  if (document.querySelector(`td[data-linenumber="${lineNumber}"]`) === null) { return; }
  clearInterval(timer);
  const filenameHeader = [...document.querySelectorAll('h2.awsui-util-font-size-1')].find(
    header => header.innerText.match(filename)
  );
  if (filenameHeader === undefined) {
    console.log(`[codecommit-ui-extension] No element found for ${filename}`);
    return;
  }
  const container = [...Array(14)].reduce(e => e.parentNode, filenameHeader)
  const targetElem = container.querySelector(`td[data-linenumber="${lineNumber}"]`)
  document.querySelector('.awsui-app-layout__content').scrollBy(0, targetElem.getClientRects()[0].top - 50)
  console.log(`[codecommit-ui-extension] Jumped to the line ${lineNumber} of ${filename}`);
}, 300);
