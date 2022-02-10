export type DeviceValueType = {
  name: string;
  parent: string;
  ext?: {
    [propName: string]: any;
  };
  directConnection?: number;
  useTemplate: boolean;
  selfLearn: boolean;
  desc: string;
};
