"use strict"

//selector function - REMOVE IF USING JQUERY
// input x must be string containing a CSS selector
// always return an array (list) even if only 1 item


/* ----------------------------------------------------------------------------------------
 Error catching and display
 voir https://developer.mozilla.org/en/docs/Web/API/GlobalEventHandlers/onerror
*/
window.onerror = function (msg, url, lineNo, columnNo, error) {

    // check if error originates from a JavaScript file served from a
    // different origin (different domain)
    // in this case the message is only 'Script error.'
    var string = msg.toLowerCase();
    var substring = "script error";
    if (string.indexOf(substring) > -1) {
        alert('Script Error in file from a different domain. See console for Detail');
    } else {
        var message = [
            'JAVASCRIPT ERROR! LOOK AT THE CONSOLE NOW !' + msg,
            'URL: ' + url,
            'Line: ' + lineNo,
            'Column: ' + columnNo,
            'Error object: ' + JSON.stringify(error)
        ].join(' - ');

        alert(message);
    }
    return false;
};