import { EmployeeInterface } from "../database/models/Employee.model";

export default class ResponseDto {
  constructor(
    public status: string,
    public message: string,
    public data?: EmployeeInterface | EmployeeInterface[]
  ) {}
}
