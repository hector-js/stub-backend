/* eslint-disable no-unused-vars */
/**
 * Excecute this function when html is loaded
 */
function welcome() {
  const socket = io.connect(`http://localhost:${window.location.port ? window.location.port : 3005}`);
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
