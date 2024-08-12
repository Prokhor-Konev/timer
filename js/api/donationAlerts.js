const DA_CENTRIFUGE_URL = 'wss://centrifugo.donationalerts.com/connection/websocket';
const DA_SUBSCRIBE_URL = 'https://www.donationalerts.com/api/v1/centrifuge/subscribe';
const RECONNECTION_DELAY_MIN = 1000;
const RECONNECTION_DELAY_MAX = 5000;

if (donationAlertsToken !== "") {
    const config = {
        socket: 'wss://socket.donationalerts.ru',
        socketPort: '443',
        type: 'alert_widget'
    }

    const donationalerts = io(`${config.socket}:${config.socketPort}`);
    donationalerts.emit('add-user', { token: donationAlertsToken, type: config.type });
    donationalerts.on("donation", (donate) => {
        donate = JSON.parse(donate);
        const { amount_main, alert_type } = donate;
        if (alert_type == '1') {
            addTime(endingTime, amount_main * secondsAddedPerCurrency)
        }
    });
}