
$(insert button here).on("click", function(){
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    queryURL += '?' + $.param({
        'api-key': "26f30e7b925b498680e5359d7c5627a5"
    });
    $.ajax({
        url: url,
        method: 'GET',
    }).then(function(response) {
        console.log(response);
    }).fail(function(err) {
        throw err;
    });



    
});