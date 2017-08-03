$(document).ready(function() {
    // Helper functions
    const isSolved = obj =>
          Object.keys(obj).includes("howto");
    
    const solved = obj => {
        $("#solution").html(obj.howto);
        $("#form").hide();
        $("#solution-container").show();
    };

    const ask = obj => {
        $("#solution-container").hide();
        $("#question").text(obj.question);
        $("#info").text(obj.info);
    };
    
    let current;

    $.get("questions.json", function(data) {
        current = data;
        ask(current);
    }, "json");

    $("#btn-no").on("click", function(event) {
        current = current.no;
        
        if (isSolved(current))
            solved(current);
        else
            ask(current);
    });

    $("#btn-yes").on("click", function(event) {
        current = current.yes;

        if (isSolved(current))
            solved(current);
        else
            ask(current);
    });
});
