import React, { useState, useEffect } from 'react';
import { Modal, TextInput, Select, Button, NumberInput, Box, Text, Alert } from '@mantine/core';
import { useForm } from '@mantine/form';
import { TableRow } from '../types/types';
import { generateAssemblyNumber } from '../services/partNumberService';
import { IconAlertCircle } from '@tabler/icons-react';
import { ownerOptions } from '../data/ownerData';

interface CreateAssemblyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateAssembly: (assembly: Partial<TableRow>) => Promise<void>;
  vehicle: string;
  fetchedRows: TableRow[];
}

export const CreateAssemblyModal: React.FC<CreateAssemblyModalProps> = ({
  isOpen,
  onClose,
  onCreateAssembly,
  vehicle,
  fetchedRows,
}) => {
  const [assemblyNumber, setAssemblyNumber] = useState('');
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    initialValues: {
      Car: vehicle === '20xt' ? '20' : '21',
      inSubsystem: NaN,
      Name: '',
      DocType: 'M',
      COTS: 'CUST',
      COTSnum: '',
      Owner: 'awong69',
      Division: 0,
    },
  });

  useEffect(() => {
    const values = form.values;
    try {
      const newAssemblyNumber = generateAssemblyNumber(values, fetchedRows);
      setAssemblyNumber(newAssemblyNumber);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      setAssemblyNumber('');
    }
  }, [form.values, fetchedRows]);

  const handleSubmit = form.onSubmit(async (values) => {
    try {
      const newAssembly: Partial<TableRow> = {
        ...values,
        // PartNum: assemblyNumber,
        inAssy: getNextInAssy(values.inSubsystem.toString(), fetchedRows),
        inIndex: 0,
        Revision: '-',
        Model: 'Not Started',
        Analysis: 'Not Started',
        Drawing: 'Not Started',
        PDF: 'Not Started',
        DXF: 'Not Started',
        'Drawing Rev': '-',
        'Order Date': '1111-11-11',
        'QTY On-car': 1,
        hideRow: false,
      };
      await onCreateAssembly(newAssembly);
      onClose();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred while creating the assembly');
      }
    }
  });

  const getNextInAssy = (subsystem: string, rows: TableRow[]): number => {
    let maxAssy = 0;
    rows.forEach(row => {
      if (row.inSubsystem.toString() === subsystem) {
        maxAssy = Math.max(maxAssy, row.inAssy);
      }
    });
    return maxAssy + 1;
  };

  return (
    <Modal opened={isOpen} onClose={onClose} title="Create New Assembly" size="lg">
      {error && (
        <Alert icon={<IconAlertCircle size="1rem" />} title="Error" color="red" mb="md">
          {error}
        </Alert>
      )}
      {assemblyNumber && (
        <Box mb="md" p="xs" style={{ backgroundColor: '#e6f7ff', border: '1px solid #1890ff', borderRadius: '4px' }}>
          <Text size="lg" weight={700} color="blue">Generated Assembly Number: {assemblyNumber}</Text>
        </Box>
      )}
      <form onSubmit={handleSubmit}>
        <NumberInput label="Existing Subsystem #" required {...form.getInputProps('inSubsystem')} />
        <TextInput label="Assy Name" required {...form.getInputProps('Name')} />
        <Select
          label="Document Type"
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
          label="COTS"
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
        <Button type="submit" mt="md" disabled={!!error}>Create Assembly</Button>
      </form>
    </Modal>
  );
};