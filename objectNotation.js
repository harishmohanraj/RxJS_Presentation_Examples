console.clear();

function subscribe(observer) {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.next(4);

}

var observer = {
  next: (x) => console.log(x),
  error: (err) => console.log(err),
  complete: () => console.log('done')
};

// Calling Create operator is same as calling the constructor method of the observable type

//var observableStream$ = Rx.Observable.create(subscribe);
var observableStream$ = new Rx.Observable(subscribe);

subscribe(observer)