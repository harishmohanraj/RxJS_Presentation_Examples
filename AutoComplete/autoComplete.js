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

var keyUp$ = Rx.Observable.fromEvent($input, "keyup");

var searchTermStream$ = keyUp$
                        .debounceTime(250)
                        .map(e => e.target.value)
                        .filter(val => val.length > 2)
                        .distinctUntilChanged()
                        .switchMap(val => getWikipediaSearchResults(val));

searchTermStream$.subscribe(
    (data) => $results.empty().append ($.map(data, function (v) { return $('<li>').text(v); }))
)
