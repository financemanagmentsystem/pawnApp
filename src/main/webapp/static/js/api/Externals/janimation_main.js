/**
 * Created by deepakb on 31-Mar-15.
 */

// Create a closure
(function(){
    // Your base, I'm in it!
    var originalAddClassMethod = jQuery.fn.addClass;

    jQuery.fn.addClass = function(){
        // Execute the original method.
        var result = originalAddClassMethod.apply( this, arguments );

        // trigger a custom event
        jQuery(this).trigger('cssClassChanged');

        // return the original result
        return result;
    };
})();

function aResize() {
//    console.log('aResize()');

    var viewportHeight = $(window).height();
    var newheight     = viewportHeight - 108;                      //console.log('newheight = '+newheight);

    $(".accordion3panel").css("height", newheight);               //
    divResize($(".accordion3panel .collapse .panel-body"), 250);
    divResize($(".cm_leftbox"), 105);

    //set height of left column data section if on case manager screen
    if ($(".clientlist").length) {

        endResize($(".clientlist"), 54);
    }

    //set height of left column data section if on client detail screen
    if ($("#client_info").length) {

        endResize($("#client_info"), 21);
    }

    // resize the scrollable tbody sections of various panels
    innerScrollSize();
}



function divResize(selector, intpixels) {
//    console.log('divResize('+selector+', '+intpixels+')');

    var viewportHeight = $(window).height();

    $(selector).css("height", viewportHeight - intpixels);

}



function endResize(selector, intpixels) {
//    console.log('endResize('+selector+', '+intpixels+')');

    if ($(selector).length) {

        var viewportHeight = $(window).height();
        var topOfSection  = $(selector).offset().top;

        divResize(selector, intpixels + topOfSection);
    }
}



function innerScrollSize() {                                                          //console.log('innerScrollSize()');

    $(".scrollContainer").each(function(index,value){

        var scid          = value.id;                                                     //console.log('we found a scrollContainer '+ scid);
        var scrollpadding = $("#"+ scid).attr("scrollpad");                               //console.log('scrollpadding is '+ scrollpadding);

        if (isNaN(scrollpadding)) {                                                       //console.log('bailing from innerScrollSize - scrollpadding isNaN');
            return false;
        }

        var heightOfSection;
        var topOfSection;

        if ($("#"+ scid).hasClass("panel-body")) {

            //   heightOfSection = $("#"+ scid).parents(".panel.panel-default").height();        console.log('heightOfSection for .scrollContainer.panel-body is '+ heightOfSection);
            heightOfSection = $("#"+ scid).parents(".row.row-pm2").height();                //console.log('heightOfSection for .scrollContainer.panel-body is '+ heightOfSection);
            //  heightOfSection = $("#"+ scid).height();                                        console.log('heightOfSection for .scrollContainer.panel-body is '+ heightOfSection);
            topOfSection    = $("#"+ scid).offset().top;                                    //console.log('topOfSection for .scrollContainer.panel-body is '+ topOfSection);

        } else {
            //    heightOfSection = $("#" + scid).parents(".panel.panel-default").height();      //console.log('heightOfSection for .scrollContainer.panel-body is '+ heightOfSection);
            heightOfSection = $("#" + scid).parents(".panel-body").height();                 //console.log('heightOfSection for .scrollContainer somewhere inside .panel-body is '+ heightOfSection);
            topOfSection    = $("#"+ scid).parents(".panel-body").offset().top;             //console.log('topOfSection for .scrollContainer somewhere inside .panel-body is '+ topOfSection);
        }
        //console.log('topOfSection is '+ topOfSection);
        var topOfScrolling  = $("#"+ scid).find(".scrollableSection").offset().top;       //console.log('topOfScrolling is '+ topOfScrolling);
        var headerspace     = topOfScrolling - topOfSection;                              //console.log('headerspace is '+ headerspace);
        var thescrollheight = heightOfSection - headerspace;                              //console.log('thescrollheight is '+ thescrollheight);
        if (headerspace>0) {

            scrollpadding     = parseInt(scrollpadding);

            $("#"+ scid).find(".scrollableSection").css("height",thescrollheight-scrollpadding+"px");
        }
    });
}

function panel_clicked(event) {
//    console.log('panel_clicked()');

    // resize inner scroll height after a delay to allow panels to open & close & resize....
    var wait2size = setTimeout(function(){

            innerScrollSize();

        },
        600
    );
}



function cm_accordion(event) {
//    console.log('cm_accordion()');

    // if the clicked panel is already open - ignore the click... (put message somewhere, or alert?)
    //if ($(event.target).parent().parent().siblings(" .panel-collapse").hasClass("in")) {   console.log('panel is open');
    if ($(event.target).parents().siblings(".panel-collapse").hasClass("in")) {
//        console.log('panel is open');

        event.preventDefault();
        event.stopPropagation();
    }
}



//function slidersResize() {
////    console.log('slidersResize()');
//
//    var slider_ct   = $("div.block_line_item.goal-detail").length;
//
//    if (slider_ct>0) {
//
//        var sliderArr   = [];
//        var blocklen    = $("div.block_line_item.goal-detail:first-child").width();    //console.log('blocklen is '+ blocklen);
//        var slider_ct   = $("div.block_line_item.goal-detail").length;                 //console.log('slider_ct is '+ slider_ct);
//        var slidewide   = blocklen - 325;
//
//        for (i=0; i<slider_ct; i++) {
//
//            var slidernum = i + 1;
//            sliderArr[i]  = $("#slider-"+slidernum).getKendoSlider();
//            sliderArr[i].wrapper.css("width", slidewide+"px");
//            sliderArr[i].resize();
//        }
//    }
//}

//  ----- right column accordion panels functionality for client detail screen -----  //
function gaeAccordion(event) {
//    console.log('a panel_control has been clicked - its class is '+ event.target.className);
    var data={open:3};
    var thehref, the_ref;
    var oneClicked  = false;
    var twoClicked  = false;
    var thrClicked  = false;
    var oneOpen     = false;
    var twoOpen     = false;
    var thrOpen     = false;
    var vportHeight = $(window).height();                       //console.log('vportHeight is '+ vportHeight);
    var tallpanel   = vportHeight - 250;                        //console.log('tallpanel is '+ tallpanel);
    var shortpanel  = vportHeight/2 - 125;                      //console.log('shortpanel is '+ shortpanel);
    //console.log('using vportHeight/2 - 65, shortpanel is '+ shortpanel);
    var targetEl    = $(event.target);

    if (targetEl.is("span")) {                                  //console.log('the clickcame in on a span element');

        thehref = targetEl.parent("a").attr("href");
    } else {

        thehref   = event.target.href;                            //console.log('the clicked element href was '+ thehref);
    }

    the_ref     = thehref.split("#")[1];                        //console.log('the clicked panel was '+ the_ref);

    if (the_ref=="collapseThree") { thrClicked  = true; }
    if (the_ref=="collapseTwo") { twoClicked  = true; }
    if (the_ref=="collapseOne") { oneClicked  = true; }
    if ($("#collapseThree.in").length) { thrOpen = true; }
    if ($("#collapseTwo.in").length) { twoOpen = true; }
    if ($("#collapseOne.in").length) { oneOpen = true; }

    if (oneClicked) {                                           //panel one will automatically toggle from open to closed or vice-versa

//        setTwirly(".twirlygig.twirlyone");

        if (!oneOpen) {                                           //console.log('panel one is being opened');

            if (thrOpen) {
                $('#collapseThree').collapse('hide');
                data.open=1;
            }

            if (twoOpen) {                                          //console.log('panel two was open, now it must get smaller so panel one will fit');

                $("#collapseTwo").css("height", shortpanel);
                $("#collapseTwo .panel-body").css("height", shortpanel);

                var waitingOne  = setTimeout(function(){            //the height on the panel being opened cannot be set until it has been opened

                        $("#collapseOne").css("height", shortpanel);      //console.log('after 400 ms delay');
                        $("#collapseOne .panel-body").css("height", shortpanel);
                    },
                    500
                );
                data.open=4;
            }
            $("#collapseOne .panel-body").css("height", tallpanel);

        } else {                                                  //console.log('panel one is being closed');

            if (twoOpen) {                                          //console.log('panel two was open, now it must get larger to use all the space');

                $("#collapseTwo").css("height", tallpanel);
                $("#collapseTwo .panel-body").css("height", tallpanel);
                data.open=2;
            } else {                                                //console.log('panel two was closed, now panel 3 should open');
                $('#collapseThree').collapse('show');
                data.open=3;
            }
        }
    } else if (twoClicked) {                                    //panel two will automatically toggle from open to closed or vice-versa

        if (!twoOpen) {                                           //console.log('panel two is being opened');

            if (thrOpen) {
                $('#collapseThree').collapse('hide');
                data.open=2;
            }

            if (oneOpen) {                                          //console.log('panel one was open, now it must get smaller so panel two will fit');

                $("#collapseOne").css("height", shortpanel);
                $("#collapseOne .panel-body").css("height", shortpanel);

                var waitingTwo  = setTimeout(function(){              //the height on the panel being opened cannot be set until it has been opened

                        $("#collapseTwo").css("height", shortpanel);        //console.log('after 400 ms delay');
                        $("#collapseTwo .panel-body").css("height", shortpanel);
                    },
                    500
                );
                data.open=4;
            }
            $("#collapseTwo .panel-body").css("height", tallpanel);
        } else {                                                  //console.log('panel two is being closed');

            if (oneOpen) {                                          //console.log('panel one was open, now it must get larger to use all the space');

                $("#collapseOne").css("height", tallpanel);
                $("#collapseOne .panel-body").css("height", tallpanel);
                data.open=1;
            } else {                                                //console.log('panel one was closed, now panel 3 should open');
                $('#collapseThree').collapse('show');
                data.open=2;
            }
        }
    } else {                                                    //three was clicked, so panel three will automatically toggle from open to closed or vice-versa

        if (!thrOpen) {                                           //console.log('panel three is being opened');

            if (oneOpen) {
                $('#collapseOne').collapse('hide');
                data.open=3;
            }
            if (twoOpen) {
                $('#collapseTwo').collapse('hide');
                data.open=3;
            }

        } else {                                                  //console.log('panel three is being closed, panels one & two should open');

            $('#collapseOne').collapse('show');
            $('#collapseTwo').collapse('show');

            var waitingThr  = setTimeout(function(){              //the height on the panel being opened cannot be set until it has been opened

                    $("#collapseOne, #collapseTwo").css("height", shortpanel);        //console.log('after 400 ms delay');
                    $("#collapseOne .panel-body").css("height", shortpanel);
                },
                500
            );
            data.open=4;
        }
    }
    $.ajax({
        url: "/iris/v1/orgs/rememberStateClientDetail",
        data: JSON.stringify(data),
        headers: {
            'request-call':'ajax'
        },
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        success: function (data) {

        }
    });
}


var loggedInUser=0;
var loggedInUserFullName = "";
var organisationName = ""
$.ajax({
    type: "GET",
    async:false,
    headers: {
        'request-call':'ajax'
    },
    url: "/authz/v1/getUser",
    success: function (data,status, xhr) {
        loggedInUser = data.userId;
        loggedInUserFullName = data.name;
        organisationName = data.organisationName;
//        console.log(loggedInUser);
    },
    error: function (data) {
        if(data.status==200){
            loggedInUser = "none";
        }
    }
});

var getBrowserCheck = (function() {
    var ua= navigator.userAgent, tem,
        M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])) {
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome') {
        tem = ua.match(/\bOPR\/(\d+)/);
        if(tem!= null) return 'Opera '+tem[1];
    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    return M.join(' ');
})();


var dataItemWhenDeleteCurrent;
var isDeleteCurrentOccurence = false;
var editCurrentOccurence = false;
var startDateofEditEvent;
var endDateofEditEvent;
var schedulerEvent;
var ifTextAgendaAppntNew = false;
var ifSchedulerEventRefresh = false;
if(!sessionStorage.getViewAppointment) {
    sessionStorage.getViewAppointment = "agenda";
}
var viewOfCalendar = sessionStorage.getViewAppointment;
var workWeek=false;
var week=false;
var agenda=false;
var day=false;
var month=false;
if(viewOfCalendar=="work week") {
    viewOfCalendar="workWeek";
    workWeek=true;
} else if(viewOfCalendar=="week") {
    week=true;
} else if(viewOfCalendar=="month") {
    month=true;
} else if(viewOfCalendar=="day") {
    day=true;
} else if(viewOfCalendar=="agenda") {
    agenda=true;
}





function initScheduler(mob) {
    var dateScheduler = new Date();
    var baseUrl = "";
//    var baseUrl = "";
// Kendo scheduler script
// Use "addEvent" method to pass an object to the scheduler and open the edit window
    if(mob) {
        $(function () {
            $("#scheduler").kendoScheduler({
                date: dateScheduler,
//                mobile: "phone",
//      change: scheduler_change,
                editable: {
                    template: $("#editorIpad").html(),
                    resize: true
                },
                startTime: new Date("2013/6/13 12:00 AM"),
                endTime: new Date("2013/6/13 12:00 AM"),
                workDayStart: new Date("2013/1/1 08:00 AM"),
                workDayEnd: new Date("2013/1/1 07:00 PM"),
                selectable: true,
                height: $("#SchedulerBody").height(),

//Custom Editor Labels
                messages: {
                    editor: {
                        editorTitle: "Appointment",
                        description: "Comments:"
                    },

//Custom Edit dialog labels
                    deleteWindowTitle: "Remove activity",
                    destroy: "Remove",
                    cancel: "Cancel",
                    save: "Schedule Appointment"
                },
                allDayEventTemplate: $("#event-allday-mobile-template").html(),
                views: [
                    "day",
                    { type: "day", showWorkHours: true },
                    { type: "workWeek", eventTemplate: $("#event-workweek-mobile-template").html(), selected:workWeek },
                    { type: "week", eventTemplate: $("#event-week-mobile-template").html(), selected: week },
                    { type: "month", eventTemplate: $("#event-month-mobile-template").html(), selected:month },
                    { type: "day", eventTemplate: $("#event-mobile-template").html(), selected:day },
                    { type: "agenda", eventTemplate: $("#event-agenda-mobile-template").html(), selected:agenda, editable: true }
                ],
//                timezone: "Etc/UTC",
//                change: scheduler_change,

//Bind to an external datasource for persistent data
                dataSource: {
                    batch: true,
                    transport: {
                        read: {
                            url: "/calendar/v1/orgs/users/"+loggedInUser+"/appts",
                            dataType: "json",
                            crossDomain: true,
                            type: "GET"
                        },
                        create: {
                            url: function(options) {
                                return ("/calendar/v1/filter/orgs/user/appts");
                            },
                            type: "POST",
                            crossDomain: true,
                            dataType: "json",
                            contentType: "application/json"
                        },
                        update: {
                            url: function(options) {
                                return ("/calendar/v1/orgs/users/"+loggedInUser+"/appts/"+options.models[0].id);
                            },
                            type: "PUT",
                            dataType: "json",
                            crossDomain: true,
                            contentType: "application/json"
                        },
                        destroy: {
                            url: function(options) {
                                if(HeadersForDelete==null)
                                    return ("/calendar/v1/orgs/users/"+loggedInUser+"/appts/"+options.models[0].id+"/?RecurrenceRule="+"");
                                else
                                    return ("/calendar/v1/orgs/users/"+loggedInUser+"/appts/"+options.models[0].id+"/?RecurrenceRule="+encodeURIComponent(HeadersForDelete));
                            },
                            type: "DELETE",
                            crossDomain: true,
                            dataType: "json",
                            contentType: "application/json"
                        },
                        parameterMap: function (options, operation) {
//                            console.log(operation);
                            if (operation !== "read" && options.models) {
                                if(operation !== "destroy")
                                    return JSON.stringify(options.models);
                                else HeadersForDelete = options.models[0].RecurrenceRule;
                            }
                        }
                    },
//                    sync: function(e) {
//                        this.read();
//                        console.log("sync complete");
//                    },
                    schema: {
                        model: {
                            id: "id",
                            fields: {
                                id: { from: "id" },
                                comments: { from: "comments" },
                                title: { from: "clientId" },
                                clientLastName: { from: "clientLastName" },
                                clientFirstName: { from: "clientFirstName" },
                                start: { type: "date", from: "fromTime" },
                                end: { type: "date", from: "toTime" },
                                goal: {from:"goalId"},
                                goalName: {from:"goalName"},
                                programName: { from:"programName" },
                                program: { from:"programId" },
                                location: { from:"locationId" },
                                locationName: { from:"locationName" },
                                recurrenceRule: { from: "RecurrenceRule" },
                                recurrenceException: { from:"RecurrenceException" },
                                recurrenceId: { from: "RecurrenceID" },
                                isAllDay: { from: "IsAllDay", type: "boolean" },
                                caseManagerName: { from: "caseManagerName"},
                                caseManager: { from: "caseManager"}
                            }
                        }
                    }
                },
                resources: [

                ],
                dataBinding: scheduler_dataBinding,
                navigate: scheduler_navigate,
                move: scheduler_move,
                moveEnd: scheduler_moveEnd,
                resize: scehduler_reSize,
                resizeEnd:scheduler_resizeEnd,
                remove: scheduler_remove,
                dataBound: function (e) {
                    //Removing delete icons and putting edit icons on all appointments.
                    //Trigger click when text appnts created and user is in agenda mode.
                    var scheduler = $("#scheduler").data("kendoScheduler");
                    if(ifTextAgendaAppntNew&&scheduler.view().title.toLowerCase()=="agenda") {
                        ifTextAgendaAppntNew=false;
                        $(".k-view-agenda.k-state-selected").trigger('click');
                    }
                    $(".k-event-delete").remove();
//                    elem.remove();
                    if(!(scheduler=== undefined)) {
                        var view = scheduler.view();
                        sessionStorage.getViewAppointment = view.title.toLowerCase();
                    }
                    if(e.sender._data.length==0&& scheduler.view().title.toLowerCase()=="agenda") {
                        $(".k-scheduler-content").html("<p><span style='display: block; margin: 3vw 0; font-size: 20px; text-align: center; color: lightgrey;'>No Appointments in your agenda</span></p>");
                    }
                    // Code after widget is finished processing everything
                },
                save: scheduler_save,
                edit: scheduler_edit
            });

        });

    }
    else {
        var HeadersForDelete="";
        $(function() {
            $("#scheduler").kendoScheduler({
                date: dateScheduler,
                editable: {
                    template: $("#editor").html(),
                    resize: true
                },
                startTime: new Date("2013/6/13 12:00 AM"),
                endTime: new Date("2013/6/13 12:00 AM"),
                workDayStart: new Date("2013/1/1 08:00 AM"),
                workDayEnd: new Date("2013/1/1 07:00 PM"),
                height: $("#SchedulerBody").height(),

//Custom Editor Labels
                messages: {
                    editor: {
                        editorTitle: "Appointment",
                        description: "Comments:"
                    },

//Custom Edit dialog labels
                    deleteWindowTitle: "Remove activity",
                    destroy: "Remove",
                    cancel: "Cancel",
                    save: "Schedule Appointment"
                },
                allDayEventTemplate: $("#event-allday-template").html(),
                views: [
                    "day",
                    { type: "day", showWorkHours: true },
                    { type: "workWeek", eventTemplate: $("#event-workweek-template").html(), selected:workWeek },
                    { type: "week", eventTemplate: $("#event-week-template").html(), selected: week },
                    { type: "month", eventTemplate: $("#event-month-template").html(), selected:month },
                    { type: "day", eventTemplate: $("#event-template").html(), selected:day },
                    { type: "agenda", eventTemplate: $("#event-agenda-template").html(), selected:agenda, editable: true }
                ],
//                timezone: "Etc/UTC",
//                change: scheduler_change,

//Bind to an external datasource for persistent data
                dataSource: {
                    batch: true,
                    transport: {
                        read: {
                            url: "/calendar/v1/orgs/users/"+loggedInUser+"/appts",
                            dataType: "json",
                            crossDomain: true,
                            type: "GET"
                        },
                        create: {
                            url: function(options) {
                                return ("/calendar/v1/filter/orgs/user/appts");
                            },
                            type: "POST",
                            crossDomain: true,
                            dataType: "json",
                            contentType: "application/json"
                        },
                        update: {
                            url: function(options) {
                                return ("/calendar/v1/orgs/users/"+loggedInUser+"/appts/"+options.models[0].id);
                            },
                            type: "PUT",
                            dataType: "json",
                            crossDomain: true,
                            contentType: "application/json"
                        },
                        destroy: {
                            url: function(options) {
                                if(HeadersForDelete==null)
                                    return ("/calendar/v1/orgs/users/"+loggedInUser+"/appts/"+options.models[0].id+"/?RecurrenceRule="+"");
                                else
                                    return ("/calendar/v1/orgs/users/"+loggedInUser+"/appts/"+options.models[0].id+"/?RecurrenceRule="+encodeURIComponent(HeadersForDelete));
                            },
                            type: "DELETE",
                            crossDomain: true,
                            dataType: "json",
                            contentType: "application/json"
                        },
                        parameterMap: function (options, operation) {
//                            console.log(operation);
                            if (operation !== "read" && options.models) {
                                if(operation !== "destroy")
                                    return JSON.stringify(options.models);
                                else HeadersForDelete = options.models[0].RecurrenceRule;
                            }
                        }
                    },
//                    sync: function(e) {
//                        this.read();
//                        console.log("sync complete");
//                    },
                    schema: {
                        model: {
                            id: "id",
                            fields: {
                                id: { from: "id" },
                                comments: { from: "comments" },
                                title: { from: "clientId" },
                                clientLastName: { from: "clientLastName" },
                                clientFirstName: { from: "clientFirstName" },
                                start: { type: "date", from: "fromTime" },
                                end: { type: "date", from: "toTime" },
                                goal: {from:"goalId"},
                                goalName: {from:"goalName"},
                                programName: { from:"programName" },
                                program: { from:"programId" },
                                location: { from:"locationId" },
                                locationName: { from:"locationName" },
                                recurrenceRule: { from: "RecurrenceRule" },
                                recurrenceException: { from:"RecurrenceException" },
                                recurrenceId: { from: "RecurrenceID" },
                                isAllDay: { from: "IsAllDay", type: "boolean" },
                                caseManagerName: { from: "caseManagerName"},
                                caseManager: { from: "caseManager"}
                            }
                        }
                    }
                },
                resources: [

                ],
                dataBinding: scheduler_dataBinding,
                navigate: scheduler_navigate,
                move: scheduler_move,
                moveEnd: scheduler_moveEnd,
                resize: scehduler_reSize,
                resizeEnd:scheduler_resizeEnd,
                dataBound: scheduler_dataBound,
                save: scheduler_save,
                edit: scheduler_edit,
                remove: scheduler_remove
//        editable: {
                //Allow resizing of event in calendar to change start & end times
//         resize: true
//         }
            });
        });
    }

    function scheduler_remove(e) {
        if(isDeleteCurrentOccurence) {
            e.event.end = new Date(dataItemWhenDeleteCurrent.end);
            e.event.start = new Date(dataItemWhenDeleteCurrent.start);
        }
    }
    function scheduler_move(e) {
        var length1 = 0;
        var start = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
        var end = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
        start.setHours(23);
        start.setMinutes(59);
        start.setSeconds(59);
        end.setHours(23);
        end.setMinutes(59);
        end.setSeconds(59);
//                    console.log("From move Event");
//                    console.log(e);
        if (e.start < start || e.end < end) {
//                        console.log(start);
//                        console.log(this.wrapper.find(".k-event-drag-hint"));
            this.wrapper.find(".k-event-drag-hint").addClass("invalid-slot");
//                        console.log("----------------------------");
        }
        var obj = this;
//                    console.log("from move event" + "Hello");
        e.sender.dataSource._data.forEach(function (appts) {
            length1 = length1 + 1;
            if (e.sender.dataSource._data.length != length1) {
                if (e.start.getTime() == appts.start.getTime() && e.end.getTime() == appts.end.getTime()) {
                    if (e.event.title == appts.title) {
                        if (e.event.program == appts.program) {
                            if (e.event.recurrenceRule == appts.recurrenceRule) {
//                                            console.log("from datasource");
                                obj.wrapper.find(".k-event-drag-hint").addClass("invalid-slot");
                            }
                        }
                    }
                }
            }
        });
        var length = 0;
        e.sender._data.forEach(function (appts) {
            length = length + 1;
            if (e.sender._data.length != length)
                if (e.start.getTime() === appts.start.getTime() && e.end.getTime() === appts.end.getTime())
                    if (e.event.title == appts.title)
                        if (e.event.program == appts.program) {
//                                        console.log("from Data");
                            obj.wrapper.find(".k-event-drag-hint").addClass("invalid-slot");
                        }
        });
    }
    function scheduler_moveEnd(e) {
        var length1=0;
        var start = new Date(new Date().getTime()-24*60*60*1000);
        var end = new Date(new Date().getTime()-24*60*60*1000);
        start.setHours(23);
        start.setMinutes(59);
        start.setSeconds(59);
        end.setHours(23);
        end.setMinutes(59);
        end.setSeconds(59);
//                    console.log("From move End Event");
//                    console.log(e);
        if(e.start < start||e.end < end) {
//                        console.log(start);
            e.preventDefault();
        }

        e.sender.dataSource._data.forEach(function (appts) {
            length1 = length1 + 1;
            if (e.sender.dataSource._data.length != length1) {
                if (e.start.getTime() == appts.start.getTime() && e.end.getTime() == appts.end.getTime()) {
                    if (e.event.title == appts.title) {
                        if (e.event.program == appts.program) {
                            if (e.event.recurrenceRule == appts.recurrenceRule) {
//                                            console.log("from datasource");
                                e.preventDefault();
                            }
                        }
                    }
                }
            }
        });
        var length = 0;
        e.sender._data.forEach(function (appts) {
            length = length + 1;
            if (e.sender._data.length != length)
                if (e.start.getTime() === appts.start.getTime() && e.end.getTime() === appts.end.getTime())
                    if (e.event.title == appts.title)
                        if (e.event.program == appts.program) {
//                                        console.log("from Data");
                            e.preventDefault();
                        }
        });
    }
    function scehduler_reSize(e) {
        var length1 = 0;
        var start = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
        var end = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
        start.setHours(23);
        start.setMinutes(59);
        start.setSeconds(59);
        end.setHours(23);
        end.setMinutes(59);
        end.setSeconds(59);
//                    console.log("From move Event");
//                    console.log(e);
        if (e.start < start || e.end < end) {
//                        console.log(start);
//                        console.log(this.wrapper.find(".k-event-drag-hint"));
            this.wrapper.find(".k-marquee-color").addClass("invalid-slot");
//                        console.log("----------------------------");
        }
        var obj = this;
//                    console.log("from move event" + "Hello");
        e.sender.dataSource._data.forEach(function (appts) {
            length1 = length1 + 1;
            if (e.sender.dataSource._data.length != length1) {
                if (e.start.getTime() == appts.start.getTime() && e.end.getTime() == appts.end.getTime()) {
                    if (e.event.title == appts.title) {
                        if (e.event.program == appts.program) {
                            if (e.event.recurrenceRule == appts.recurrenceRule) {
//                                            console.log("from datasource");
                                obj.wrapper.find(".k-marquee-color").addClass("invalid-slot");
                            }
                        }
                    }
                }
            }
        });
        var length = 0;
        e.sender._data.forEach(function (appts) {
            length = length + 1;
            if (e.sender._data.length != length)
                if (e.start.getTime() === appts.start.getTime() && e.end.getTime() === appts.end.getTime())
                    if (e.event.title == appts.title)
                        if (e.event.program == appts.program) {
//                                        console.log("from Data");
                            obj.wrapper.find(".k-marquee-color").addClass("invalid-slot");
                        }
        });
    }
    function scheduler_resizeEnd(e) {
        var length1=0;
        var start = new Date(new Date().getTime()-24*60*60*1000);
        var end = new Date(new Date().getTime()-24*60*60*1000);
        start.setHours(23);
        start.setMinutes(59);
        start.setSeconds(59);
        end.setHours(23);
        end.setMinutes(59);
        end.setSeconds(59);
//                    console.log("From move End Event");
//                    console.log(e);
        if(e.start < start||e.end < end) {
//                        console.log(start);
            e.preventDefault();
        }

        e.sender.dataSource._data.forEach(function (appts) {
            length1 = length1 + 1;
            if (e.sender.dataSource._data.length != length1) {
                if (e.start.getTime() == appts.start.getTime() && e.end.getTime() == appts.end.getTime()) {
                    if (e.event.title == appts.title) {
                        if (e.event.program == appts.program) {
                            if (e.event.recurrenceRule == appts.recurrenceRule) {
//                                            console.log("from datasource");
                                e.preventDefault();
                            }
                        }
                    }
                }
            }
        });
        var length = 0;
        e.sender._data.forEach(function (appts) {
            length = length + 1;
            if (e.sender._data.length != length)
                if (e.start.getTime() === appts.start.getTime() && e.end.getTime() === appts.end.getTime())
                    if (e.event.title == appts.title)
                        if (e.event.program == appts.program) {
                            e.preventDefault();
                        }
        });
    }
    function scheduler_dataBound(e) {
        $(".k-si-close").addClass('k-i-pencil');
        $(".k-i-pencil").removeClass('k-si-close');

        var scheduler = $("#scheduler").data("kendoScheduler");
        //Trigger click when text appnts created and user is in agenda mode.
        if(ifTextAgendaAppntNew&&scheduler.view().title.toLowerCase()=="agenda") {
            ifTextAgendaAppntNew=false;
            $(".k-view-agenda.k-state-selected").trigger('click');
        }
        if(!(scheduler=== undefined)) {
            var view = scheduler.view();
            sessionStorage.getViewAppointment = view.title.toLowerCase();
        }
        if(e.sender._data.length==0&& scheduler.view().title.toLowerCase()=="agenda") {
            $(".k-scheduler-content").html("<p><span style='display: block; margin: 3vw 0; font-size: 20px; text-align: center; color: lightgrey;'>No Appointments in your agenda</span></p>");
        }
        // Code after widget is finished processing everything
    }
    function scheduler_save(e) {
        var isDefaultPrevented = false;
        hideAllErrorsAppt();
        var scheduler = $("#scheduler").data("kendoScheduler");
        if($("#titleselect").data("kendoDropDownList")!=null) {
            if ($("#titleselect").data("kendoDropDownList").value() == "") {
                hideAllErrorsAppt();
                $("#apptClientRequired").css("display", "block");
                isDefaultPrevented = true;
            } else {
                $("#apptClientRequired").css("display", "none");
            }
        }
        if($("#programselect").data("kendoDropDownList")!=null) {
            if ($("#programselect").data("kendoDropDownList").value() == "") {
                hideAllErrorsAppt();
                $("#apptProgramRequired").css("display", "block");
                isDefaultPrevented = true;
            } else {
                $("#apptProgramRequired").css("display", "none");
            }
        }
        var start = new Date(new Date().getTime()-24*60*60*1000);
        var end = new Date(new Date().getTime()-24*60*60*1000);
        start.setHours(23);
        start.setMinutes(59);
        start.setSeconds(59);
        end.setHours(23);
        end.setMinutes(59);
        end.setSeconds(59);
        if(e.event.start>e.event.end) {
            hideAllErrorsAppt();
            $("#toDateShouldBeLess").css("display","block");
            isDefaultPrevented = true;
        } else {
            $("#toDateShouldBeLess").css("display","none");
        }
        if(e.event.start < start||e.event.end < end) {
            hideAllErrorsAppt();
            $("#previousDateAppt").css("display","block");
            isDefaultPrevented = true;
        } else {
            $("#previousDateAppt").css("display","none");
        }
        if (!(e.event.start instanceof Date)) {
//                        setTimeout(function () {
//                            alert("Invalid Start/From date or Time");
//                        }, 0);
            hideAllErrorsAppt();
            $("#dateErrorMessage_1").css("display","block");
            $("#previousDateAppt").css("display","none");
            isDefaultPrevented = true;
        } else {
            $("#dateErrorMessage_1").css("display","none");
        }
        if (!(e.event.end instanceof Date)) {
//                        setTimeout(function () {
//                            alert("Invalid End/To date or Time");
//                        }, 0);
            hideAllErrorsAppt();
            $("#dateErrorMessage_2").css("display","block");
            $("#previousDateAppt").css("display","none");
            isDefaultPrevented = true;
        }
        else {
            $("#dateErrorMessage_2").css("display","none");
        }
        var length1 = 0;
        if(e.event.id.length==0||e.event.id==null) {
            e.sender.dataSource._data.forEach(function (appts) {
                length1 = length1 + 1;
                if (e.sender.dataSource._data.length != length1) {
                    if (e.event.start.getTime() == appts.start.getTime() && e.event.end.getTime() == appts.end.getTime()) {
                        if (e.event.title == appts.title) {
                            if (e.event.program == appts.program) {
                                if (e.event.recurrenceRule == appts.recurrenceRule) {
                                    $("#previousDateAppt").css("display", "none");
                                    hideAllErrorsAppt();
                                    $("#sameApptCreated").css("display", "block");
                                    isDefaultPrevented = true;
                                }
                            }
                        }
                    }
                }
            });
            var length = 0;
            e.sender._data.forEach(function (appts) {
                length = length + 1;
                if (e.sender._data.length != length)
                    if (e.event.start.getTime() === appts.start.getTime() && e.event.end.getTime() === appts.end.getTime())
                        if (e.event.title == appts.title)
                            if (e.event.program == appts.program) {
                                $("#previousDateAppt").css("display", "none");
                                hideAllErrorsAppt();
                                $("#sameApptCreated").css("display", "block");
                                isDefaultPrevented = true;
                            }
            });
        }
        ifTextAgendaAppntNew = true;
        editCurrentOccurence = false;
        if(isDefaultPrevented) {
            e.preventDefault();
            return;
        }
        $(".k-scheduler-update").hide();
    }
    function scheduler_edit(e) {
        // Having a delete option for edit current occurence
        if(editCurrentOccurence) {
//            scheduler.editEvent(dataItemWhenDeleteCurrent);
            var innerHMTLFooter = $(".k-edit-buttons")[0].innerHTML;
            $(".k-edit-buttons")[0].innerHTML = innerHMTLFooter + "<a class=\"k-button k-scheduler-delete\" href=\"#\">Remove</a>"
        }
        editCurrentOccurence = false;
        isDeleteCurrentOccurence = false;

        var today = new Date();
        var day = today.getDate();
        var month = today.getMonth();
        var year = today.getFullYear();
        //Editing Recurrence Editor
        $("#recurDiv").data("kendoRecurrenceEditor").options.start= e.event.start;

//        minimum date in date time picker
        var datetime = $("#dateTimePickerCalendar1").data("kendoDateTimePicker");
        datetime.min(new Date(year,month,day));
        datetime = $("#dateTimePickerCalendar2").data("kendoDateTimePicker");
        datetime.min(new Date(year,month,day));

        schedulerEvent = e.event;
        startDateofEditEvent = e.event.start;
        endDateofEditEvent = e.event.end;
        if (!(e.event.start instanceof Date)) {
//                        setTimeout(function () {
//                            alert("Invalid From date or Time");
//                        }, 0);
            hideAllErrorsAppt();
            $("#dateErrorMessage_1").css("display","block");
            e.preventDefault();
        }
        if (!(e.event.end instanceof Date)) {
//                        setTimeout(function () {
//                            alert("Invalid From date or Time");
//                        }, 0);
            hideAllErrorsAppt();
            $("#dateErrorMessage_2").css("display","block");
            e.preventDefault();
        }
        $(".k-edit-form-container").css("opacity",0);
        $(".k-edit-form-container").css("z-index",-99);
        var innerHMTLFooter = $(".k-edit-buttons")[0].innerHTML;
        $(".k-edit-buttons")[0].innerHTML = "" +
            "<span id=\"apptClientRequired\" class=\"alert alert-danger\" style=\"background-color: white;float: left; align-content:center; position: absolute; display: none; z-index:2;margin:0 0;\">Select a Client</span>" +
            "<span id=\"apptProgramRequired\" class=\"alert alert-danger\" style=\"background-color: white;float: left; align-content:center; position: absolute; display: none; z-index:2;margin:0 0;\">Select a Program</span>" +
            "<span id=\"apptProgramNotFound\" class=\"alert alert-danger\" style=\"background-color: white;float: left; align-content:center; position: absolute; display: none; z-index:2;margin:0 0;\">No Program found</span>" +
            "<span id=\"dateErrorMessage_1\" class=\"alert alert-danger\" style=\"background-color: white;float: left; position: absolute; display: none; z-index:2;margin:0 0;\">From: DateTime format incorrect</span>" +
            "<span id=\"previousDateAppt\" class=\"alert alert-danger\" style=\"background-color: white;float: left; position: absolute; display: none; z-index:2;margin:0 0;\">Error creating appointment for past Dates</span>" +
            "<span id=\"sameApptCreated\" class=\"alert alert-danger\" style=\"background-color: white;float: left; align-content:center; position: absolute; display: none; z-index:2;margin:0 0;\">Same Appointment cannot be scheduled twice</span>" +
            "<span id=\"dateErrorMessage_2\" class=\"alert alert-danger\" style=\"background-color: white;float: left; position: absolute; display: none; z-index:2;margin:0 0;\">To: DateTime format incorrect</span>" +innerHMTLFooter;
        var spinner = new Spinner().spin(e.container[0]);
        $("#apptsLoggedInUserFullName").html(loggedInUserFullName);
        var clientRemote = [];
        $(function () {
            var count=0;
            var resources = $("#scheduler").data("kendoScheduler").resources;
            $("#titleselect").kendoDropDownList({
                optionLabel: "Select Client",
                dataTextField: "name",
                dataValueField: "id",
                dataSource: {
                    transport: {
                        read: function(options) {
                            var t = [
                                {
                                    "name":"Select Client",
                                    "id":"",
                                    "address":"",
                                    "dob":""
                                }
                            ];
                            clientRemote = t;
                            count++;
                            sortArray(t, "name");
                            if(count==4) {
                                spinner.stop();
                                $(".k-edit-form-container").css("opacity",1);
                                $(".k-edit-form-container").css("z-index","auto");
                            }
                            options.success(t);
                            //$.ajax({
                            //    url: "/iris/v1/getAllClients",
                            //    type: "GET",
                            //    headers: {
                            //        'request-call':'ajax'
                            //    },
                            //    contentType: "application/json",
                            //    async: false,
                            //    success: function (result) {
                            //        clientRemote = result;
                            //        count++;
                            //        sortArray(result, "name");
                            //        if(count==4) {
                            //            spinner.stop();
                            //            $(".k-edit-form-container").css("opacity",1);
                            //            $(".k-edit-form-container").css("z-index","auto");
                            //        }
                            //        options.success(result);
                            //    }
                            //});
                        }
                    }
                }
            });
            console.log(e);
            if(e.event.title != ""){
                $("#titleselect").data("kendoDropDownList").dataSource.add(
                    {
                        "name": e.event.clientLastName+","+ e.event.clientFirstName,
                        "id": e.event.title
                    }
                );
                $("#selectLink").text(e.event.clientLastName+","+ e.event.clientFirstName);
            }
            //$("#titleselect").kendoDropDownList({
            //    optionLabel: "Select Client",
            //    dataTextField: "name",
            //    dataValueField: "id",
            //    dataSource: {
            //        transport: {
            //            read: function(options) {
            //                //var t = [
            //                //    {
            //                //        "name":"Select Client",
            //                //        "id":"",
            //                //        "address":"",
            //                //        "dob":""
            //                //    }
            //                //];
            //                //clientRemote = t;
            //                //count++;
            //                //sortArray(t, "name");
            //                //if(count==4) {
            //                //    spinner.stop();
            //                //    $(".k-edit-form-container").css("opacity",1);
            //                //    $(".k-edit-form-container").css("z-index","auto");
            //                //}
            //                //options.success(t);
            //                $.ajax({
            //                    url: "/calendar/v1/orgs/users/10/appts",
            //                    type: "GET",
            //                    headers: {
            //                        'request-call':'ajax'
            //                    },
            //                    contentType: "application/json",
            //                    async: false,
            //                    success: function (result) {
            //                        clientRemote = result;
            //                        count++;
            //                        if(count==4) {
            //                            spinner.stop();
            //                            $(".k-edit-form-container").css("opacity",1);
            //                            $(".k-edit-form-container").css("z-index","auto");
            //                        }
            //                        var finalResult = [];
            //                        result.forEach(function(ap){
            //                            var t= {
            //                                "name":ap.clientLastName+","+ap.clientFirstName,
            //                                "id":clientId
            //                            }
            //                            finalResult.push(t);
            //                        })
            //                        options.success(finalResult);
            //                    }
            //                });
            //            }
            //        }
            //    }
            //});

//            if(clientRemote.length==0) {
//                hideAllErrorsAppt();
//                $("#noClientsForAppointment").css('display','block');
//                $("#noClientsForAppointment").css('width',$("#scheduler").width());
//                setTimeout(function(){
//                    $('#noClientsForAppointment').hide();
//                }, 5000);
////                $("#noClientsForAppointment").css('width',$("#scheduler").width());
////                jQuery.fn.center = function () {
////                    this.css("position","absolute");
////                    this.css("top","-100px");
////                    this.css("left", (($(window).width() - this.outerWidth()) / 2) + $(window).scrollLeft() + "px");
////                    return this;
////                }
////                $('#noClientsForAppointment').center().delay(300).animate({'top' : '-10px'});
////                setTimeout(function(){
////                    $( "#noClientsForAppointment" ).slideUp( "slow", function() {
////                        // Animation complete.
////                        $('#noClientsForAppointment').hide();
////                    });
////                }, 3000);
//                e.preventDefault();
//            }

            // Programs
            var dropdownlist1 = $("#titleselect").data("kendoDropDownList");
            dropdownlist1.wrapper.hide();
            if(dropdownlist1.value()!=""&&angular.isDefined(dropdownlist1.value())) {
                $("#programselect").kendoDropDownList({
                    optionLabel: "Select Program",
                    valuePrimitive: true,
                    dataTextField: "name",
                    dataValueField: "id",
                    dataSource: {
                        transport: {
                            read: function (options) {
                                $.ajax({
                                    url: "/clients/" + dropdownlist1.value() + "/userAuthPrograms",
                                    type: "GET",
                                    headers: {
                                        'request-call':'ajax'
                                    },
                                    async: false,
                                    contentType: "application/json",
                                    success: function (result) {
                                        sortArray(result, "name");
                                        count++;
                                        if (count == 4) {
                                            spinner.stop();
                                            $(".k-edit-form-container").css("opacity", 1);
                                            $(".k-edit-form-container").css("z-index", "auto");
                                        }
                                        options.success(result);
                                    }
                                });
                            }
                        }
                    }
                });
            } else {
                $("#programselect").kendoDropDownList({
                    optionLabel: "Select Program",
                    valuePrimitive: true,
                    dataTextField: "name",
                    dataValueField: "id",
                    dataSource: []
                });
                count++;
            }
            if($("#programselect").data("kendoDropDownList").dataSource.data().length==0)
                $("#programselect").data("kendoDropDownList").text("Select Program");

            // Goals
            // Programs
            var dropdownlist1 = $("#titleselect").data("kendoDropDownList");
            if(dropdownlist1.value()!=""&&angular.isDefined(dropdownlist1.value())) {
                $("#selectgoals").kendoDropDownList({
                    optionLabel: "Select Goal",
                    valuePrimitive: true,
                    dataTextField: "category",
                    dataValueField: "id",
                    dataSource: {
                        transport: {
                            read: function (options) {
                                $.ajax({
                                    url: "/iris/v1/orgs/clients/" + dropdownlist1.value() + "/goals",
                                    type: "GET",
                                    headers: {
                                        'request-call':'ajax'
                                    },
                                    contentType: "application/json",
                                    async: false,
                                    success: function (result) {
                                        sortArray(result, "category");
                                        count++;
                                        if (count == 4) {
                                            spinner.stop();
                                            $(".k-edit-form-container").css("opacity", 1);
                                            $(".k-edit-form-container").css("z-index", "auto");
                                        }
                                        options.success(result);
                                    }
                                });
                            }
                        }
                    }
                });
            } else {
                $("#selectgoals").kendoDropDownList({
                    optionLabel: "Select Goal",
                    valuePrimitive: true,
                    dataTextField: "category",
                    dataValueField: "id",
                    dataSource: []
                });
                count++;
            }
            if($("#selectgoals").data("kendoDropDownList").dataSource.data().length==0)
                $("#selectgoals").data("kendoDropDownList").text("Select Goal");

            // Locations
            $("#locationselect").kendoDropDownList({
                optionLabel: "Select Location",
                valuePrimitive: true,
                dataTextField: "address1",
                dataValueField: "id",
                dataSource: {
                    transport: {
                        read: function(options) {
                            $.ajax({
                                url: "/iris/v1/orgs/getfacility",
                                type: "GET",
                                headers: {
                                    'request-call':'ajax'
                                },
                                contentType: "application/json",
                                async: false,
                                success: function (result) {
                                    count++;
                                    sortArray(result, "address1");
                                    if(count==4) {
                                        spinner.stop();
                                        $(".k-edit-form-container").css("opacity",1);
                                        $(".k-edit-form-container").css("z-index","auto");
                                    }
                                    options.success(result);
                                }
                            });
                        }
                    }
                }
            });
            if($("#locationselect").data("kendoDropDownList").dataSource.data().length==0)
                $("#locationselect").data("kendoDropDownList").text("Select Location");
        });
    }
    function scheduler_dataBinding(e) {
        $(function () {
            $("[data-toggle='tooltip']").tooltip();
        });
    }
    function scheduler_navigate(e) {
        if(e.action.toLowerCase()=="today") {
            $("li.k-nav-today").css("background-color","#7eb9e5");
        } else $("li.k-nav-today").css("background-color","white");

        if(angular.isUndefined(e.sender._data)||(e.sender._data.length==0&& e.view.toLowerCase()=="agenda")){
            $(".k-scheduler-content").html("<p><span style='display: block; margin: 3vw 0; font-size: 20px; text-align: center; color: lightgrey;'>No Appointments in your agenda</span></p>");
        }
        $(function () {
            $("[data-toggle='tooltip']").tooltip();
        });
    }
}

function sortArray (result, sortingValue) {
    result.sort(function(a, b){
        var nameA=a[sortingValue].toLowerCase(), nameB=b[sortingValue].toLowerCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
}

function hideAllErrorsAppt() {
    $("apptClientRequired").css('display', 'none');
    $("apptProgramRequired").css('display', 'none');
    $("apptProgramNotFound").css('display', 'none');
    $("dateErrorMessage_1").css('display', 'none');
    $("previousDateAppt").css('display', 'none');
    $("sameApptCreated").css('display', 'none');
    $("dateErrorMessage_2").css('display', 'none');
}


function clientChangAppt() {
    var dropdownlist1 = $("#titleselect").data("kendoDropDownList");
    if(dropdownlist1.value()=="")
        return ;
    $("#selectgoals").kendoDropDownList({
        optionLabel: "Select Goal",
        valuePrimitive: true,
        dataTextField: "category",
        dataValueField: "id",
        dataSource: {
            transport: {
                read: function(options) {
                    $.ajax({
                        url: "/iris/v1/orgs/clients/"+dropdownlist1.value()+"/goals",
                        type: "GET",
                        headers: {
                            'request-call':'ajax'
                        },
                        contentType: "application/json",
                        success: function (result) {
                            sortArray(result, "category");
                            options.success(result);
                        }
                    });
                }
            }
        }
    });
    var programSelect=[];
    $("#programselect").kendoDropDownList({
        optionLabel: "Select Program",
        valuePrimitive: true,
        dataTextField: "name",
        dataValueField: "id",
        dataSource: {
            transport: {
                read: function(options) {
                    $.ajax({
                        url:  "/clients/"+dropdownlist1.value()+"/userAuthPrograms",
                        type: "GET",
                        headers: {
                            'request-call':'ajax'
                        },
                        async: false,
                        contentType: "application/json",
                        success: function (result) {
                            sortArray(result, "name");
                            programSelect = result;
                            options.success(result);
                        }
                    });
                }
            }
        }
    });
    if(programSelect.length==0) {
        $("#programselect").data("kendoDropDownList").text("Select Program");
        hideAllErrorsAppt();
        $("#apptProgramNotFound").css('display','block');
    }
}

function changeInApptClient() {
    if($("#titleselect").data("kendoDropDownList")!=null) {
        if ($("#titleselect").data("kendoDropDownList").value() != "") {
            $("#apptClientRequired").css('display','none');
        }
    }
}

function changeInApptProgram() {
    if($("#programselect").data("kendoDropDownList")!=null) {
        if ($("#programselect").data("kendoDropDownList").value() != "") {
            $("#apptProgramRequired").css('display','none');
        }
    }
}

function openModalSelectClient(){
    angular.element(document.getElementById('cm_referrals')).scope().openModalSelectClient();
}

function checkDateSchedulerEditor(value,id) {
    hideAllErrorsAppt();
    // Making to Date 30 minutes aftert he From date - IRIS-1111
    if(id==1) {
        var dummyStartDate = new Date(value);
        var dummyEndDate = new Date(dummyStartDate.getTime() + 30*60*1000);
        $("#dateTimePickerCalendar2").data("kendoDateTimePicker").value(dummyEndDate);
        schedulerEvent.start = dummyStartDate;
        schedulerEvent.end = dummyEndDate;
    }

    // Checking if to date is less than from date
    if(new Date($("#dateTimePickerCalendar1").data("kendoDateTimePicker").value())>
        new Date($("#dateTimePickerCalendar2").data("kendoDateTimePicker").value())) {
        $("#toDateShouldBeLess").css("display", "block");
    }
    var d = new Date(value);
    var start = new Date(new Date().getTime()-24*60*60*1000);
    start.setHours(23);
    start.setMinutes(59);
    start.setSeconds(59);
    if(!d<start) {
        $("#previousDateAppt").css("display","none");
    }
    if ( Object.prototype.toString.call(d) === "[object Date]" ) {
        // it is a date
        if ( isNaN( d.getTime() ) ) {  // d.valueOf() could also work
            hideAllErrorsAppt();
            $("#dateErrorMessage_"+id).css("display","block"); // date is not valid
        }
        else {
            $("#dateErrorMessage_"+id).css("display","none");
            // date is valid
        }
    }

//
//    $("#dateTimePickerCalendar"+id).data("kendoDateTimePicker").bind("change", function() {
//        this.value(value);
//        console.log(value); //value is the selected date in the datetimepicker
//    });

}
function alldayClicked(ticked) {
    if(!ticked) {
        schedulerEvent.start = startDateofEditEvent;
        schedulerEvent.end = endDateofEditEvent;
        $("#dateTimePickerCalendar1").data("kendoDateTimePicker").value(startDateofEditEvent);
        $("#dateTimePickerCalendar2").data("kendoDateTimePicker").value(endDateofEditEvent);
    }
    else {
        var startString = startDateofEditEvent.getFullYear()+"/"+(startDateofEditEvent.getMonth()+1)+"/"+startDateofEditEvent.getDate();
        var endString = endDateofEditEvent.getFullYear()+"/"+(endDateofEditEvent.getMonth()+1)+"/"+endDateofEditEvent.getDate();
        $("#dateTimePickerCalendar1").data("kendoDateTimePicker").value(new Date(startString));
        $("#dateTimePickerCalendar2").data("kendoDateTimePicker").value(new Date(endString));
        schedulerEvent.start = new Date(startString);
        schedulerEvent.end = new Date(endString);
    }
}

function createNewAppointmentFromText() {
    ifSchedulerEventRefresh = false;
    if(!$("#appointmentButton").hasClass('open')) {
        ifSchedulerEventRefresh = true;
    }
    var schedulerAdd = $("#scheduler").data("kendoScheduler");
    var calendarDate = new Date();
    if(schedulerAdd.view().title.toLowerCase()=="day") {
        calendarDate = new Date(schedulerAdd.view()._endDate);
    }
    var startTime = new Date();
    startTime.setDate(calendarDate.getDate());
    startTime.setMonth(calendarDate.getMonth());
    startTime.setYear(calendarDate.getFullYear());
    startTime.setSeconds(0);
    if(new Date().getMinutes()>30) {
        var hours = startTime.getHours();
        startTime.setMinutes(0);
        startTime.setHours(hours+1);
    }
    else if (new Date().getMinutes()<30){
        startTime.setMinutes(30);
    }
    schedulerAdd.addEvent({start: startTime, end: new Date(startTime.getTime()+30*60*1000)});
}

var mob=null;
if(navigator.userAgent.match(/iPhone|iPad|iPod/i)) { //Checking if Ipad/Iphone
    mob = 1;
}

