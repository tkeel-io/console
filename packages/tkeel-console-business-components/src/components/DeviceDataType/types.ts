import { UseFieldArrayReturn, UseFormReturn } from 'react-hook-form';

import { TelemetryFormFields } from '@tkeel/console-request-hooks';

import { CommandParamFormField } from '../DeviceCommandModal/components/CommandParamModal/types';

export interface TelemetryFormField extends TelemetryFormFields {
  fields: { key: string; label: string; value: unknown; type: string }[];
  extendInfo: { label: string; value: string }[];
}

export type FormFieldType =
  | UseFormReturn<TelemetryFormField, object>
  | UseFormReturn<CommandParamFormField, object>;

export type FieldArrayHandler =
  | UseFieldArrayReturn<TelemetryFormField, 'fields'>
  | UseFieldArrayReturn<CommandParamFormField, 'fields'>;

export type DataTypeKey =
  | 'max'
  | 'min'
  | 'step'
  | 'unit'
  | '0'
  | '1'
  | 'length';
