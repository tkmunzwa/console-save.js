##Save JS console output to JSON file

Adds utility methods to capture (and save) console output to a file.

Example:
```JavaScript
console.capture() //start capturing console log/warn/error to buffer
console.log("log1"); //saved to buffer, nothing echoed in browser console
console.error('Level 5 error'); //also saved to buffer
console.dump('mymessages.json'); //downloads file containing log buffer since console.capture() call

console.release() //stop capturing console output and clear buffer
