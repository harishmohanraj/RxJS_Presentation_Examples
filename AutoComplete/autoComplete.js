var $input = $('#textInput'),
    $results = $('#results');


function searchWikipedia (term) {
    return $.ajax({
      url: 'http://en.wikipedia.org/w/api.php',
      dataType: 'jsonp',
      data: {
        action: 'opensearch',
        format: 'json',
        search: term
      }
    }).promise();
}

var keyUps$ = Rx.Observable.fromEvent($input, "keyup");
var keyPress$ = Rx.Observable.fromEvent($input, "keypress");

var searchTermStream$ = keyUps$
                    .map(e => e.target.value)
                    .filter(val => val.length > 2)
                    .debounceTime(750)
                    .distinctUntilChanged();

var responseStream$ = searchTermStream$
    .do(term => console.log("requesting for: " + term))
    .switchMap(requestUrl => Rx.Observable.fromPromise(searchWikipedia(requestUrl)))
    .retry(3);

responseStream$.subscribe(
    function (data) {
        $results
            .empty()
            .append ($.map(data[1], function (v) { return $('<li>').text(v); }));
    },
)