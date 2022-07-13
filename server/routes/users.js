const router = require("express").Router();
const manager = require("../controllers/users");
const { verifyAccess } = require("../authentication/verify");

router.get("/verify", verifyAccess, manager.verify);
router.get("/gethome", verifyAccess, manager.getHome);
router.post("/login", manager.login);
router.post("/signup", manager.signup);
router.post("/submit_form/:id",verifyAccess, manager.submitForm);

router.get("/logout", verifyAccess, manager.logout);

module.exports = router;
 