let webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BCfzorC5FhG5CJmt9KNH4VVaE4klexGtTKWcGxlhbYyw4jZDsdwhzrcwfTzNhQB-B72cBlpKs9Ml0QLmutI2IgU",
    "privateKey": "XZ3dUKcOY0bBi-o7uSMM9rBlH9F6buvNQZOZLvGoi-A"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
let pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/fNkgb4kJe4s:APA91bEzFYVIZwOzpFd9-e_f0OHqub17v-84TzsjQj8YquqpzlBwHkEYKoaMnWGgBFfcldl7KJcjNrFzL9varRUhKCS4v7xuw_pYDMhYelku3ZJMaloPVcUdDVJlkqsE_PdpJzsNiHG-",
    "keys": {
        "p256dh": "BIdRhgz7FdvRQMlWaNnTQ+n559+TpkcBgzqXZjZhIrr2gWOmh88BR+VfGDvi2zLQpsHv94rJoWY9wBbBea0Vo/o=",
        "auth": "yaMOaxMeErSb0sqhmRUoKg=="
    }
};
let payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

let options = {
    gcmAPIKey: '159886044086',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);