import { ParsedQs } from "qs";
import { Employee, EmployeeInterface } from "../database/models/Employee.model";
import { AddEmployeeDTO } from "../dto/employee.dto";

export class EmployeeService {
  public async findAllEmployees(queries): Promise<EmployeeInterface[]> {
    const { sort: sortKey = "", ...fields } = queries;

    return Employee.find(fields ?? {}).sort(sortKey);
  }
  public findEmployeeByNationalCode = async (nationalCode: string) => {
    return Employee.findOne({ nationalCode });
  };

  public saveNewEmployee = (employeeInfo: AddEmployeeDTO) => {
    const newEmployee: EmployeeInterface = new Employee(employeeInfo);
    return newEmployee.save();
  };

  public deleteEmployeeByNationalCode = async (nationalCode: string) => {
    return Employee.deleteOne({ nationalCode });
  };
}
export default new EmployeeService();
