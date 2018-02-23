function doGet() {
  var app = UiApp.createApplication()
  .setTitle("Agenda App");
  
  //var userProperties = initUser();
 
  var html = '<div style="color:DodgerBlue;font-family: Helvetica, Arial, sans-serif;font-size: 36px;font-style: normal;font-weight: bold;'
  + 'text-transform: normal;letter-spacing: -2px;line-height: 0.9em">Agenda App</div>'
  + '<div style="text-indent:40px; position:relative; text-align:left; bottom:80px; line-height:-1em; line-height: 1.45em;color:DimGray">'
  + '<h4>Create an agenda from your calendar events</h4></div>'
  + '<div style="font-size:16px"><h3>Features</h3>'
  + '<p><ul><li>Creates a poplutated meeting agenda google document for any meetings.</li></ul></p>'
  + '<h3>Instructions</h3>'
  + '<p><ul><li>Select a date for which you have a meeting scheduled,</li>'
  + '<li>Meetings are display within categories of <em>Your Meetings</em> and <em>Attending</em>'
  + '<li>Then select the desired meeting, and click <strong>Create Agenda</strong>,</li>'
  + '<li>A link will appear for your newly created agenda document.</li></ul></p></div>';
  
  var feedback = app.createAnchor("feedback", "https://docs.google.com/a/ahold.com/spreadsheet/viewform?formkey=dHRndUNBWDdmUXY2VjZwbWdYN1FKTWc6MQ").setHorizontalAlignment(UiApp.HorizontalAlignment.RIGHT);
  feedback.setStyleAttributes(
    {position:"fixed", left:"-10px", bottom:"0px", height:"20px", width:"100%", background:"DodgerBlue", color:"White", verticalAlign:"text-bottom",fontWeight: "Bold"});
  var footerHtml = ' Created By: Scott Lawrence | for users within Ahold.com domain | version 0.02   ';
  var footer = app.createHTML(footerHtml).setStyleAttributes(
    {position:"fixed", left:"-10px", bottom:"20px", height:"20px", width:"100%", background:"DodgerBlue", color:"White", verticalAlign:"text-bottom"}).setHorizontalAlignment(UiApp.HorizontalAlignment.RIGHT);
  
  var instructions = app.createHTML(html, true);
  var changeHandler = app.createServerHandler("findMeetings");
  var dateLabel = app.createLabel("Meeting Date").setStyleAttributes({fontWeight: "bold",fontSize:"16px",color:"DodgerBlue"});
  var dateBox = app.createDateBox().setName("date").setId("date").setFocus(true).addValueChangeHandler(changeHandler).setTitle("Select a meeting date.");
  var templateLabel = app.createLabel("Select Template").setStyleAttributes({fontWeight: "bold",fontSize:"16px",color:"DodgerBlue"});
  var templateBox = app.createListBox()
                      .addItem("General Template")
                      .addItem("Governance Meetings - L4")
                      .addItem("PMO Template")
                      .addItem("PMO L2 Simplicity")
                      .addItem("PMO L2 Trading")
                      .addItem("PMO L2 People Agenda")
                      .addItem("AUSA EC Template")
                      .setName("templatePicker").setId("templatePicker");
  var dateMessage = app.createLabel("Looks like you have no meetings on this date.").setStyleAttributes({color: "DodgerBlue"}).setVisible(false).setId("dateMessage");
  var meetingBox = app.createListBox().setVisible(false).setName("atitle").setId("atitle");
  var submitHandler = app.createServerHandler("createAgenda");
  var submit = app.createButton("Create Agenda", submitHandler).setVisible(false).setId("button");
  
  
  /*
  //toDo: Tree, add recent 5 items in users folder 
  var tree = app.createTree().setAnimationEnabled(true);
  var topLevel = app.createTreeItem("5 Most Recently Created Agenda's")
  var filesResult = DocsList.getFolderById(userProperties.getProperty("folderId")).getFilesForPaging(5);
  var files = filesResult.getFiles();
    for (var i in files) {
    var link = app.createAnchor(files[i].getName(),files[i].getUrl());
    link.setStyleAttributes({color:"DodgerBlue",fontSize:"16px",textIndent:"20px"});
    app.createTreeItem(link);
    topLevel.addItem(link);
    
    }
  tree.addItem(topLevel);
  */
  
  
  

  
  
  var link = app.createAnchor("Undefined", "http://www.example.com").setVisible(false).setName("link").setId("link");
  
  var grid = app.createGrid(7, 3).setId("grid");
  grid.setWidget(0, 0, templateLabel);
  grid.setWidget(1, 0, templateBox);
  grid.setWidget(2, 0, dateLabel);
  grid.setWidget(3, 0, dateBox).setWidget(1, 1, meetingBox);
  grid.setWidget(4, 0, dateMessage).setWidget(2, 1, submit);
  grid.setWidget(5, 1, link);
  //grid.setWidget(6,0,tree);
  
  var panel = app.createVerticalPanel().setStyleAttributes({position: "relative", left: "50px"});
  panel.add(instructions).add(grid).add(footer).add(feedback);
  
  
  //panel.add(instructions).add(dateLabel).add(dateBox).add(dateMessage).add(meetingBox).add(submit).add(link).add(footer).add(feedback);
  app.add(panel);
  changeHandler.addCallbackElement(panel);
  submitHandler.addCallbackElement(panel);
 
  return app;
}

function findMeetings (e) {
  var app = UiApp.getActiveApplication();
  
  var meetingBox = app.getElementById("atitle").setVisible(false).clear();
  var submit = app.getElementById("button").setVisible(false);
  var link = app.getElementById("link").setVisible(false);
  var dateMessage = app.getElementById("dateMessage").setVisible(false);
  
  var parameter = e.parameter;
  var date = parameter.date;
  var meetings =  getDaysEvents(date);
  var owned = meetings.ownedEvents;
  var attending = meetings.attending;
  
  if (owned.length > 0 || attending.length > 0) {
    var mCount = 0;
    meetingBox.setVisible(true).setName("atitle").setId("atitle").setFocus(true);
    meetingBox.addItem("! Your Meetings !");
    owned.forEach(function(element, index, array){
      if (element.title == "") {meetingBox.addItem("No title");}
      else {meetingBox.addItem(element.title);}
    mCount++});
    if (mCount == 0) {
    meetingBox.removeItem(0);
    }
    meetingBox.addItem("! Attending !");
    attending.forEach(function(element, index, array){
    meetingBox.addItem(element.title);});
    submit.setVisible(true);
  }

  //add display for no meetings for this day
  else {
    dateMessage.setVisible(true);
    return app;}
  return app;
}



function createAgenda(e){
  var app = UiApp.getActiveApplication();
  //var checkUser = initializeUser();
  var link = app.getElementById("link");
  var grid = app.getElementById("grid");
  link.clear();
  var parameter = e.parameter;
  var date = parameter.date;
  var title = parameter.atitle;
  var template = parameter.templatePicker;
  var meeting = getTodaysEvents(date,title,template);
  
  //ToDo:Update Tree with new agenda
  
  link.setText(meeting.title).setHref(meeting.link).setVisible(true).setStyleAttributes({color:"DodgerBlue",fontSize:"16px",textIndent:"20px"});
  grid.setWidget(1,2, link);
  return app;
}