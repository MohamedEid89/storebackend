function getInputElement(e){return document.getElementById("digit"+e+"-input")}function moveToNext(e,t){const n=t.which||t.keyCode;1===getInputElement(e).value.length&&(4!==e?getInputElement(e+1).focus():(getInputElement(e).blur(),console.log("submit code"))),8===n&&1!==e&&getInputElement(e-1).focus()}