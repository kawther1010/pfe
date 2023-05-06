const Object = require('../models/Object');
const User = require('../models/User');
const transporter = require('../config/nodemailer');
require('dotenv').config()


exports.checkAuctionStatus = async () => {
    const now = new Date();
    const endedAuctions = await Object.find({ endDate: { $lte: now }, sold: false }).populate('seller buyer', 'email firstName lastName');
    const emailsAlreadySent = await Object.find({ endDate: { $lte: now }, sold: true })

    for (const auctionFinished of emailsAlreadySent) {
        auctionFinished.deleteOne()
    }

    for (const auction of endedAuctions) {
        const winner = auction.bids[auction.bids.length - 1].bidder;
        const seller = auction.seller;
        const winnerDocument = await User.findById(winner).select('email firstName lastName');
        const winnerEmail = winnerDocument.email;
        const sellerEmail = seller.email;
        const mailOptions = {
            from: process.env.EMAIL_ADMIN,
            to: winnerEmail,
            subject: 'You won the auction!',
            html: `<p>Congratulations! You won the auction for <strong>${auction.title}</strong>.</p>
                   <p>The seller will contact you soon to arrange payment and shipping.</p>`
        };
        await transporter.sendMail(mailOptions);
        console.log("Sent email to the winner : " + winnerEmail)

        const sellerMailOptions = {
            from: process.env.EMAIL_ADMIN,
            to: sellerEmail,
            subject: 'Your auction has ended!',
            html: `<p>Your auction for <strong>${auction.title}</strong> has ended. The winning bidder is ${winnerDocument.firstName} ${winnerDocument.lastName} (${winnerDocument.email}).</p>
                    <p>Please contact them to arrange payment and shipping.</p>`
        };
        await transporter.sendMail(sellerMailOptions);
        console.log("Sent email to the seller : " + sellerEmail)

        auction.buyer = winner;
        auction.sold = true;
        await auction.deleteOne();
    }
}
