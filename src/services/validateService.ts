import { TableRow } from '../types/types';

export function validateRow(row: Partial<TableRow>): Record<string, string | undefined> {
  const errors: Record<string, string | undefined> = {};

  if (!row.Subsystem) {
    errors.Subsystem = 'Subsystem is required';
  }

  if (!row.Name) {
    errors.Name = 'Name is required';
  }

  if (!row.DocType) {
    errors.DocType = 'Document Type is required';
  }

  if (!row.COTS) {
    errors.COTS = 'COTS Type is required';
  }

  if (!row.Owner) {
    errors.Owner = 'Owner is required';
  }

  // Add more validations as needed

  return errors;
}