const Term= require('../models/term');

// UPDATE FAQs Admin
exports.editTermAdmin= async(req, res) => {
    try{
        const editingTerm = await Term.findOneAndUpdate({ _id: req.params.id }, {
            rule: req.body.rule,
        });
        
        return res.status(200).redirect('/dashboard/terms-of-use-admin/');
    } catch(err) {
        console.log(err);
        return res.status(404).send("Page 404: Page not found.");
    }
}