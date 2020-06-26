//https://core.telegram.org/bots/api
//https://developers.google.com/apps-script/reference/spreadsheet

var TOKEN = "__";
var url = "https://api.telegram.org/bot" + TOKEN + "/";
var webAppURL = "__";
var spreadsheeturl = "___";
var devid = "__";
var categories = [];
var catqty = 0;

var selectedcat = "empty";
var selecteditem = "empty";
var selectedcost = "empty";
  

function setWebhook() {
  var response = UrlFetchApp.fetch(url + "setWebhook?url=" + webAppURL);
  Logger.log(response.getContentText());
}

/*
function getMe() {
var response = UrlFetchApp.fetch(url + "getMe");
Logger.log(response.getContentText());
}
*/




function sendText(id, text) {
  var response = UrlFetchApp.fetch(url + "sendMessage?chat_id=" + id + "&text=" + text);
  //Logger.log(response.getContentText())
}

function sendkeeb(chatId, text, keyBoard) {
  var data = {
    method: "post",
    payload: {
      method: "sendMessage",
      chat_id: String(chatId),
      text: text,
      parse_mode: "HTML",
      reply_markup: JSON.stringify({inline_keyboard: keyBoard})
    }
  };
  UrlFetchApp.fetch(url, data);
}

//obtain all categories available
function getCats() {
  var settingssheet = SpreadsheetApp.openById(spreadsheeturl).getSheetByName("settings");
  var catqty = settingssheet.getRange(2,2).getValue();
  
  var categories = new Array();
  for(var i = 0; i < catqty; i++) {
    categories.push(settingssheet.getRange(2+i,3).getValue());
  }
  
  var keeboard = new Array();
  for(var i = 0; i< catqty; i++) {
    keeboard.push([{"text": categories[i], 'callback_data': categories[i]}]);
  }
  
  sendkeeb(devid, "Available Categories", keeboard);
}





function doPost(e) {

  //parse webapp data
  var contents = JSON.parse(e.postData.contents);
  
  if (contents.callback_query) {
    var id_callback = contents.callback_query.from.id;
    if(JSON.stringify(id_callback) == devid) {
      
      var data = contents.callback_query.data;

//      selectedcat = data;
//      sendText(id_callback, "What was this " + selectedcat + " item?");
//      sendText(devid, selectedcat);
      
    }
    else {
      sendText(uid, "Hello " + name + "! Sorry you do not have the authorization to use this bot");
    }
    
    
  } else if (contents.message) {
    var uid = contents.message.from.id; 
    var text = contents.message.text; 
    var item = text.split("=");
    var firstName = contents.message.from.first_name;
    
    //id checker
    if(JSON.stringify(uid) == devid) 
    {
      //sendText(devid, "error 1 " + text);
      
//      sendText(devid, selecteditem);
      //check if it is a reply to "what Item"
      if(selectedcat != "empty") {
        sendText(devid, "error2");
        selecteditem = text;
        sendText(uid, "How much did " + selecteditem + "cost?");
        sendText(devid, "cat " + selectedcat + ". item " + selecteditem);
      }

      
      
      //check if it was a command key
      // command key = "."
      if(/^./.test(text)){
        var func = text.slice(1).split(" ")[0];
        
        //function #1
        if(func == "help"){
          sendText(uid, "use .log to key in your details. eg; .log food, bak kut teh, $3");         
        }
        
        
        if(func == "cat"){
          getCats();
        }
        
        //function #2
        if(func == "log"){
          
          //sendText(uid, "1");
          
          var input = text.replace(".log ","");
          
          //.log food, chicken wing, $3
          var category = input.split(",")[0];
          var item = input.split(",")[1];
          var cost = input.split(",")[2];
          var spreads = SpreadsheetApp.openById(spreadsheeturl);
          var sheet = spreads.getSheetByName(func) ? spreads.getSheetByName(func) : spreads.insertSheet(func); 
          sheet.appendRow([new Date(), category, item, cost]);
          sendText(uid, item + " has been logged into " + func );  
          
        }
        
      }
    }
    else
    {
      sendText(uid, "Hello " + name + "! Sorry you do not have the authorization to use this bot");
    }
  }
}
