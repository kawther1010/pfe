const Term= require('../models/term');

// Delete FAQs Admin
exports.deleteTermsAdmin= async(req, res) => {
    try{
        const term = await Term.findOne({_id: req.params.id});
        const termDeleted= await term.deleteOne();

        console.log("deleted successfully");
        return res.status(200).redirect('/dashboard/terms-of-use-admin'); 
    } catch(err) {
        console.log(err);
        return res.status(404).send("Page 404: Page not found.");
    }
}
