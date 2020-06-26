//https://core.telegram.org/bots/api
//https://developers.google.com/apps-script/reference/spreadsheet

var TOKEN = "__";
var url = "https://api.telegram.org/bot" + TOKEN + "/";
var webAppURL = "__";
var spreadsheeturl = "___";
var devid = "__";
var categories = [];
var catqty = 0;
var settingssheet = SpreadsheetApp.openById(spreadsheeturl).getSheetByName("settings");


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


function doTest() {
  sendText(devid, "*test*");
}

//rudimentary method to create a pseudo chatbot
//using checks to see if previous detail haven been filled to accept new inputs
//clear all to reset
function clearitems(){
  var selectedcat = settingssheet.getRange(1,6).setValue("empty");
  var selecteditem = settingssheet.getRange(2,6).setValue("empty");
  var selectedcost = settingssheet.getRange(3,6).setValue("empty");
}


//code to add information directly onto the sheet
function appen( sheet, category, item, cost) {
  
  var spreads = SpreadsheetApp.openById(spreadsheeturl);
  var selectsheet = spreads.getSheetByName(sheet) ? spreads.getSheetByName(sheet) : spreads.insertSheet(sheet); 
  selectsheet.appendRow([new Date(), category, item, cost]);
  
}


//runs when event occurs
function doPost(e) {
  //getRange(y,x)
  var selectedcat = settingssheet.getRange(1,6);
  var selecteditem = settingssheet.getRange(2,6);
  var selectedcost = settingssheet.getRange(3,6);
  
  
  //parse webapp data
  var contents = JSON.parse(e.postData.contents);
  
  if (contents.callback_query) {
    var id_callback = contents.callback_query.from.id;
    if(JSON.stringify(id_callback) == devid) {
      
      var data = contents.callback_query.data;
      
      selectedcat.setValue(data);
      sendText(id_callback, "What was this " + selectedcat.getValue() + " item?");
      //sendText(devid, selectedcat.getValue());
      
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
        
        //alternative method to log with single line input separated by ","
        //        //function #2
        //        if(func == "log"){
        //          
        //          //sendText(uid, "1");
        //          
        //          var input = text.replace(".log ","");
        //          
        //          //.log food, chicken wing, $3
        //          var category = input.split(",")[0];
        //          var item = input.split(",")[1];
        //          var cost = input.split(",")[2];
        //          var spreads = SpreadsheetApp.openById(spreadsheeturl);
        //          var sheet = spreads.getSheetByName(func) ? spreads.getSheetByName(func) : spreads.insertSheet(func); 
        //          sheet.appendRow([new Date(), category, item, cost]);
        //          sendText(uid, item + " has been logged into " + func );  
        //          
        //        }
      }
      
      if(selecteditem.getValue() != "empty") {
        selectedcost.setValue(text);
        sendText(uid, selecteditem.getValue() + " was logged under " + selectedcat.getValue() + " at the cost of " + selecteditem.getValue());
        appen("log", selectedcat.getValue(), selecteditem.getValue(), selectedcost.getValue());
        clearitems();
        
      }
      
      if(selectedcat.getValue() != "empty") {
        selecteditem.setValue(text);
        sendText(uid, "How much did " + selecteditem.getValue() + " cost?");
        
      }
      
      
      
    }
    else
    {
      sendText(uid, "Hello " + name + "! Sorry you do not have the authorization to use this bot");
    }
  }
}
