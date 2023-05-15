import express, { Router } from "express";
import employeeController from "../controllers/employee.controller";
import employeeCrudValidations from "../middlewares/employee.validation";

const router: Router = express.Router();

router.get("/", employeeController.getAllEmployees);

router.get(
  "/:employeeNationalCode",
  employeeCrudValidations.findEmployee,
  employeeController.getEmployee
);

router.post(
  "/",
  employeeCrudValidations.addEmployeeValidation,
  employeeController.addEmployee
);

router.patch(
  "/:employeeNationalCode",
  employeeCrudValidations.findEmployee,
  employeeCrudValidations.UpdateEmployeeValidation,
  employeeController.updateEmployee
);

router.delete(
  "/:employeeNationalCode",
  employeeCrudValidations.findEmployee,
  employeeController.deleteEmployee
);
export default router;
