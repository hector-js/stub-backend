/**
 * Excecute this function when html is loaded
 */
function welcome() {
  const Http = new XMLHttpRequest();
  Http.open('GET', 'http://localhost:3005/_json');
  Http.send();
  Http.onreadystatechange = () => {
    if (Http.responseText) {
      if (/^[\],:{}\s]*$/.test(Http.responseText
          .replace(/\\["\\\/bfnrtu]/g, '@')
          .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
          .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
        const jsonFormat = JSON.parse(Http.responseText);
        const htmlJson = syntaxHighlight(JSON.stringify(jsonFormat, undefined, 2));
        document.getElementById('json').innerHTML = htmlJson;
      } else {
        console.error('json not well format');
      }
    }
  };
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

welcome();
