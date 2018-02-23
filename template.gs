
//Create a google doc from a templated fillin document,
//populating all fillin fields
//Agruments
// - event: custom event class from event.gs
//Return Object with the documents title and location
function createDocFromTemplate(event,template) {
  var templateid = "";
  var templateAhold = "1tKzp4-jZDxe2cW_x42VcO-loqwcOjMibgW1ePVEAX6I"; // get template file id
  var templateIDPMO = "1GkpSK5i_LXkQJAG7EIE3ZEtUoewYtCwDjjDxqFSo4VA";
  var templateIDPMOSimplicity ='14JJUIxuHtAVE6qt5GNTJ8l5SKZ6SYfYxJnYWFjxSbTU';
  var templateIDPMOTrading = '1ykhra-RBIt697aPNjFxTqtctN9kfIWZiYtMm7-FHtE8';
  var templateIDPMOPeopleAgenda ='1xTyoAX8t5C5ubXoB9XLg2wJvYIKHcTvLnbnajAx09ZI';
  var templateGovernanceMeetingsL4 = '1FqDdqmI8vDOKKWa7ZBI0HTgkxtUvT5E9dZ0Je-fK-RU';
  var addAttendance = false;
  var attendanceTable = 2;
  var guests = event.guests;
  
  switch (template) {
  case "General Template":
    templateid = "1tKzp4-jZDxe2cW_x42VcO-loqwcOjMibgW1ePVEAX6I";
    addAttendance = true;
    attendanceTable = 1;
    break;
  case "PMO Template":
    templateid = "1GkpSK5i_LXkQJAG7EIE3ZEtUoewYtCwDjjDxqFSo4VA";
    addAttendance = true;
    attendanceTable = 1;
    break;
  case "Governance Meetings - L4":
    templateid = "1FqDdqmI8vDOKKWa7ZBI0HTgkxtUvT5E9dZ0Je-fK-RU";
    addAttendance = true;
    attendanceTable = 0;
    break;
  case "PMO L2 Simplicity":
    templateid = '14JJUIxuHtAVE6qt5GNTJ8l5SKZ6SYfYxJnYWFjxSbTU';
     addAttendance = false;
     break;
  case "PMO L2 Trading":
    templateid = '1ykhra-RBIt697aPNjFxTqtctN9kfIWZiYtMm7-FHtE8';
    addAttendance = false;
    break;
  case "PMO L2 People Agenda":
    templateid = '1xTyoAX8t5C5ubXoB9XLg2wJvYIKHcTvLnbnajAx09ZI';
    addAttendance = false;
    break;
 case "AUSA EC Template":
    templateid = '1QPef6xqNHSTUN3D7_oWaQgLj5V7FEEl2dvgK6vdi4pw';
    addAttendance = false;
    break;
  default:
    "Something is not working properly"
    break;
}
  
  
  
  
  
  
  
  /*
  
  
  //todo: refactor bad coding
  if (template == "General Template") {
    templateid = "1tKzp4-jZDxe2cW_x42VcO-loqwcOjMibgW1ePVEAX6I";
  }
  
  else {
    templateid = "1GkpSK5i_LXkQJAG7EIE3ZEtUoewYtCwDjjDxqFSo4VA";
  }
  
  */
  
  var rootFolder = DriveApp.getRootFolder();
  var docid = DriveApp.getFileById(templateid).makeCopy(rootFolder).getId();
  
  
  // Todo: move to user preference folder
  
  
  var doc = DocumentApp.openById(docid);
  var docUrl = doc.getUrl();
  
  var body = doc.getActiveSection();
  body.replaceText("%DESCRIPTION%", event.description);
  body.replaceText("%TITLE%", event.title);
  body.replaceText("%DATE%", event.date);
  body.replaceText("%TIME%", event.startTime + " - " + event.endTime);
  body.replaceText("%WHERE%", event.where);
  
 
  var tables = doc.getTables(); // Collect all the documents tables, populate Logistics and Guests tables
  var logistics = tables[0]; //Populate Logistics
  logistics.replaceText("%DATE%", event.date);
  logistics.replaceText("%TIME%", event.startTime + "-" + event.endTime);
  logistics.replaceText("%WHERE%", event.where);
  
  
  if (addAttendance) {
  
    
    var numRow = 1;
    while ( guests.length > (tables[attendanceTable].getNumRows() * 3)) { //Increase the number of rows if needed
      var row = tables[attendanceTable].getRow(0).copy();
      tables[attendanceTable].appendTableRow(row);
      numRow+=1;
    }
  
    var attendees = tables[attendanceTable]; //Populate Guests
    var cell = 0;
    var row = 0;
    var rowPasteCount = 0;
    var rowCellmax = 3
      for (var g = 0; g < guests.length; g++) {
        attendees.getCell(row, cell).setText(guests[g]);
        //Logger.log(row + " : " + cell + " : " + guests[g]);
        cell +=2;
        rowPasteCount +=1;
        if (rowPasteCount > rowCellmax -1) { //go to next row
          row +=1;
          cell = 0;
          rowPasteCount = 0;
        }
      }
  }
  
   
  var header = doc.getHeader();
  header.replaceText("%TITLE%", event.title);
  header.replaceText("%DATE%", event.date);
  header.replaceText("%WHERE%", event.where);
   header.replaceText("%DESCRIPTION%", event.description);
  
  var fileName = "Agenda/Meeting Minutes " + event.title;
  var setName = doc.setName(fileName);
  var docLink = {title:event.title,link:docUrl};
  doc.saveAndClose();
  
  return docLink;
}
