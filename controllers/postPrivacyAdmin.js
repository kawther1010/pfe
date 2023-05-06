const Privacy= require('../models/privacy');

// UPDATE FAQs Admin
exports.postPrivacyAdmin= async(req, res) => {
    try{
        const privacyFound= await Privacy.findOne({ });
        const updatingPrivacy = await Privacy.findOneAndUpdate({ _id: privacyFound._id }, {
            privacyPolicy: req.body.privacyPolicy,
            informationWeCollect: req.body.informationWeCollect,
            howWeUseYourInformation: req.body.howWeUseYourInformation,
            sharingYourInformation: req.body.sharingYourInformation,
            yourChoices: req.body.yourChoices,
            changeToThisPolicy: req.body.changeToThisPolicy,
        });
        
        return res.status(200).redirect('/dashboard/privacy-policy-admin'); 
    } catch(err) {
        console.log(err);
        return res.status(404).send("Page 404: Page not found.");
    }
}


/* POST NEW FAQs Admin
exports.postPrivacyAdmin= async(req, res) => {
    try{
        let newPrivacy= await new Privacy({
            privacyPolicy: req.body.privacyPolicy,
            informationWeCollect: req.body.informationWeCollect,
            howWeUseYourInformation: req.body.howWeUseYourInformation,
            sharingYourInformation: req.body.sharingYourInformation,
            yourChoices: req.body.yourChoices,
            changeToThisPolicy: req.body.changeToThisPolicy,
        });
        privacySaved= await newPrivacy.save();

        console.log("added successfully");
        return res.status(200).redirect('/dashboard/privacy-policy-admin'); 
    } catch(err) {
        console.log(err);
        return res.status(404).send("Page 404: Page not found.");
    }
}
*/