import { IsDate, IsEnum, IsNotEmpty, IsString, Length } from "class-validator";
import { Schema } from "mongoose";

enum employeeGender {
  male = "male",
  female = "female",
  not_Set = "not_set",
}
enum employeeRole {
  employee = "employee",
  manager = "manager",
}
export interface AddEmployeeInterface {
  firstname: string;
  lastname: string;
  gender?: employeeGender;
  birthDate: Date;
  nationalCode: string;
  companyName: string;
  role?: employeeRole;
}

export class AddEmployeeDTO implements AddEmployeeInterface {
  @Length(3, 30, { message: "Firstname length must be between 3 and 30" })
  @IsString({ message: `Firstname must be a string` })
  @IsNotEmpty({ message: "Firstname cannot be empty" })
  firstname: string;

  @Length(3, 30, { message: "Lastname length must be between 3 and 30" })
  @IsString({ message: `Lastname must be a string` })
  @IsNotEmpty({ message: "Lastname cannot be empty" })
  lastname: string;

  @IsDate()
  @IsNotEmpty({ message: "Birth date cannot be empty" })
  birthDate: Date;

  @Length(10, 10, { message: "National Code length must be 10" })
  @IsNotEmpty({ message: "National Code cannot be empty" })
  nationalCode: string;

  @Length(2, 40, { message: "Company Name length must be between 2 and 40" })
  @IsNotEmpty({ message: "Company Name cannot be empty" })
  companyName: string;

  @IsEnum(employeeGender, { message: "Gender must be male, female or not set" })
  @IsString({ message: `Gender must be a string` })
  gender?: employeeGender;

  @IsEnum(employeeRole, { message: "Role must be employee or manager" })
  @IsString({ message: `Role must be a string` })
  role?: employeeRole;

  constructor(employeeInfo: any) {
    this.firstname = employeeInfo.firstname?.trim();
    this.lastname = employeeInfo.lastname?.trim();
    this.birthDate = new Date(employeeInfo.birthDate) || null;
    this.nationalCode = employeeInfo.nationalCode?.trim();
    this.companyName = employeeInfo.companyName?.trim();
    this.gender = employeeInfo.gender ?? "not_set";
    this.role = employeeInfo.role ?? "employee";
  }
}

//
export interface UpdateEmployeeInterface {
  firstname?: string;
  lastname?: string;
  gender?: employeeGender;
  birthDate?: Date;
  nationalCode?: string;
  companyName?: string;
  role?: employeeRole;
}

export class UpdateEmployeeDto implements UpdateEmployeeInterface {
  firstname?: string;
  lastname?: string;
  birthDate?: Date;
  nationalCode?: string;
  companyName?: string;
  gender?: employeeGender;
  role?: employeeRole;
  constructor(employeeInfo: any) {
    this.firstname = employeeInfo.firstname?.trim();
    this.lastname = employeeInfo.lastname?.trim();
    this.birthDate = employeeInfo.birthDate?.trim();
    this.nationalCode = employeeInfo.nationalCode?.trim();
    this.companyName = employeeInfo.companyName?.trim();
    this.gender = employeeInfo.gender?.trim();
    this.role = employeeInfo.role?.trim();
  }
}
