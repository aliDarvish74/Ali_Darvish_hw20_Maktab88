import { NextFunction, Request, RequestHandler, Response } from "express";
import employeeService from "../services/employee.service";
import { EmployeeInterface } from "../database/models/Employee.model";
import { AppError } from "../dto/error.handler";
import {
  AddEmployeeDTO,
  AddEmployeeInterface,
  UpdateEmployeeDto,
  UpdateEmployeeInterface,
} from "../dto/employee.dto";
import { validate } from "class-validator";
import { isDate } from "util/types";

class EmployeeCrudMiddlewares {
  public findEmployee: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const targetEmployee: EmployeeInterface =
      await employeeService.findEmployeeByNationalCode(
        req.params.employeeNationalCode
      );

    if (!targetEmployee) {
      return next(new AppError(404, "Target employee not found"));
    }
    res.locals.employee = targetEmployee;
    next();
  };

  public addEmployeeValidation: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const employeeInfo: AddEmployeeInterface = new AddEmployeeDTO(req.body);

      const validationErrors = await validate(employeeInfo);
      console.log(validationErrors);

      if (!!validationErrors.length) {
        return next(new AppError(400, validationErrors.toString()));
      }

      const duplicateEmployee: EmployeeInterface =
        await employeeService.findEmployeeByNationalCode(
          employeeInfo.nationalCode
        );

      if (!!duplicateEmployee) {
        return next(
          new AppError(409, "Another employee found with this national code.")
        );
      }
      res.locals.employee = employeeInfo;
      next();
    } catch (error) {
      return next(new AppError(500, "Internal server error."));
    }
  };

  public UpdateEmployeeValidation: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const targetEmployee: AddEmployeeInterface = new AddEmployeeDTO(
        res.locals.employee
      );

      const updatedInfo: UpdateEmployeeInterface = new UpdateEmployeeDto(
        req.body
      );
      if (
        !!updatedInfo.nationalCode &&
        updatedInfo.nationalCode !== targetEmployee.nationalCode
      ) {
        const duplicateEmployee: EmployeeInterface =
          await employeeService.findEmployeeByNationalCode(
            updatedInfo.nationalCode
          );
        if (!!duplicateEmployee) {
          return next(
            new AppError(
              409,
              "Cannot update. Entered national code belongs to another employee."
            )
          );
        }
      }
      targetEmployee.firstname =
        updatedInfo.firstname ?? targetEmployee.firstname;

      targetEmployee.lastname = updatedInfo.lastname ?? targetEmployee.lastname;

      targetEmployee.birthDate = !!updatedInfo.birthDate
        ? isDate(new Date(updatedInfo.birthDate))
          ? new Date(updatedInfo.birthDate)
          : targetEmployee.birthDate
        : targetEmployee.birthDate;

      targetEmployee.companyName =
        updatedInfo.companyName ?? targetEmployee.companyName;

      targetEmployee.gender = updatedInfo.gender ?? targetEmployee.gender;

      targetEmployee.nationalCode =
        updatedInfo.nationalCode ?? targetEmployee.nationalCode;

      targetEmployee.role = updatedInfo.role ?? targetEmployee.role;

      const validationErrors = await validate(targetEmployee);
      if (!!validationErrors.length) {
        return next(new AppError(400, validationErrors.toString()));
      }

      res.locals.employee = targetEmployee;
      next();
    } catch (error) {
      return next(new AppError(500, "Internal server error."));
    }
  };
}

export default new EmployeeCrudMiddlewares();
