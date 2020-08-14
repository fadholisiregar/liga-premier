const SaveNotification = () => {
    const title = 'Notifikasi';
    const options = {
        'body': 'Item berhasil ditambahkan ke favorit',
    }
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(function (registration) {
            registration.showNotification(title, options);
        });
    } else {
        console.error('Fitur notifikasi tidak diijinkan.');
    }
}
