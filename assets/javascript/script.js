
$("#submitBtn").on("click", function(event){
    event.preventDefault();
    $("#articleBox").empty();
    
    // take input from forms
    var searchTerm = $("#searchTerm").val();
    var limit = $("#resultLength").val();
    var start = $("#startYear").val();
    var end = $("#endYear").val();
    
    // for edge case with no input in resultLength 
    if(!limit){
        limit=10;
    }
  
    // Urls for different situations of date boundary input
    var url = "";
    var urlBoth = "https://api.nytimes.com/svc/search/v2/articlesearch.json?fq="
    +searchTerm+"&begin_date="+start+"0101&end_date="+end+"0101&api-key=4f3b87ebf5b24f85ab9eba9ab5f59cc1";
    var urlStart= "https://api.nytimes.com/svc/search/v2/articlesearch.json?fq="
    +searchTerm+"&begin_date="+start+"0101&api-key=4f3b87ebf5b24f85ab9eba9ab5f59cc1";
    var urlEnd= "https://api.nytimes.com/svc/search/v2/articlesearch.json?fq="
    +searchTerm+"&end_date="+end+"0101&api-key=4f3b87ebf5b24f85ab9eba9ab5f59cc1";
    var urlNeither= "https://api.nytimes.com/svc/search/v2/articlesearch.json?fq="
    +searchTerm+"&api-key=4f3b87ebf5b24f85ab9eba9ab5f59cc1";
    
    // conditional to prevent error if one or both years aren't input
    if (start===""&&end===""){
        url = urlNeither;
    } else if (start===""){
        url = urlEnd;
    } else if (end===""){
        url = urlStart;
    } else {
        url = urlBoth;
    }
    $.ajax({
        url: url,
        method: 'GET',
    }).then(function(response) {
        // after promise, retreive information and append it to the article box div

        for (var i=0;i<limit;i++){
        var title = $("<h3>").text(response.response.docs[i].headline.main);
        var articleURL = $("<a>").attr("href", response.response.docs[i].web_url).append(title);
        var snippet = $("<p>").text(response.response.docs[i].snippet);
        var pubDate = $("<p>").html("<b>Published in "+response.response.docs[i].pub_date.slice(0,4)+"</b>");
        var lineBreak = $("<div>").addClass("lineBreak");
        $("#articleBox").append(articleURL,snippet,pubDate,lineBreak);
        }
    });
});