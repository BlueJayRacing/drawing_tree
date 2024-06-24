import { TableRow } from '../types/types';

export function generatePartNumber(values: Partial<TableRow>, existingRows: TableRow[]): string {
  let nextInd = 0;
  let assyName = "";

  if (values.inSubsystem === 0) {
    throw new Error("You cannot add a part to the Main Assembly");
  }

  for (let i = 0; i < existingRows.length; i++) {
    console.log(existingRows[i].inSubsystem)
    console.log(values.inSubsystem)
    
    if ((Number(existingRows[i].inSubsystem) == Number(values.inSubsystem) || existingRows[i].inSubsystem == values.inSubsystem) &&
        (Number(existingRows[i].inAssy) == Number(values.inAssy) || existingRows[i].inAssy == values.inAssy) &&
        (existingRows[i].Division == 0)) {
      if (existingRows[i].inIndex >= nextInd) {
        nextInd = existingRows[i].inIndex + 1;
      }
      if (existingRows[i].inIndex == 0) {
        assyName = existingRows[i].Name;
      }
    }
  }


  if (nextInd === 0) {
    throw new Error("Subsystem or assembly does not exist");
  }

  if (!values.Name) {
    throw new Error("No name provided");
  }

  return `${values.Car}${values.inSubsystem?.toString().padStart(2, '0')}${values.DocType}-${values.Division}${values.inAssy?.toString().padStart(2, '0')}${nextInd.toString().padStart(2, '0')}`;
}

export function generateAssemblyNumber(values: Partial<TableRow>, existingRows: TableRow[]): string {
  let nextInd = 0;
  let assyName = "";

  if (values.inSubsystem === 0) {
    throw new Error("You cannot add an assembly to the Main Assembly");
  }

  for (let i = 0; i < existingRows.length; i++) {
    if ((existingRows[i].inSubsystem == values.inSubsystem || existingRows[i].inSubsystem == values.inSubsystem) && existingRows[i].Division == "0") {
      if (existingRows[i].inAssy >= nextInd) {
        nextInd = existingRows[i].inAssy + 1;
      }
      if (existingRows[i].inAssy == 0) {
        assyName = existingRows[i].Name;
      }
    }
  }


  if (nextInd === 0) {
    throw new Error("Subsystem does not exist");
  }

  if (!values.Name) {
    throw new Error("No name provided");
  }

  return `${values.Car}${values.inSubsystem}${values.DocType}-${nextInd.toString().padStart(2, '0')}00`;
}