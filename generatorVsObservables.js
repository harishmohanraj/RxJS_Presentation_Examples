console.clear();
// Observable
// PUSH
var observableStream$ = Rx.Observable.create((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.next(4);
  setTimeout(()=>subscriber.next(5), 1000)
})

observableStream$.subscribe((x) => console.log(x))

// Generator function (Iterator pattern)
// PULL

function* generator() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
}

const iterator = generator();

console.log(iterator.next().value)
console.log(iterator.next().value)
console.log(iterator.next().value)
console.log(iterator.next().value)
console.log(iterator.next().value)