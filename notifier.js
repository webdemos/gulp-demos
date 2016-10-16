var notifier = require('node-notifier');
var path = require('path');

console.log(path.join(__dirname, '/app/img/a.png'));

// notifier
notifier.notify({
    title: 'My notification',
    message: 'Hello World!',
    icon: path.join(__dirname, '/app/img/a.png'),
    sound: true,
    contentImage: path.join(__dirname, '/app/img/a.png'),
    open: 'http://github.com',
    wait: true
}, function (err, response) {
    // Response is response from notification
    console.log(response);
});

notifier.on('click', function (notifierObject, options) {
    // Triggers if `wait: true` and user clicks notification
    console.log(notifierObject);
});

notifier.on('timeout', function (notifierObject, options) {
    // Triggers if `wait: true` and notification closes
    console.log(notifierObject);
});
