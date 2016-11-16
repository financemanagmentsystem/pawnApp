/**
 * Created by rishi on 28/9/14.
 */
function lastMonthDate() {
    var today = new Date();
    var oneMonthEarlier = new Date();
    oneMonthEarlier.setMonth(today.getMonth()-1);
    return oneMonthEarlier;
}

//function nextDay(date) {
//    var date = new Date(date);
//    var tomorrow = new Date();
//    tomorrow.setDate(date.getDate());
//    return tomorrow;
//}

function firstOfEveryYear() {
    var firstJanOfYear= new Date();
    firstJanOfYear.setMonth(0);
    firstJanOfYear.setDate(1);
    return firstJanOfYear;
}

Date.prototype.mmddyyy = function() {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth()+1).toString();
    var dd  = this.getDate().toString();
    return (mm[1]?mm:"0"+mm[0]) + '/' + (dd[1]?dd:"0"+dd[0]) + '/' + yyyy;
};

/**
 * This wiill adjust the user's date object according to the timezone
 * @returns {Date}
 */
Date.prototype.timeZoneDate=function(){
    return new Date(this.getTime() + this.getTimezoneOffset()*60*1000 );
}



