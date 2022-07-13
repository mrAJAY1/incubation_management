const router = require("express").Router();
const manager = require("../controllers/admins.js");
const { verifyAdmin } = require("../authentication/verify");

router.get('/verify',verifyAdmin,manager.verify)
router.get("/getadmin", verifyAdmin, manager.getDashBoard);
router.get("/logout", verifyAdmin, manager.logout);
router.get("/reports", verifyAdmin, manager.recordList);
router.post("/reject", verifyAdmin, manager.rejectApp);
router.post("/approve", verifyAdmin, manager.approveApp);
router.get('/getapproved',verifyAdmin,manager.getapproved)
router.get("/getslots", verifyAdmin, manager.getAllSlots);
router.post("/bookslot", verifyAdmin, manager.bookSlot);
router.post("/removeslot", verifyAdmin, manager.removeSlot);

module.exports = router;
