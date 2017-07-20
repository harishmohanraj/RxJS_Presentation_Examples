var container = document.querySelector('.cnt');

var offsetX = parseInt(container.offsetLeft+30),
    offsetY = parseInt(container.offsetTop+30);


var mouseDowns = Rx.Observable.fromEvent(container, "mousedown");
var mouseUps = Rx.Observable.fromEvent(container, "mouseup");
var mouseMoves = Rx.Observable.fromEvent(container, "mousemove");

var dragStream$ = mouseDowns
                    .map(() => mouseMoves.takeUntil(mouseUps)) //[[mouseMove],[mouseMove],[mouseMove]]
                    .concatAll(); //[mouseMove,mouseMove,mouseMove]



dragStream$.subscribe({
  next: (pos)=> {
    container.style.left = pos.x - offsetX + "px";
    container.style.top = pos.y - offsetY + "px";
  },
  error: (err) => console.log(err),
  complete: () => console.log('complete')
});