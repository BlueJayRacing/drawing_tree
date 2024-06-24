import React from 'react';
import { Modal, TextInput, Select, Button, NumberInput, Switch } from '@mantine/core';
import { useForm } from '@mantine/form';
import { TableRow } from '../types/types';

interface EditRowModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (row: TableRow) => Promise<void>;
  row: TableRow;
}

export const EditRowModal: React.FC<EditRowModalProps> = ({
  isOpen,
  onClose,
  onSave,
  row,
}) => {
  const form = useForm({
    initialValues: row,
  });

  const handleSubmit = form.onSubmit(async (values) => {
    await onSave(values);
    onClose();
  });

  const isPart = row.DocType !== '1669745'; // Assuming '1669745' is the ID for 'M' (Assembly)

  return (
    <Modal opened={isOpen} onClose={onClose} title={isPart ? 'Edit Part' : 'Edit Assembly'}>
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
        {isPart && (
          <>
            <TextInput label="Material" {...form.getInputProps('Material')} />
            <NumberInput label="QTY On-car" min={0} {...form.getInputProps('QTY On-car')} />
            <TextInput label="Condition" {...form.getInputProps('Condition')} />
            <TextInput label="Vendor" {...form.getInputProps('Vendor')} />
            <NumberInput label="QTY Backups" min={0} {...form.getInputProps('QTY Backups')} />
          </>
        )}
        <NumberInput label="inSubsystem" min={0} {...form.getInputProps('inSubsystem')} />
        <NumberInput label="inAssy" min={0} {...form.getInputProps('inAssy')} />
        <NumberInput label="inIndex" min={0} {...form.getInputProps('inIndex')} />
        <NumberInput label="Division" min={0} {...form.getInputProps('Division')} />
        <TextInput label="Weight(lbs)" {...form.getInputProps('Weight(lbs)')} />
        <TextInput label="Assy Weight (lbs)" {...form.getInputProps('Assy Weight (lbs)')} />
        <Switch label="Hide Row" {...form.getInputProps('hideRow', { type: 'checkbox' })} />
        <Button type="submit" mt="md">Save Changes</Button>
      </form>
    </Modal>
  );
};