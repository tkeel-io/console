export type ReadWriteType = 'r' | 'w' | 'rw';

export type TelemetryItem = {
  define: {
    default_value: unknown;
    rw: ReadWriteType;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [propName: string]: any;
  };
  description: string;
  id: string;
  name: string;
  type: string;
  last_time: number;
};

export interface AttributeItem {
  define: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    default_value: any;
    rw: ReadWriteType;
  };
  name: string;
  id: string;
  type: string;
  description: string;
  last_time: number;
}

export interface CommandItem {
  define: {
    fields: {
      [propName: string]: {
        [propName: string]: unknown;
      };
    };
  };
  type: string;
  id: string;
  description: string;
  name: string;
  last_time: number;
}

export type AttributeValue = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propName: string]: any;
};

export type TelemetryValue = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propName: string]: any;
};
