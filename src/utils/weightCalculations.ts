// src/utils/weightCalculations.ts

import { TableRow } from '../types/types';

export function calculateAssemblyWeights(rows: TableRow[]): TableRow[] {
  const assemblyWeightMap = new Map<string, number>();
  const subsystemWeightMap = new Map<number, number>();

  // Helper function to get the unique key for each assembly
  const getAssemblyKey = (row: TableRow) => `${row.inSubsystem}-${row.inAssy}`;

  // First pass: calculate weights for all part assemblies
  rows.forEach(row => {
    if (row.inIndex !== 0) {  // This is a component, not an assembly
      const assemblyKey = getAssemblyKey(row);
      const weight = Number(row['Weight(lbs)'] || 0);
      const qty = Number(row["QTY On-car"] || 0);
      assemblyWeightMap.set(
        assemblyKey, 
        (assemblyWeightMap.get(assemblyKey) || 0) + weight * qty
      );
    }
  });

  // Second pass: set calculated weights for assemblies and calculate subsystem weights
  rows.forEach(row => {
    if (row.inIndex == 0) {  // This is an assembly
      const assemblyKey = getAssemblyKey(row);
      const assemblyWeight = assemblyWeightMap.get(assemblyKey) || 0;
      
      // Set the calculated weight for this assembly
      row['Assy Weight (lbs)'] = assemblyWeight.toFixed(3).toString();

      // Add this assembly's weight to its subsystem total
      subsystemWeightMap.set(
        row.inSubsystem,
        (subsystemWeightMap.get(row.inSubsystem) || 0) + assemblyWeight
      );

      // If this is a sub-assembly, add its weight to the parent assembly
      if (row.inAssy != 0) {
        const parentAssemblyKey = `${row.inSubsystem}-${Math.floor(row.inAssy / 100)}`;
        assemblyWeightMap.set(
          parentAssemblyKey,
          (assemblyWeightMap.get(parentAssemblyKey) || 0) + assemblyWeight
        );
      }
    } else {
      // This is a component, so it doesn't have an assembly weight
      row['Assy Weight (lbs)'] = undefined;
    }
  });

  // Set subsystem weights
  rows.forEach(row => {
    if (row.inSubsystem != 0 && row.inAssy == 0 && row.Division == 0) {  // This is a subsystem main assembly
      const subsystemWeight = subsystemWeightMap.get(row.inSubsystem) || 0;
      row['Assy Weight (lbs)'] = subsystemWeight.toFixed(3).toString();
    }
  });

  // Calculate main assembly (car) weight
  const mainAssembly = rows.find(row => row.inSubsystem == 0 && row.inAssy == 0);
  if (mainAssembly) {
    const totalCarWeight = Array.from(subsystemWeightMap.values()).reduce((sum, weight) => sum + weight, 0);
    mainAssembly['Assy Weight (lbs)'] = totalCarWeight.toFixed(3).toString();
  }

  // console.log("Assembly weights calculated:", assemblyWeightMap);
  // console.log("Subsystem weights calculated:", subsystemWeightMap);
  return rows;
}