export enum ConnectInfoType {
  useTemplate = 'useTemplate',
  selfLearn = 'selfLearn',
}

export enum ConnectOption {
  DIRECT = '直连',
  // INDIRECT = '非直连',
}
export type DeviceValueType = {
  name: string;
  parentId: string;
  extendInfo: any[];
  directConnection?: string;
  connectInfo: ConnectInfoType[];
  description: string;
};

export enum CreateType {
  GROUP = 'group',
  DEVICE = 'device',
}
