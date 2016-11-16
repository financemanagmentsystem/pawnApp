function underlay(action) {
//    console.log('underlay('+action+')');
    if (action=="show") {

        $(".modal-backdrop.fade").css("display", "block");
        $(".modal-backdrop.fade").addClass("in");

    } else {

        $(".modal-backdrop.fade").removeClass("in");

        var waitunderlay = setTimeout(function(){

                $(".modal-backdrop.fade").css("display", "none");
            },
            550
        );
    }
}

// Take care of Modals templates
var modalLoader = (function($,host) {
    //Loads external templates from path and injects in to page DOM
    return {
        //Method: loadExtTemplate
        //Params: (string) path: the relative path to a file that contains template definition(s)
        loadExtModal: function (path) {
            //Use jQuery Ajax to fetch the template file
            var tmplLoader = $.ajax({
                url: path,
                async: false,
                headers: {
                    'request-call':'ajax'
                },
                success: function (result) {
                    //On success, Add templates to DOM (assumes file only has template definitions)
                    $("body").append(result);
                },
                error: function (result) {
                    alert("Error Loading Templates -- TODO: Better Error Handling");
                }
            });
        }
    };
})(jQuery, document);