import { Part, Assembly } from '../types/types';
import { getRows, getRow, createRow, updateRow, deleteRow, moveRow } from './apiService';

export async function getParts(tableId: number, vehicle: string): Promise<Part[]> {
  const rows = await getRows(tableId, vehicle);
  console.log(rows)
  return rows.filter((row): row is Part => !(row as Assembly).docType) as Part[];
}

export async function getAssemblies(tableId: number, vehicle: string): Promise<Assembly[]> {
  const rows = await getRows(tableId, vehicle);
  return rows.filter((row): row is Assembly => !!(row as Assembly).docType) as Assembly[];
}

export async function getPart(tableId: number, partId: number, vehicle: string): Promise<Part> {
  return (await getRow(tableId, partId, vehicle)) as Part;
}

export async function getAssembly(tableId: number, assemblyId: number, vehicle: string): Promise<Assembly> {
  return (await getRow(tableId, assemblyId, vehicle)) as Assembly;
}

export async function createPart(tableId: number, part: Part, vehicle: string): Promise<Part> {
  return (await createRow(tableId, part, vehicle)) as Part;
}

export async function createAssembly(tableId: number, assembly: Assembly, vehicle: string): Promise<Assembly> {
  return (await createRow(tableId, assembly, vehicle)) as Assembly;
}

export async function updatePart(tableId: number, partId: number, part: Partial<Part>, vehicle: string): Promise<Part> {
  return (await updateRow(tableId, partId, part, vehicle)) as Part;
}

export async function updateAssembly(tableId: number, assemblyId: number, assembly: Partial<Assembly>, vehicle: string): Promise<Assembly> {
  return (await updateRow(tableId, assemblyId, assembly, vehicle)) as Assembly;
}

export async function deletePart(tableId: number, partId: number, vehicle: string): Promise<void> {
  await deleteRow(tableId, partId, vehicle);
}

export async function deleteAssembly(tableId: number, assemblyId: number, vehicle: string): Promise<void> {
  await deleteRow(tableId, assemblyId, vehicle);
}

export async function movePart(tableId: number, partId: number, beforePartId: number | undefined, vehicle: string): Promise<Part> {
  return (await moveRow(tableId, partId, beforePartId, vehicle)) as Part;
}

export async function moveAssembly(tableId: number, assemblyId: number, beforeAssemblyId: number | undefined, vehicle: string): Promise<Assembly> {
  return (await moveRow(tableId, assemblyId, beforeAssemblyId, vehicle)) as Assembly;
}