import type { JSONSchemaType } from 'ajv';

// API

interface Data {
  [propName: string]: number | string;
}

type Schema = JSONSchemaType<Data>;

// custom

interface NumberProperty {
  type: 'number';
  title: string;
  description?: string;
  default?: number;
  multipleOf?: number;
  minimum?: number;
  maximum?: number;
}

interface StringProperty {
  type: 'string';
  title: string;
  description?: string;
  default?: number;
}

type Property = NumberProperty | StringProperty;

interface Properties {
  [propName: string]: Property;
}

export type { Data, Properties, Schema };
