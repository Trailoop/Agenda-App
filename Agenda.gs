/*************************************************************************************************************************************
                                                                AGENDA APP
                                                         Google App Script (GAS)
                                                        Created by Scott Lawrence
                                             Subject Matter Expert - Oracle Project Finance
                                                   Contact: scott.lawrence@aholdusa.com
                                                   
                                                  Deloyed As Web App:http://goo.gl/RQGYi
                                                          Execute As: User
                                                              Access: Ahold.com Domain
                                                   Published Version:63
 
=============================================================================================================================================
 changelog - 12/21/2012 - Version 0.01 - Release of Agenda App.  Automatically create an agenda/meeting minute
                                         document. The app creates a google doc agenda with all the info in your google calendar.
             04/06/2013 - Version 0.02 - v.57 - Addresses enhancement requests 1 and 3.
             04/29/2014 - Version 0.03 - v.65 - Addressed enhancement request 4.
 
 ============================================================================================================================================
 tasks for next release
  1.) Determine development of possible enhancement requests
  2.) Site design
  3.) Use caching to improve speed
  4.) error handling
  5.) pending display
---------------------------------------------------------------------------------------------------------------------------------------------
Bug Reports

Open:

Fixed:

  1.) reported by:wnace@aholdusa.com
      bug reported date: 01/30/2013
      bug description: "When I added rows to the various tables, I just tabbed at the right to get the new row, but the font it defaulted 
      to is always Arial 11, where the existing rows were Arial 9.  I had to select the new row and fix the font each time.  Could it be set 
      up so the new row font is always the same as the row it's inserted after?"
      bug resolution: Updated the document section styles to match existing styles.
      bug resolution date: 01/30/2013
  
----------------------------------------------------------------------------------------------------------------------------------------------  
Enhancements Requests

  1.) Script Properties store links created, and display in tree.  As user creates more agenda added to tree.  Need handler to update ui when creating additional items.


Completed:

  1.) user: wnace@aholdusa.com
      request: "You might want to add a cleanup feature to refresh the display by removing displayed meetings if the user 
      goes back and chooses another date. Otherwise they just accumulate under what's already displayed. I didn't like that, 
      although I suppose it might be useful for someone."
      assignedTo: NA
      priority: High
  2.) user: wnace@aholdusa.com 
      request: "Did you intend not to include the meeting owner in the list of attendees?  Since the owner's name doesn't appear 
      elsewhere I just manually added my name at the end of the list and that was fine, but I wondered if it could be automated."
      assignedTo: NA
      priority:
  3.) user: Casey Conners and Lori Churney. 
      request: Ability to create agenda for all events not just user's scheduled events.
      assignedTo: NA
      priority:
  4.) user: Brian Drury
      request: Ability to use different templates
      assingedTo: me
      priority: High

==============================================================================================================================================
Details for each version release
  
  version 0.01 12/21/2012
  sl notes:   Using a Doc as a template:  https://gist.github.com/1170597
                          Array methods:  https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/map
         

**************************************************************************************************************************************/

//Server Side App Code Invoked by UiApp

//Collects the user's scheduled events
//Arguments:
// - date: the day to collect owned events
//Returns Object of owned and attending events for the day 
function getDaysEvents (date) {
  var defaultCalendar = CalendarApp.getDefaultCalendar();
  var daysEvents = new FacilatorMeetings(defaultCalendar);
  var events = daysEvents.getDaysEvents(date);
  return events;
}


//Creates Agenda gdoc for requested event
//Arguments:
// -  date: date selected from UiApp
// - title: desire meeting title to create agenda gdoc
//Return Object of document details
function getTodaysEvents (date,title,template) {
  var defaultCalendar = CalendarApp.getDefaultCalendar();
  var ownedMeetings = new FacilatorMeetings(defaultCalendar);
  var events = ownedMeetings.getAllEvents(date);
 
  for (var event in events) {  //can be refactored
    if (events[event].title === title) {
    var doc = createDocFromTemplate(events[event],template);
    }
  }
  return doc;
}



function test (){
var test = getDaysEvents("2015-01-29");

Logger.log(test);


}

 
