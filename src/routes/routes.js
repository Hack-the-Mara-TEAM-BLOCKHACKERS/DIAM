const express=require('express');
const multer=require('multer');
const upload =multer();
const router=express.Router();
const controllerDonor=require('../controllers/donors/donor')
const controllerAdmin=require('../controllers/admins/admin')
const controllerBeneficiaries=require('../controllers/beneficiaries/beneficiaries')
const controllerFinalSave=require('../controllers/beneficiaries/beneficiaries_save')
const viewUsers=require('../controllers/beneficiaries/view_beneficiaries')


router.get('/',controllerDonor.home);
 router.post('/add-Ranger',upload.none(),controllerBeneficiaries.addRanger);
 router.post('/validate-Ranger',controllerBeneficiaries.validateRanger);
 router.post('/save-Ranger',controllerFinalSave.saveRanger);
 router.get('/all-Rangers',viewUsers.viewAllRangers);
 router.get('/viewAll-Rangers',controllerBeneficiaries.viewAllRangers);
 router.post('/one-Ranger',viewUsers.oneRanger);




 router.post('/add-LandOwner',controllerBeneficiaries.addLandOwner);
 router.post('/validate-LandOwner',controllerBeneficiaries.validateLandOwner);
 router.post('/save-LandOwner',controllerFinalSave.saveLandOwner);
 router.get('/all-LandOwners',viewUsers.viewAllLandOwners);
 router.get('/viewAll-LandOwners',controllerBeneficiaries.viewAllLandOwner);
 router.post('/one-LandOwner',viewUsers.oneLandOwner);

 //router.get('/add-donor',controllerDonor.registerDonor);
 router.post('/Add-Donor',controllerDonor.addDonor);
 router.post('/login-donor',controllerDonor.loginDonor);
 router.get('/all-donors',controllerDonor.viewAllDonor);

 router.post('/create-admin',controllerAdmin.addAdmin)
 router.post('/login-admin',controllerAdmin.loginAdmin)
 router.get('/all-admin',controllerAdmin.viewAllAdmin)


module.exports=router;