function setupUser(){
  var folder = DocsList.createFolder("Agenda App Files");
  var folderId = folder.getId();
  var setFolderId = PropertiesService.getUserProperties().setProperty("folderId", folderId);
 
}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}


function initUser () {
  var userProperties = PropertiesService.getUserProperties().getProperties();
  if (isEmpty(userProperties)) {
  setupUser();
  }
  return PropertiesService.getUserProperties();
}


function addFileToCollection () {
  


}


