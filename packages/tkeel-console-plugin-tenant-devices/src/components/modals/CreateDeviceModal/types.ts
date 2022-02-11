export enum ConnectInfoType {
  useTemplate = 'useTemplate',
  selfLearn = 'selfLearn',
}
export type DeviceValueType = {
  name: string;
  parent: string;
  ext: {
    [propName: string]: string;
  };
  directConnection?: string;
  useTemplate?: boolean;
  selfLearn?: boolean;
  connectOption: ConnectInfoType[];
  desc: string;
  extendItemValue?: string;
};
