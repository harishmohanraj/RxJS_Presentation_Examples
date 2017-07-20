console.clear();

var observableStream$ = Rx.Observable.create((subscriber) => {
  var id = setInterval(() => {
    subscriber.next('next value')
  }, 1000);
  return function unsubscribe() {
    clearInterval(id);
  }
})

var subscription = observableStream$.subscribe({
  next: (x) => console.log(x),
  error: (err) => console.log(err),
  complete: () => console.log('complete')
})

setTimeout(() => {
  // Unsubscribing to Observable after 4500 ms
  subscription.unsubscribe()
}, 4500)
