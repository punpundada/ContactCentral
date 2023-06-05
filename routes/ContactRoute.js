const express = require("express")
const router = express.Router()
const {
    
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact,
    seachByNumber,
    searchByEmail
    } = require("../Controllers/ContactController")
const validateToken = require("../Controllers/Middleware/validateTokenHandler")


//if you have all the routes as private routes then we can add following line 
//It is a bit hard to read this style routing
router.use(validateToken)
router.route("/").get(getContacts).post(createContact)

router.route("/:id").get(getContact).delete(deleteContact).put(updateContact)
router.route("/phone").post(seachByNumber);
router.route("/email").post(searchByEmail)
//we can alos write the routing as above to save space


//router.route("/").get(getContacts)
// router.route("/").post(createContact)
// router.route("/:id").put(updateContact)
// router.route("/:id").delete(deleteContact)





module.exports=router;