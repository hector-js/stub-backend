/**
 * {void} welcome
 */
function welcome() {
  const Http = new XMLHttpRequest();
  Http.open('GET', 'http://localhost:3005/_json');
  Http.send();
  Http.onreadystatechange = () => {
    if (/^[\],:{}\s]*$/.test(Http.responseText
        .replace(/\\["\\\/bfnrtu]/g, '@')
        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
      const jsonFormat = JSON.parse(Http.responseText);
      document.getElementById('json').innerHTML = JSON.stringify(jsonFormat, undefined, 2);
    } else {
      console.error('json not well format');
    }
  };
}

welcome();
