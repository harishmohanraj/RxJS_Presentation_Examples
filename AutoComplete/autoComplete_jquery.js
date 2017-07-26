(function($, global) {

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

    function doneHandler(data) {
        $results.empty().append ($.map(data[1], function (v) { return $('<li>').text(v); }))
    }

    function doneHandler(data) {
        $results.empty().append ($.map(data[1], function (v) { return $('<li>').text(v); }));
    }

    function keyPressHandler(e) {
        var value = e.target.value;
        searchWikipedia(value)
            .done(doneHandler)
    }

    $(document).ready(function() {
        $input.keyup(keyPressHandler);
    })
})(jQuery, window)