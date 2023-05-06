const Object = require('../models/Object');

// POST delete Object Admin
exports.postDeleteObjectAdmin= async(req, res) => {
    try{
        const objectToDelete= await Object.findOne({_id: req.params.id});
        const deleting= await Object.deleteOne(objectToDelete);
        console.log("delete successfully");
        return res.status(200).redirect('/dashboard/objects'); 
    } catch(err) {
        console.log(err);
        return res.status(404).send("Page 404: Page not found.");
    }
}
