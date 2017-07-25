// Adding and removing event listeners
// Remove Click handler after 3 clicks


var button = document.querySelector('.btn');
var count = 0;

//Click handler
function clickHandler(e) {
    count++;
    console.log('clicked')
    if(count >= 3) {
        e.currentTarget.removeEventListener(e.type, clickHandler);
    }
}

button.addEventListener('click', clickHandler);