var $input = $('#textInput'),
    $results = $('#results');


function getWikipediaSearchResults(term) {
    return Rx.Observable.create((observer) => {
        var url = 'http://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + encodeURIComponent(term) + '&callback=?'
        $.getJSON(url, function(data) {
            observer.next(data[1]);
            observer.complete();
        })
    })
}
// function searchWikipedia (term) {
//     var url = 'http://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + encodeURIComponent(term) + '&callback=?'
//     $.getJSON(url, function(data) {
//         console.log(data)
//     })
//     // return $.ajax({
//     //   url: 'http://en.wikipedia.org/w/api.php',
//     //   dataType: 'jsonp',
//     //   data: {
//     //     action: 'opensearch',
//     //     format: 'json',
//     //     search: term
//     //   }
//     // }).promise();
// }

//getWikipediaSearchResults('google').subscribe((res) => console.log(res))

//var keyUps$ = Rx.Observable.fromEvent($input, "keyup");
var keyPress$ = Rx.Observable.fromEvent($input, "keypress");
//
var searchTermStream$ = keyPress$
                        .debounceTime(250)
                        .filter(e => e.target.value.length > 2)
                        .distinctUntilChanged()
                        .map(e => getWikipediaSearchResults(e.target.value))
                        .switch();

searchTermStream$.subscribe(
    (data) => $results.empty().append ($.map(data, function (v) { return $('<li>').text(v); })),
)

// var responseStream$ = searchTermStream$
//     .do(term => console.log("requesting for: " + term))
//     .flatMap(requestUrl => Rx.Observable.fromPromise(searchWikipedia(requestUrl)))
//     .retry(3);
//
// responseStream$.subscribe(
//     function (data) {
//         $results
//             .empty()
//             .append ($.map(data[1], function (v) { return $('<li>').text(v); }));
//     },
// )

// var responseStream = Rx.Observable.of('posts')
//         .flatMap(requestUrl => fetch('https://jsonplaceholder.typicode.com/posts'))
//         .retry(3);
//
// responseStream
//     .subscribe(
//         (x) => console.log('Next: ' + x),
//     (err) => console.log('Error: ' + err),
//     () => console.log('Completed'));

