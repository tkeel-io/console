import { ReactNode } from 'react';

import {
  NodeInfo,
  TreeNodeType,
} from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useGroupTreeQuery';

export enum ConnectInfoType {
  useTemplate = 'useTemplate',
  selfLearn = 'selfLearn',
}

export enum ConnectOption {
  DIRECT = '直连',
  // INDIRECT = '非直连',
}
export type DeviceFormFields = {
  name: string;
  parentId: string;
  parentName?: string;
  extendInfo: any[];
  connectType?: string;
  connectInfo?: ConnectInfoType[];
  description: string;
};

export enum ModalType {
  GROUP = 'group',
  DEVICE = 'device',
}

export enum ModalMode {
  CREATE = 'create',
  EDIT = 'edit',
}

export interface DeviceDefaultInfoType {
  id?: string;
  description?: string;
  name?: string;
  ext?: {
    [propName: string]: unknown;
  };
  selfLearn?: boolean;
  parentId?: string;
  parentName?: string;
  directConnection?: boolean;
  templateId?: string;
}

export type TreeNodeData = {
  name?: string;
  title: ReactNode;
  key: string;
  children: TreeNodeData[];
  icon?: any;
  originData?: {
    nodeInfo: NodeInfo;
    subNode: TreeNodeType;
  };
};

export type GroupOptions = {
  title: string;
  key: string;
  children: GroupOptions[];
};
