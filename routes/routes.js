const controller = require('../controllers/controllerAuth');

// User Controllers
let postData = controller.postData;
let getForm = controller.getForm;
let getDBData = controller.getDBData;

const express = require("express");
let router = express.Router();

router
  .route("/formpage")
  .get(getForm);

router
  .route("/postdata")
  .post(postData);

router
  .route("/viewdata")
  .get(getDBData);


module.exports = router;