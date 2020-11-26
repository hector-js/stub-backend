/* eslint-disable no-unused-vars */

/**
 * @return {void} retun nothing
 */
const listenTerminalEvents = function() {
  const input = document.getElementById('inputTerminal');

  input.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
      const value = event.target.value;
      console.log('value?', value);
      console.log('value.trim()?', value.trim());
      console.log('value.trim().startsWith(hjs)?', value.trim().startsWith('hjs'));
      if (value && value.trim().startsWith('hjs')) {
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.open('GET', `${getUrl()}/_terminal`);
        xmlHttp.setRequestHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        xmlHttp.setRequestHeader('Pragma', 'no-cache');
        xmlHttp.setRequestHeader('Expires', '0');
        xmlHttp.setRequestHeader('command', event.target.value);
        xmlHttp.send();

        xmlHttp.onreadystatechange = () => {
          if (xmlHttp.responseText) {
            const response = JSON.parse(xmlHttp.responseText);
            const jsonElement = document.getElementById('terminalDisplay');
            jsonElement.textContent = null;
            jsonElement.innerHTML = response.content;
          }
        };
        event.preventDefault();
      } else {
        const jsonElement = document.getElementById('terminalDisplay');
        jsonElement.textContent = null;

        const message = `   .------\\ /------.
   |       -       |
   |               |
   |               |       
   |               |     .----------------------------.
_______________________  ¦ Sorry,                     ¦
===========.===========  ¦ You must add a hjs command ¦
  / ~~~~~     ~~~~~ \\    ¦ .--------------------------'
 /|   @ |     |  @  |\\   ¦/    
 W   ---  / \\  ---   W
 \\.      |o o|      ./
  |                 |
  \\    #########    /
   \\  ## .---. ##  /
    \\##         ##/
     \\_____v_____/`;
        jsonElement.innerHTML = message;
      }
    }
  });
};
