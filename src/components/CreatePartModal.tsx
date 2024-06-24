import React, { useState, useEffect } from 'react';
import { Modal, TextInput, Select, Button, NumberInput, Box, Text, Alert } from '@mantine/core';
import { useForm } from '@mantine/form';
import { TableRow } from '../types/types';
import { generatePartNumber } from '../services/partNumberService';
import { IconAlertCircle } from '@tabler/icons-react';
import { ownerOptions } from '../data/ownerData';

interface CreatePartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePart: (part: Partial<TableRow>) => Promise<void>;
  vehicle: string;
  fetchedRows: TableRow[];
}

export const CreatePartModal: React.FC<CreatePartModalProps> = ({
  isOpen,
  onClose,
  onCreatePart,
  vehicle,
  fetchedRows,
}) => {
  const [partNumber, setPartNumber] = useState('');
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    initialValues: {
      Car: vehicle === '20xt' ? '20' : '21',
      inSubsystem: NaN,
      inAssy: NaN,
      Name: '',
      DocType: 'M',
      COTS: 'CUST',
      COTSnum: '',
      Owner: 'awong69',
      Material: 'N/A',
      Condition: '',
      Vendor: '',
      'QTY On-car': 0,
      Division: 0,
    },
  });

  useEffect(() => {
    const values = form.values;
    try {
      const newPartNumber = generatePartNumber(values, fetchedRows);
      setPartNumber(newPartNumber);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      setPartNumber('');
    }
  }, [form.values, fetchedRows]);

  const handleSubmit = form.onSubmit(async (values) => {
    try {
      const newPart: Partial<TableRow> = {
        ...values,
        // PartNum: partNumber,
        inIndex: getNextInIndex(values.inSubsystem.toString(), values.inAssy.toString(), fetchedRows),
        'Order Date': '1111-11-11',
        DXF: 'Not Started',
        PDF: 'Not Started',
        Drawing: 'Not Started',
        Analysis: 'Not Started',
        Model: 'Not Started',
      };
      await onCreatePart(newPart);
      onClose();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred while creating the part');
      }
    }
  });

  const getNextInIndex = (subsystem: string, assy: string, rows: TableRow[]): number => {
    let maxIndex = 0;
    rows.forEach(row => {
      if (row.inSubsystem.toString() === subsystem && row.inAssy.toString() === assy) {
        maxIndex = Math.max(maxIndex, row.inIndex);
      }
    });
    return maxIndex + 1;
  };

  return (
    <Modal opened={isOpen} onClose={onClose} title="Create New Part" size="lg">
      {error && (
        <Alert icon={<IconAlertCircle size="1rem" />} title="Error" color="red" mb="md">
          {error}
        </Alert>
      )}
      {partNumber && (
        <Box mb="md" p="xs" style={{ backgroundColor: '#e6f7ff', border: '1px solid #1890ff', borderRadius: '4px' }}>
          <Text size="lg" weight={700} color="blue">Generated Part Number: {partNumber}</Text>
        </Box>
      )}
      <form onSubmit={handleSubmit}>
        <NumberInput label="Subsystem #" required {...form.getInputProps('inSubsystem')} />
        <NumberInput label="Assembly #" required {...form.getInputProps('inAssy')} />
        <TextInput label="Part Name" required {...form.getInputProps('Name')} />
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
        <TextInput label="Material" {...form.getInputProps('Material')} />
        <TextInput label="Condition" {...form.getInputProps('Condition')} />
        <TextInput label="Vendor" {...form.getInputProps('Vendor')} />
        <NumberInput label="Total Qty" min={0} {...form.getInputProps('QTY On-car')} />
        <Button type="submit" mt="md" disabled={!!error}>Create Part</Button>
      </form>
    </Modal>
  );
};