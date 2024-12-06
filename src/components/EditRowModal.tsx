import React, { useState, useEffect } from 'react';
import { Modal, TextInput, Select, Button, NumberInput, Box, Text, Alert } from '@mantine/core';
import { useForm } from '@mantine/form';
import { TableRow } from '../types/types';
import { generatePartNumber, generateAssemblyNumber } from '../services/partNumberService';
import { IconAlertCircle } from '@tabler/icons-react';
import { ownerOptions } from '../data/ownerData';

interface EditRowModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (row: TableRow) => Promise<void>;
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any;
  fetchedRows: TableRow[];
}

export const EditRowModal: React.FC<EditRowModalProps> = ({
  isOpen,
  onClose,
  onSave,
  row,
  fetchedRows,
}) => {
  const [partNumber, setPartNumber] = useState(row.PartNum || '');
  const [fileName, setFileName] = useState(row.FileName || '');
  const [error, setError] = useState<string | null>(null);

  const isAssembly = row.inAssy === 0;

  const form = useForm({
    initialValues: {
      id: row.id,

      Name: row.Name,
      Revision: row.Revision,
      'Drawing Rev': row['Drawing Rev'],
      Weight: row.Weight,
      'Assy Weight': row['Assy Weight'],
      Material: row.Material,
      Condition: row.Condition,
      Vendor: row.Vendor,

      DocType: row.DocType.valueOf().value,
      COTS: row.COTS.valueOf().value,
      Owner: row.Owner.valueOf().value,

      inSubsystem: row.inSubsystem,
      inAssy: row.inAssy,
      inIndex: row.inIndex,
      Division: row.Division,
      'QTY On-car': row['QTY On-car'] || '',
      'QTY Backups': row['QTY Backups'] || '',
      'Weight(lbs)': row['Weight(lbs)'] || '',
      'Assy Weight (lbs)': row['Assy Weight (lbs)'] || '',
      'Order Date': row['Order Date'] || '',

      'Analysis': row['Analysis'].valueOf().value,
      'Drawing': row['Drawing'].valueOf().value,
      'PDF': row['PDF'].valueOf().value,
      'DXF': row['DXF'].valueOf().value,
      'Model': row['Model'].valueOf().value,
    },
  });

  useEffect(() => {
    const values = form.values;
    try {
      if (fetchedRows && fetchedRows.length > 0) {
        const newPartNumber = isAssembly 
          ? generateAssemblyNumber(values, fetchedRows)
          : generatePartNumber(values, fetchedRows);
        setPartNumber(newPartNumber);
        setFileName(`${newPartNumber}_${values.Name.replace(/\s+/g, '_')}`);
        setError(null);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  }, [form.values, fetchedRows, isAssembly]);

  const handleSubmit = form.onSubmit(async (values) => {
    try {
      const updatedRow: TableRow = {
        ...values,
        // PartNum: partNumber,
        // FileName: fileName,
      };
      await onSave(updatedRow);
      onClose();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred while saving changes');
      }
    }
  });

  return (
    <Modal opened={isOpen} onClose={onClose} title={isAssembly ? 'Edit Assembly' : 'Edit Part'} size="lg">
      {error && (
        <Alert icon={<IconAlertCircle size="1rem" />} title="Error" color="red" mb="md">
          {error}
        </Alert>
      )}
      <Box mb="md" p="xs" style={{ backgroundColor: '#e6f7ff', border: '1px solid #1890ff', borderRadius: '4px' }}>
        <Text size="lg" weight={700} color="blue">Part Number: {partNumber}</Text>
        <Text size="lg" weight={700} color="blue">File Name: {fileName}</Text>
      </Box>
      <form onSubmit={handleSubmit}>
        <TextInput label="Name" required {...form.getInputProps('Name')} />
        <Select
          label="Doc Type"
          data={[
            { value: 'M', label: 'M' },
            { value: 'J', label: 'J' },
            { value: 'E', label: 'E' },
            { value: 'T', label: 'T' },
          ]}
          required
          {...form.getInputProps('DocType')}
        />
        <Select
          label="COTS Type"
          data={[
            { value: 'CUST', label: 'CUST' },
            { value: 'COTS', label: 'COTS' },
            { value: 'MODCOTS', label: 'MODCOTS' },
          ]}
          required
          {...form.getInputProps('COTS')}
        />
        <TextInput label="COTS #" {...form.getInputProps('COTSnum')} />
        <Select
          label="Owner"
          data={ownerOptions}
          required
          {...form.getInputProps('Owner')}
        />
        <NumberInput label="Subsystem #" required {...form.getInputProps('inSubsystem')} />
        <NumberInput label="Assembly #" required {...form.getInputProps('inAssy')} />
        <NumberInput label="Index" required {...form.getInputProps('inIndex')} />
        <TextInput label="Revision" {...form.getInputProps('Revision')} />
        <TextInput label="Drawing Rev" {...form.getInputProps('Drawing Rev')} />
        <TextInput label="Order Date" type="date" {...form.getInputProps('Order Date')} />
        <NumberInput label="Division" {...form.getInputProps('Division')} />
        <TextInput label="Weight(lbs)" {...form.getInputProps('Weight(lbs)')} />
        <TextInput label="Assy Weight (lbs)" {...form.getInputProps('Assy Weight (lbs)')} />
        {!isAssembly && (
          <>
            <TextInput label="Material" {...form.getInputProps('Material')} />
            <NumberInput label="QTY On-car" {...form.getInputProps('QTY On-car')} />
            <TextInput label="Condition" {...form.getInputProps('Condition')} />
            <TextInput label="Vendor" {...form.getInputProps('Vendor')} />
            <NumberInput label="QTY Backups" {...form.getInputProps('QTY Backups')} />
          </>
        )}
        <Select
          label="Model"
          data={[
            { value: 'Not Started', label: 'Not Started' },
            { value: 'Incomplete', label: 'Incomplete' },
            { value: 'In Review', label: 'In Review' },
            { value: 'Complete', label: 'Complete' },
            { value: 'N/A', label: 'N/A' },
          ]}
          {...form.getInputProps('Model')}
        />
        <Select
          label="Analysis"
          data={[
            { value: 'Not Started', label: 'Not Started' },
            { value: 'Incomplete', label: 'Incomplete' },
            { value: 'In Review', label: 'In Review' },
            { value: 'Complete', label: 'Complete' },
            { value: 'N/A', label: 'N/A' },
          ]}
          {...form.getInputProps('Analysis')}
        />
        <Select
          label="Drawing"
          data={[
            { value: 'Not Started', label: 'Not Started' },
            { value: 'Incomplete', label: 'Incomplete' },
            { value: 'In Review', label: 'In Review' },
            { value: 'Complete', label: 'Complete' },
            { value: 'N/A', label: 'N/A' },
          ]}
          {...form.getInputProps('Drawing')}
        />
        <Select
          label="PDF"
          data={[
            { value: 'Not Started', label: 'Not Started' },
            { value: 'Incomplete', label: 'Incomplete' },
            { value: 'In Review', label: 'In Review' },
            { value: 'Complete', label: 'Complete' },
            { value: 'N/A', label: 'N/A' },
          ]}
          {...form.getInputProps('PDF')}
        />
        <Select
          label="DXF"
          data={[
            { value: 'Not Started', label: 'Not Started' },
            { value: 'Incomplete', label: 'Incomplete' },
            { value: 'In Review', label: 'In Review' },
            { value: 'Complete', label: 'Complete' },
            { value: 'N/A', label: 'N/A' },
          ]}
          {...form.getInputProps('DXF')}
        />
        <Button type="submit" mt="md" disabled={!!error}>Save Changes</Button>
      </form>
    </Modal>
  );
};