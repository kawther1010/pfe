const User = require('../models/User');

// POST delete Object Admin
exports.postDeleteUserAdmin= async(req, res) => {
    try{
        const userToDelete= await User.findOne({_id: req.params.id});
        const deleting= await User.deleteOne(userToDelete);
        console.log("delete successfully");
        return res.status(200).redirect('/dashboard/users'); 
    } catch(err) {
        console.log(err);
        return res.status(404).send("Page 404: Page not found.");
    }
}
