const express = require("express");
const router = express.Router();
const controller = require("../controller/controller");

router
  .route("/api/categories")
  .post(controller.createCategories)
  .get(controller.getCategories)
  .delete(controller.deleteCategory);
router
  .route("/api/transaction")
  .post(controller.createTransaction)
  .get(controller.getTransaction)
  .delete(controller.deleteTransaction)
  .put(controller.updateTransaction);

router.route("/api/labels").get(controller.getLabels);

module.exports = router;
