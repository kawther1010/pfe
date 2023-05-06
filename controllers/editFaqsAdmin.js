const Faq= require('../models/faq');

// UPDATE FAQs Admin
exports.editFaqsAdmin= async(req, res) => {
    try{
        //const faqFound= await Faq.findOne({_id: req.params.id});
        const editingFaq = await Faq.findOneAndUpdate({ _id: req.params.id }, {
            question: req.body.question,
            responce: req.body.responce,
        });
        
        return res.status(200).redirect('/dashboard/faqsAdmin'); 
    } catch(err) {
        console.log(err);
        return res.status(404).send("Page 404: Page not found.");
    }
}