const Faq= require('../models/faq');

// POST FAQs Admin
exports.postNewFaqsAdmin= async(req, res) => {
    try{
        let newFaq= await new Faq({
            question: req.body.question,
            response: req.body.response,
        });
        faqSaved= await newFaq.save();

        console.log("added successfully");
        return res.status(200).redirect('/dashboard/faqsAdmin'); 
    } catch(err) {
        console.log(err);
        return res.status(404).send("Page 404: Page not found.");
    }
}
