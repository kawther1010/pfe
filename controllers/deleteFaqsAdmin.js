const Faq= require('../models/faq');

// Delete FAQs Admin
exports.deleteFaqsAdmin= async(req, res) => {
    try{
        const faq = await Faq.findOne({_id: req.params.id});
        const faqDeleted= await faq.deleteOne();

        console.log("deleted successfully");
        return res.status(200).redirect('/dashboard/faqsAdmin'); 
    } catch(err) {
        console.log(err);
        return res.status(404).send("Page 404: Page not found.");
    }
}
