//Object Contructor customizes default event informing
function Event (event) {
  this.title = event.getTitle();
  this.date = Utilities.formatDate(event.getStartTime(),"America/New_York","MM/dd/yyyy");
  this.startTime = Utilities.formatDate(event.getStartTime(),"America/New_York","h:mm a");
  this.endTime = Utilities.formatDate(event.getEndTime(),"America/New_York","h:mm a");
  this.description = event.getDescription();
  this.where = event.getLocation();
  this.guests = guestList(event);
}

//Helpers
//Collect event guest names from event
//Arguments
// - event: Class CalendarEvent
//Return comma separated string of all the guests names
function guestListString (event) {
  var guests = event.getGuestList(true);
  //Logger.log(guests.map(function(guest){return guest.getName()}));
  var guestNames = guests.map(function(guest){return (guest.getName() == "") ? guest.getEmail() : guest.getName();}); //(guest.getName() == "") ? guest.getEmail() : guest.getName()
  var guestNamesString = guestNames.sort().join(",");
  return guestNamesString;
}

//Collect event guest names from event
//Arguments
// - event: Class CalendarEvent
//Return Array of event guest names
function guestList (event) {
  var guests = event.getGuestList(true);
  //Logger.log(guests.map(function(guest){return guest.getName()}));
  var guestNames = guests.map(function(guest){return (guest.getName() == "") ? guest.getEmail() : guest.getName();});
  return guestNames.sort();
}
