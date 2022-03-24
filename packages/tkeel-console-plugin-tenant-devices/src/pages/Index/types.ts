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
  parentName: string;
  templateId?: string;
  templateName?: string;
  // useTemplate?: boolean;
  // selfLearn?: boolean;
  extendInfo: { label: string; value: string }[];
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
    [propName: string]: string;
  };
  selfLearn?: boolean;
  parentId?: string;
  parentName?: string;
  directConnection?: boolean;
  templateId?: string;
  templateName?: string;
}

export type TreeNodeData = {
  name?: string;
  title: ReactNode;
  key: string;
  children: TreeNodeData[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export enum RwOptions {
  R = 'r',
  W = 'w',
  RW = 'rw',
}
