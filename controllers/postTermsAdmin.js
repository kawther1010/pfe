const Term= require('../models/term');

// POST FAQs Admin
exports.postTermsAdmin= async(req, res) => {
    try{
        let newTerm= await new Term({
            rule: req.body.rule,
        });
        termSaved= await newTerm.save();

        console.log("added successfully");
        return res.status(200).redirect('/dashboard/terms-of-use-admin'); 
    } catch(err) {
        console.log(err);
        return res.status(404).send("Page 404: Page not found.");
    }
}
