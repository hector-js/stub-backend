/* eslint-disable no-unused-vars */

/**
 * @return {void} retun nothing
 */
function welcome() {
  const hostName = window.location.hostname? window.location.hostname :'localhost';
  const port = window.location.port ? window.location.port : 3005;
  const socket = io.connect(`http://${hostName}:${port}`);
  socket.on('db', (data) => {
    if (data) {
      const htmlJson = syntaxHighlight(JSON.stringify(data, undefined, 2));
      const jsonElement = document.getElementById('json');
      jsonElement.textContent = null;
      jsonElement.innerHTML = htmlJson;
    }
  });
  socket.on('reload', (data) => {
    if (data) {
      window.location.reload(true);
    }
  });
}

/**
 * @param {object} json object
 * @return {object} returns html
 */
function syntaxHighlight(json) {
  if (typeof json != 'string') {
    json = JSON.stringify(json, undefined, 2);
  }
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return json.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      function(match) {
        let cls = 'number';
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'key';
          } else {
            cls = 'string';
          }
        } else if (/true|false/.test(match)) {
          cls = 'boolean';
        } else if (/null/.test(match)) {
          cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
      });
}

/**
 * @param {object} json object
 */
function runTest() {
  const buttonElem = document.getElementById('buttonTest');
  buttonElem.classList.remove('normal');
  buttonElem.classList.remove('green');
  buttonElem.classList.remove('red');
  buttonElem.classList.add('orange');
  buttonElem.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Testing ...';

  const xmlHttp = new XMLHttpRequest();
  const hostName = window.location.hostname? window.location.hostname :'localhost';
  const port = window.location.port ? window.location.port : 3005;
  const protocol = location.protocol ? location.protocol : 'http';
  xmlHttp.open('GET', `${protocol}://${hostName}${port?`:${port}`:''}/_test`);
  xmlHttp.setRequestHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  xmlHttp.setRequestHeader('Pragma', 'no-cache');
  xmlHttp.setRequestHeader('Expires', '0');
  xmlHttp.send();

  xmlHttp.onreadystatechange = () => {
    if (xmlHttp.responseText) {
      const response = JSON.parse(xmlHttp.responseText);
      buttonElem.innerHTML = null;
      buttonElem.classList.remove('orange');
      if (response.status == 'ok') {
        buttonElem.classList.add('green');
        buttonElem.innerHTML = 'OK &#128512;';
      } else if (response.status == 'ko') {
        buttonElem.classList.add('red');
        buttonElem.innerHTML = 'KO &#128551;';
      } else {
        buttonElem.classList.add('normal');
        buttonElem.innerHTML = 'Validate mocks';
      }
    }
  };
}
