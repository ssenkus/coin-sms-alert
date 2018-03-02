# coin-sms-alert

A simple cryptocurrency alarm app utilizing Node.js and the Twilio API to send SMS text messages directly to your phone.  Users can create alarms that trigger when cryptocurrency coins cross USD thresholds.

## Installation

Make sure that you have Node.js, npm, and MongoDB installed on your system before you begin.
Clone this repository, then `cd` into the project folder and run `npm install` from your command line to pull down the project dependencies.

## Configuration

This app relies on environmental variables for configuration.  The file `.env.template` will need to be renamed to `.env`, with its contents updated with valid Twilio credentials and phone numbers and a MongoDB connection string.  

## Following Along

If you're following along with my tutorial, you can clone this repository and checkout branches to see the finished project at each step.  Afterward checkout, run `npm install` to add/remove packages required by package.json

### Checkout Steps commands
* *Step 1 - Simple Express App* - `git checkout step-1-simple-express-app; npm install`
* *Step 2 - Retrieving Cryptocurrency Data* - `git checkout step-2-retrieving-cryptocurrency-data; npm install`
* *Step 3 - Simple Alarm* - `git checkout step-3-simple-alarm; npm install`
* *Step 4 - Save Alarm in MongoDB* - `git checkout step-4-save-alarm-mongodb; npm install`
* *Step 5 - Send SMS Alarms* - `git checkout step-5-send-sms-alarms; npm install`
* *Step 6 - Task Scheduling* - `git checkout step-6-task-scheduling; npm install`
* *Step 7 - React.js Coin Dashboard UI* - `git checkout step-7-reactjs-coin-dashboard; npm install`
* *Step 8 - Set Alarms on the Dashboard* - `git checkout step-8-set-alarms-dashboard; npm install`
* *Step 9 - Getting Ready for Production* - `git checkout step-9-getting-ready-for-production; npm install`

