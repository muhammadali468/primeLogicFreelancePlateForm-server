import { Router } from "express";
import navigationPagesController from "../../controllers/navigationPagesController/navigationPagesController";
// import authMiddleware from "../../middlewares/authMiddleware";
import { validateDataMiddleware } from "../../middlewares/validationMiddleware";
import { createCategorySchema, serviceSchema } from "../../validation/zod";

export const navigationPagesRouter = Router();

navigationPagesRouter.route("/createCategory").post(
  // authMiddleware.checkToken, authMiddleware.checkIfUserIAdminOrModerator,
  validateDataMiddleware(createCategorySchema),
  navigationPagesController.createCategory
);

navigationPagesRouter.route("/updateService").patch(
  // authMiddleware.checkToken, authMiddleware.checkIfUserIAdminOrModerator,
  navigationPagesController.updateService
);

navigationPagesRouter.route("/fetchAllCategory").get(navigationPagesController.fetchAllCategory);
navigationPagesRouter.route("/createService").post(validateDataMiddleware(serviceSchema), navigationPagesController.createService);
navigationPagesRouter.route("/fetchAllServices").get(navigationPagesController.fetchAllServices);
navigationPagesRouter.route("/fetchSingleServiceDetail/:slug").get(navigationPagesController.fetchSingleServiceDetail);
// navigationPagesRouter.route("/updateNavigationPage").patch(
//   // authMiddleware.checkToken, authMiddleware.checkIfUserIAdminOrModerator,
//   // validateDataMiddleware(serviceSchema),
//   navigationPagesController.updateService
// );

// navigationPagesRouter.route("/getSingleService").get(
//   // authMiddleware.checkToken, authMiddleware.checkIfUserIAdminOrModerator,
//   // validateDataMiddleware(serviceSchema),
//   navigationPagesController.getSingleService
// );
// navigationPagesRouter.route("/getAllServices").get(
//   // authMiddleware.checkToken, authMiddleware.checkIfUserIAdminOrModerator,
//   // validateDataMiddleware(serviceSchema),
//   navigationPagesController.getAllServices
// );
// navigationPagesRouter
//   .route("/getSingleNavigationPage/:id")
//   .get(authMiddleware.checkToken, authMiddleware.checkIfUserIAdminOrModerator, navigationPagesController.getSingleNavigationPage);
// navigationPagesRouter
//   .route("/getAllNavigationPages")
//   .get(authMiddleware.checkToken, authMiddleware.checkIfUserIAdminOrModerator, navigationPagesController.getAllNavigationPages);
// navigationPagesRouter
//   .route("/updateNavigationPage/:id")
//   .put(authMiddleware.checkToken, authMiddleware.checkIfUserIAdminOrModerator, navigationPagesController.updateNavigationPage);
// navigationPagesRouter
//   .route("/deleteNavigationPage/:id")
//   .delete(authMiddleware.checkToken, authMiddleware.checkIfUserIAdminOrModerator, navigationPagesController.deleteNavigationPage);
// navigationPagesRouter
//   .route("/trashNavigationPage/:id")
//   .patch(authMiddleware.checkToken, authMiddleware.checkIfUserIAdminOrModerator, navigationPagesController.trashNavigationPage);
// navigationPagesRouter
//   .route("/untrashNavigationPage/:id")
//   .patch(authMiddleware.checkToken, authMiddleware.checkIfUserIsAdmin, navigationPagesController.untrashNavigationPage);
