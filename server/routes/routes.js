import express from "express";
import credController from "../controllers/credController";
import redflagsController from "../controllers/redflagsController";
import intervController from "../controllers/intervController";
import statusController from "../controllers/statusController";

const router = express.Router();
//credentials endpoints
router.post("/auth/signup", credController.signUp);
router.post("/auth/signin", credController.signIn);

//red-flag records endpoints
router.post("/red-flags", redflagsController.createRF);
router.get("/red-flags", redflagsController.allRedflags);
router.get("/red-flags/:id", redflagsController.specificRF);
router.patch("/red-flags/:id/location", redflagsController.editLocation);
router.patch("/red-flags/:id/comment", redflagsController.editComment);
router.delete("/red-flags/:id", redflagsController.deleteRF);

//intervention records endpoints
router.post("/interventions", intervController.createINTV);
router.get("/interventions", intervController.allINTV);
router.get("/interventions/:id", intervController.specificINTV);
router.patch("/interventions/:id/location_Intv", intervController.editLocation);
router.patch("/interventions/:id/comment_Intv", intervController.editComment);
router.delete("/interventions/:id", intervController.deleteINTV);

//views templates
router.get("/", redflagsController.home);
router.get("/view/allRedflags", redflagsController.viewAllRedflags);
router.get("/view/addRedflag", redflagsController.createRF2);
router.post("/view/addRedflag", redflagsController.createRF3);
router.get("/view/editRedflag/:id", redflagsController.specificRF2);
router.post("/view/editRedflag2/:id", redflagsController.editRF);
router.get("/view/deleteRedflag/:id", redflagsController.specificRF3);
router.delete("/rf/:id", redflagsController.delete_rf);
router.get("/view/adminPanel", redflagsController.admin);
router.get("/view/signUp", redflagsController.signUpView);
router.get("/view/signIn", redflagsController.signInView);
router.get("/view/profile", redflagsController.profileView);
router.post("/status", statusController.status);

export default router;