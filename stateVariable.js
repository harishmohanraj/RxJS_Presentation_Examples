// <!DOCTYPE html>
// <html>
// <head>
//   <meta charset="utf-8">
//   <meta name="viewport" content="width=device-width">
//   <title>JS Bin</title>
// </head>
// <body>
//   <button class='btn'>Click Me</button>
// </body>
// </html>

// Pure JS solution

var button = document.querySelector('.btn');
var count = 0;
function handler(e) {
  count++;
  console.log('count:'+count)
  if(count >= 3) {
    e.currentTarget.removeEventListener(e.type, handler);
  }
}

button.addEventListener('click', handler);


// RxJS solution

var button = document.querySelector('.btn');

var buttonClickStream$ = Rx.Observable
                          .fromEvent(button,'click')
                          .map(e => 1)
                          .scan((a,b) => a+b, 0)
                          .take(3)


buttonClickStream$.subscribe((val)=> console.log('count: '+ val))