import { Router } from "express";
import {
  createAStudent,
  deleteAStudent,
  getAllStudents,
  getASingleStudent,
  updateAStudent,
} from "../controllers/studentsController.js";

const router = Router();

router.route("/").get(getAllStudents).post(createAStudent);
router
  .route("/:id")
  .get(getASingleStudent)
  .delete(deleteAStudent)
  .patch(updateAStudent);

// export

export default router;
