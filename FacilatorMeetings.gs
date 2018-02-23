// Class for a collection of methods for 
// events owned by the default user calendar
function FacilatorMeetings (defaultCalendar) {
  this.defaultCalendar = defaultCalendar;
  
  //Collects default calendar's events and return an object of owned and attending events
  //Arguments:
  // - day: the day to collect owned events
  //Returns Array of owned events for the day 
  this.getDaysEvents = function (day) {
    var events = this.defaultCalendar.getEventsForDay(day);
    var meetings = {};
    meetings.ownedEvents = [];
    meetings.attending = [];
    for (var e in events) {
    var event = new Event(events[e]);
      if (events[e].isOwnedByMe()) {
        meetings.ownedEvents.push(event);
      }
      else {
        meetings.attending.push(event);
      }
    }
    return meetings;
  };
  
  //Collects default calendar's events created by the calendar owner for provided by
  //Arguments:
  // - day: the day to collect owned events
  //Returns Array of attending events for the day 
  this.getAllEvents = function (day) {
    var events = this.defaultCalendar.getEventsForDay(day);
    var attendingEvents = [];
    for (var e in events) {
        var event = new Event(events[e]);
        attendingEvents.push(event);
    }
    return attendingEvents;
  };
  
  
  //Debug Helper
  //Creates HTML list of owner's events from getOwnedEvents
  //Arguments:
  // - day: the day to collect owned events
  //Returns String of owned events for the day 
  this.getOwnedEventsHTML = function (day) {
    var ownedEvents = this.getOwnedEvents(day);
    var html = '<ul style="list-style-type:none">';
    for (var event in ownedEvents) {
      html += getEventDetailsHtml(ownedEvents[event]);
    }
    html += "</ul>";
    return html;
  };
}

//Debug Hepler
function getEventDetailsHtml (event) {
  var html = "";
  for (var property in event) {
    html += "<li>" + property +": " + event[property] + "</li>";   
  }
  html += "<hr/>";
  return html;
}
