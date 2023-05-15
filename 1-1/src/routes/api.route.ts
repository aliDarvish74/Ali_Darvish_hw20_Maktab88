import express, { Router } from "express";

import employeeRouter from "./employee.route";

const router: Router = express.Router();

router.use("/employees", employeeRouter);

export default router;
