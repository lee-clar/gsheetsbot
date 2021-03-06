# gsheetsbot
A small project to create a Telegram bot that interacts with Google Sheets

This script is run on Google Scripts

## Resources
* [The utilized Google Sheets](https://docs.google.com/spreadsheets/d/1aChvreatc2_in1ZPchH0TAJ1vdyH241BnxPNMLyJZbQ/edit?usp=sharing)

## Current Features

Telegram Bot

* Appending information into gsheets from telegram bot chat
* Extracting information from gsheets to telegram bot chat
* Dynamic Inline Keyboard based on number of items in specified column in gsheets
* Pseudo-chatbot guided-reply system to obtain information from user for logging into the gsheets 
* Ability to click from a Favourites list when logging for items under Food category
* Able to delete the entire chat from both user and Bot after finishing an entry


Google Sheets

* Auto sorting to resemble a *Favourites* function when logging for items under the Food category


## Future Plans
* To Do List that is interactable (whether task is done or not)
* Method to keep private chat clean (either through deletion of messages or editing of inlinekeyboard)
* Retrieval of specific expenditure by category or date
* Expand on other possible uses of Telegram Bot with Google Scripts (focusing on gsheets)

## Images
![Telegram Bot](/images/gsheetsbot.PNG) 

![gsheets](/images/sheetssheets.PNG) 


Refer to gsheets link under *Resources* for more information (ie; scripts in gsheets and layout)

## Acknowledgements/References
* [Wim's Coding YT](https://www.youtube.com/watch?v=24EyItKfm50&t=2s&ab_channel=Wim%27sCodingSecrets)
* [Wim Den Herder](https://www.youtube.com/watch?v=mKSXd_od4Lg)
* [Mars Escobin](https://medium.com/@chutzpah/telegram-inline-keyboards-using-google-app-script-f0a0550fde26)
