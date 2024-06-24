interface SelectOption {
  id: number;
  value: string;
  color: string;
}

interface Vehicle {
  id: number;
  name: string;
}

interface Subsystem {
  id: number;
  name: string;
  vehicle: Vehicle;
}

interface Part {
  Analysis: SelectOption | null;
  Assy: string;
  'Assy Weight (lbs)': string;
  COTS: SelectOption | null;
  COTSnum: string | null;
  Car: string;
  Color: string;
  Condition: string;
  DXF: SelectOption | null;
  Division: string;
  DocType: SelectOption | null;
  Drawing: SelectOption | null;
  'Drawing Rev': string;
  FileName: string;
  Index: string;
  Material: string;
  Model: SelectOption | null;
  Name: string;
  'Order Date': string;
  Owner: SelectOption | null;
  PDF: SelectOption | null;
  PartNum: string;
  'Primary Key': string;
  'QTY Backups': number | null;
  'QTY On-car': string;
  'QTYcomplete-A01': string;
  'QTYcomplete-A02': string;
  'QTYcomplete-A03': string;
  'QTYcomplete-A04': string;
  Revision: string;
  Subsystem: string;
  Vendor: string;
  'Weight(lbs)': string;
  hideRow: boolean;
  id: number;
  inAssy: string;
  inIndex: string;
  inSubsystem: string;
  order: string;
}

interface Assembly {
  Analysis: SelectOption | null;
  Assy: string;
  'Assy Weight (lbs)': string;
  COTS: SelectOption | null;
  COTSnum: string | null;
  Car: string;
  Color: string;
  Condition: string;
  DXF: SelectOption | null;
  Division: string;
  DocType: SelectOption | null;
  Drawing: SelectOption | null;
  'Drawing Rev': string;
  FileName: string;
  Index: string;
  Material: string;
  Model: SelectOption | null;
  Name: string;
  'Order Date': string;
  Owner: SelectOption | null;
  PDF: SelectOption | null;
  PartNum: string;
  'Primary Key': string;
  'QTY Backups': number | null;
  'QTY On-car': string;
  'QTYcomplete-A01': string;
  'QTYcomplete-A02': string;
  'QTYcomplete-A03': string;
  'QTYcomplete-A04': string;
  Revision: string;
  Subsystem: string;
  Vendor: string;
  'Weight(lbs)': string;
  hideRow: boolean;
  id: number;
  inAssy: string;
  inIndex: string;
  inSubsystem: string;
  order: string;
}

interface User {
  id: number;
  username: string;
  email: string;
}

interface TableRow {
  id: number;
  Car: string;
  DocType: number | string;
  COTSnum: string | null;
  COTS: number | string;
  Revision: string;
  Material: string;
  Owner: number | string;
  'QTY On-car': number;
  Model: number | string;
  Analysis: number | string;
  Drawing: number | string;
  PDF: number | string;
  DXF: number | string;
  'Drawing Rev': string;
  'Order Date': string; // Date in ISO format
  inSubsystem: number;
  inAssy: number;
  inIndex: number;
  Division: number;
  Name: string;
  'Weight(lbs)': string; // Decimal with 2 decimal places
  'Assy Weight (lbs)': string; // Decimal with 2 decimal places
  'QTYcomplete-A01': string;
  'QTYcomplete-A02': string;
  'QTYcomplete-A03': string;
  'QTYcomplete-A04': string;
  Condition: string;
  hideRow: boolean;
  Vendor: string;
  'QTY Backups': number;
}

function rowToAssembly(row: any): Assembly {
  return {
    Analysis: row.Analysis,
    Assy: row.Assy,
    'Assy Weight (lbs)': row['Assy Weight (lbs)'],
    COTS: row.COTS,
    COTSnum: row.COTSnum,
    Car: row.Car,
    Color: row.Color,
    Condition: row.Condition,
    DXF: row.DXF,
    Division: row.Division,
    DocType: row.DocType,
    Drawing: row.Drawing,
    'Drawing Rev': row['Drawing Rev'],
    FileName: row.FileName,
    Index: row.Index,
    Material: row.Material,
    Model: row.Model,
    Name: row.Name,
    'Order Date': row['Order Date'],
    Owner: row.Owner,
    PDF: row.PDF,
    PartNum: row.PartNum,
    'Primary Key': row['Primary Key'],
    'QTY Backups': row['QTY Backups'],
    'QTY On-car': row['QTY On-car'],
    'QTYcomplete-A01': row['QTYcomplete-A01'],
    'QTYcomplete-A02': row['QTYcomplete-A02'],
    'QTYcomplete-A03': row['QTYcomplete-A03'],
    'QTYcomplete-A04': row['QTYcomplete-A04'],
    Revision: row.Revision,
    Subsystem: row.Subsystem,
    Vendor: row.Vendor,
    'Weight(lbs)': row['Weight(lbs)'],
    hideRow: row.hideRow,
    id: row.id,
    inAssy: row.inAssy,
    inIndex: row.inIndex,
    inSubsystem: row.inSubsystem,
    order: row.order,
  };
}

function rowToPart(row: any): Part {
  return {
    Analysis: row.Analysis,
    Assy: row.Assy,
    'Assy Weight (lbs)': row['Assy Weight (lbs)'],
    COTS: row.COTS,
    COTSnum: row.COTSnum,
    Car: row.Car,
    Color: row.Color,
    Condition: row.Condition,
    DXF: row.DXF,
    Division: row.Division,
    DocType: row.DocType,
    Drawing: row.Drawing,
    'Drawing Rev': row['Drawing Rev'],
    FileName: row.FileName,
    Index: row.Index,
    Material: row.Material,
    Model: row.Model,
    Name: row.Name,
    'Order Date': row['Order Date'],
    Owner: row.Owner,
    PDF: row.PDF,
    PartNum: row.PartNum,
    'Primary Key': row['Primary Key'],
    'QTY Backups': row['QTY Backups'],
    'QTY On-car': row['QTY On-car'],
    'QTYcomplete-A01': row['QTYcomplete-A01'],
    'QTYcomplete-A02': row['QTYcomplete-A02'],
    'QTYcomplete-A03': row['QTYcomplete-A03'],
    'QTYcomplete-A04': row['QTYcomplete-A04'],
    Revision: row.Revision,
    Subsystem: row.Subsystem,
    Vendor: row.Vendor,
    'Weight(lbs)': row['Weight(lbs)'],
    hideRow: row.hideRow,
    id: row.id,
    inAssy: row.inAssy,
    inIndex: row.inIndex,
    inSubsystem: row.inSubsystem,
    order: row.order,
  };
}

function partToRow(part: Part): any {
  return {
    Analysis: part.Analysis ? part.Analysis.id : null,
    Assy: part.Assy,
    'Assy Weight (lbs)': part['Assy Weight (lbs)'],
    COTS: part.COTS ? part.COTS.id : null,
    COTSnum: part.COTSnum,
    Car: part.Car,
    Color: part.Color,
    Condition: part.Condition,
    DXF: part.DXF ? part.DXF.id : null,
    Division: part.Division,
    DocType: part.DocType ? part.DocType.id : null,
    Drawing: part.Drawing ? part.Drawing.id : null,
    'Drawing Rev': part['Drawing Rev'],
    FileName: part.FileName,
    Index: part.Index,
    Material: part.Material,
    Model: part.Model ? part.Model.id : null,
    Name: part.Name,
    'Order Date': part['Order Date'],
    Owner: part.Owner ? part.Owner.id : null,
    PDF: part.PDF ? part.PDF.id : null,
    PartNum: part.PartNum,
    'Primary Key': part['Primary Key'],
    'QTY Backups': part['QTY Backups'],
    'QTY On-car': part['QTY On-car'],
    'QTYcomplete-A01': part['QTYcomplete-A01'],
    'QTYcomplete-A02': part['QTYcomplete-A02'],
    'QTYcomplete-A03': part['QTYcomplete-A03'],
    'QTYcomplete-A04': part['QTYcomplete-A04'],
    Revision: part.Revision,
    Subsystem: part.Subsystem,
    Vendor: part.Vendor,
    'Weight(lbs)': part['Weight(lbs)'],
    hideRow: part.hideRow,
    id: part.id,
    inAssy: part.inAssy,
    inIndex: part.inIndex,
    inSubsystem: part.inSubsystem,
    order: part.order,
  };
}

function assemblyToRow(assembly: Assembly): any {
  return {
    Analysis: assembly.Analysis ? assembly.Analysis.id : null,
    Assy: assembly.Assy,
    'Assy Weight (lbs)': assembly['Assy Weight (lbs)'],
    COTS: assembly.COTS ? assembly.COTS.id : null,
    COTSnum: assembly.COTSnum,
    Car: assembly.Car,
    Color: assembly.Color,
    Condition: assembly.Condition,
    DXF: assembly.DXF ? assembly.DXF.id : null,
    Division: assembly.Division,
    DocType: assembly.DocType ? assembly.DocType.id : null,
    Drawing: assembly.Drawing ? assembly.Drawing.id : null,
    'Drawing Rev': assembly['Drawing Rev'],
    FileName: assembly.FileName,
    Index: assembly.Index,
    Material: assembly.Material,
    Model: assembly.Model ? assembly.Model.id : null,
    Name: assembly.Name,
    'Order Date': assembly['Order Date'],
    Owner: assembly.Owner ? assembly.Owner.id : null,
    PDF: assembly.PDF ? assembly.PDF.id : null,
    PartNum: assembly.PartNum,
    'Primary Key': assembly['Primary Key'],
    'QTY Backups': assembly['QTY Backups'],
    'QTY On-car': assembly['QTY On-car'],
    'QTYcomplete-A01': assembly['QTYcomplete-A01'],
    'QTYcomplete-A02': assembly['QTYcomplete-A02'],
    'QTYcomplete-A03': assembly['QTYcomplete-A03'],
    'QTYcomplete-A04': assembly['QTYcomplete-A04'],
    Revision: assembly.Revision,
    Subsystem: assembly.Subsystem,
    Vendor: assembly.Vendor,
    'Weight(lbs)': assembly['Weight(lbs)'],
    hideRow: assembly.hideRow,
    id: assembly.id,
    inAssy: assembly.inAssy,
    inIndex: assembly.inIndex,
    inSubsystem: assembly.inSubsystem,
    order: assembly.order,
  };
}

export type { Vehicle, Subsystem, Assembly, Part, User, TableRow };
export { rowToAssembly, rowToPart, partToRow, assemblyToRow };