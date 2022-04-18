export type CommandParamFormField = {
  name: string;
  id: string;
  type: string;
  fields: { key: string; label: string; value: unknown; type: string }[];
};

export enum ParamType {
  INPUT = 'input',
  OUTPUT = 'output',
}
