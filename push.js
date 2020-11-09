/* eslint-disable no-undef */
const webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BIW1Mv4TmOQJSVa3FQ15MCG31ZY6CIImG-R3oME03EbxPbDeWbVYMAzEEXtxyt0pACsh4FzsY0zwq3uk-vBKdRc",
   "privateKey": "HyD2ah-ZhFgxD33QJg_Uq5sZJKQZab1QzdMbw518R5U"
};
 
 
webPush.setVapidDetails(
   'mailto:thoriq312@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
const pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/eF558Tl2VVQ:APA91bGb0XpHaAXCrkoiMxGT_gjbF7bvvUEVD6CwYSPXoPqDaQs6J1m9InQdEUtaW2oTeOmtKAzUTv0VuallsBXWLxLhP7LmUcZs3zo6xXuTnwubPHZnFFmpzsFKMTEoYxxdeQKOGpB2",
   "keys": {
       "p256dh": "BJjtWivAdq/dIEqUPbjkVtpCJS5y1UGdTilMTSZYFyuCQdJriB4X3krYgR6G4i9bYxXWpPa0NET2fgYsIUzUQYY=",
       "auth": "CeRFhkdbbcSJcJcork4nIQ=="
   }
};
const payload = 'Welcome To Football Application';
 
const options = {
   gcmAPIKey: '562682580655',
   TTL: 60
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
);