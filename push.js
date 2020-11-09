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
   "endpoint": "https://fcm.googleapis.com/fcm/send/fmRUWif3l18:APA91bHTJC7_ePcJ716UM3jUUaQL0ZQ-QO42EmLcDrAZvV3B-Q7gbeL1JG9ce4i6Ine4q-1mGZNshzwHqMTYOSH321P7dOFoWAMNwHWetrL58rKTb4Vd0xwaPBAKA98QwWRxuZosIudv",
   "keys": {
       "p256dh": "BOiEXDs2c/fuMRJguFZgxkORVmQOYVuUepQvLrakYXYTQ0UWGpRKw0PIDY2gv+roeDqAd/nYjdgX83vMj8zXVSg=",
       "auth": "a2Yf4UHVBp06841ncMMmXA=="
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