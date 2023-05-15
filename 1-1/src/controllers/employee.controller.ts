import { NextFunction, Request, RequestHandler, Response } from "express";

import { EmployeeInterface } from "../database/models/Employee.model";
import ResponseDto from "../dto/response.dto";
import { AppError } from "../dto/error.handler";
import employeeService from "../services/employee.service";

class EmployeeController {
  public getAllEmployees: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const employees: EmployeeInterface[] =
        await employeeService.findAllEmployees(req.query);
      if (!employees.length) {
        return next(new AppError(404, "No user found."));
      }
      res
        .status(200)
        .json(new ResponseDto("success", "Users read successfull", employees));
    } catch (error) {
      next(new AppError(500, "Internal Server Error"));
    }
  };

  public getEmployee: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    return res.json(
      new ResponseDto("success", "Target Employee found", res.locals.employee)
    );
  };

  public addEmployee: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const savedEmployee: EmployeeInterface =
        await employeeService.saveNewEmployee(res.locals.employee);
      res.json(
        new ResponseDto("success", "Employee Saved Successfully", savedEmployee)
      );
    } catch (error) {
      next(new AppError(500, "Internal server error" + error));
    }
  };

  public updateEmployee: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await employeeService.deleteEmployeeByNationalCode(
        req.params.employeeNationalCode
      );
      const updatedEmployeee: EmployeeInterface =
        await employeeService.saveNewEmployee(res.locals.employee);
      res
        .status(200)
        .json(
          new ResponseDto(
            "success",
            "Employee updated successfully",
            updatedEmployeee
          )
        );
    } catch (error) {
      next(new AppError(500, "Internal server Error"));
    }
  };

  public deleteEmployee: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    await employeeService.deleteEmployeeByNationalCode(
      req.params.employeeNationalCode
    );
    return res
      .status(204)
      .json(new ResponseDto("success", "Employee deleted successfully."));
  };
}

export default new EmployeeController();
