const cron = require('node-cron');
const sendEmailToWinner = require('../controllers/auctionEndController');

module.exports = function () {
    cron.schedule('*/5 * * * * *', async () => {
        try {
            await sendEmailToWinner.checkAuctionStatus();
        } catch (err) {
            console.error(err);
        }
    });
}