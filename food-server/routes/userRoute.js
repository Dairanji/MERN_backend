const express=require('express');
const Route=express.Router();
const multer=require('multer');
const userController=require('../controllers/userControllers');
const verify=require('../middlewares/verifySignup');

Route.get('/',userController.login);
Route.post('/addLogin',userController.addLogin);
Route.get('/signup',userController.signup);
Route.post('/addSignup',[verify.verifySignup],userController.addSignup);
Route.get('/logout',userController.logout);

Route.post('/addRecipe',userController.addRecipe);
Route.get('/showRecipe',userController.userAuth,userController.showRecipe);
Route.post('/addIngridients',userController.addIngridients);
Route.post('/addProcess',userController.addProcess);
Route.get('/showProcess',userController.showProcess);




module.exports=Route;