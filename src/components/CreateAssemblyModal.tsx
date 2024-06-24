import React from 'react';
import { Modal, TextInput, Select, Button, NumberInput, Switch } from '@mantine/core';
import { useForm } from '@mantine/form';
import { TableRow } from '../types/types';
import { generateAssemblyNumber } from '../services/partNumberService';

interface CreateAssemblyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateAssembly: (assembly: TableRow) => Promise<void>;
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
  const form = useForm({
    initialValues: {
      Car: vehicle === '20xt' ? '20' : '21',
      DocType: '1669745', // M
      COTSnum: '',
      COTS: '1669811', // CUST
      Revision: '-',
      Owner: '1669852', // aziegle6
      Model: '1669884', // Not Started
      Analysis: '1669908', // Not Started
      Drawing: '1669913', // Not Started
      PDF: '1669918', // Not Started
      DXF: '1669923', // Not Started
      'Drawing Rev': '-',
      'Order Date': new Date().toISOString().split('T')[0],
      inSubsystem: 0,
      inAssy: 0,
      inIndex: 0,
      Division: 0,
      Name: '',
      'Weight(lbs)': '0.00',
      'Assy Weight (lbs)': '0.00',
      hideRow: false,
    },
  });

  const handleSubmit = form.onSubmit(async (values) => {
    const assemblyNumber = generateAssemblyNumber(values, fetchedRows);
    const newAssembly: TableRow = {
      ...values,
      PartNum: assemblyNumber,
    };
    await onCreateAssembly(newAssembly);
    onClose();
  });

  return (
    <Modal opened={isOpen} onClose={onClose} title="Create New Assembly">
      <form onSubmit={handleSubmit}>
        <TextInput label="Name" required {...form.getInputProps('Name')} />
        <Select
          label="Doc Type"
          data={[
            { value: '1669745', label: 'M' },
            { value: '1669746', label: 'J' },
            { value: '1669747', label: 'E' },
            { value: '1669748', label: 'T' },
          ]}
          required
          {...form.getInputProps('DocType')}
        />
        <Select
          label="COTS Type"
          data={[
            { value: '1669811', label: 'CUST' },
            { value: '1669812', label: 'COTS' },
            { value: '1669813', label: 'MODCOTS' },
          ]}
          required
          {...form.getInputProps('COTS')}
        />
        <TextInput label="COTS #" {...form.getInputProps('COTSnum')} />
        <Select
          label="Owner"
          data={[
            { value: '1669852', label: 'aziegle6' },
            { value: '1669853', label: 'znepomu1' },
            // ... (add other options)
          ]}
          required
          {...form.getInputProps('Owner')}
        />
        <NumberInput label="inSubsystem" min={0} {...form.getInputProps('inSubsystem')} />
        <TextInput label="Weight(lbs)" {...form.getInputProps('Weight(lbs)')} />
        <TextInput label="Assy Weight (lbs)" {...form.getInputProps('Assy Weight (lbs)')} />
        <Switch label="Hide Row" {...form.getInputProps('hideRow', { type: 'checkbox' })} />
        <Button type="submit" mt="md">Create Assembly</Button>
      </form>
    </Modal>
  );
};