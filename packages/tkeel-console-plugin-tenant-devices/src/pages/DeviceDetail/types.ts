export type TelemetryRelationItem = {
  name: string;
  id: string;
  deviceName?: string;
  deviceId?: string;
  telemetryName?: string;
  telemetryId?: string;
  icon: boolean;
};

export type AttributeRelationItem = {
  name: string;
  id: string;
  deviceName?: string;
  deviceId?: string;
  attributeName?: string;
  attributeId?: string;
  icon: boolean;
};

export interface ExpressionItem {
  description: string;
  expression: string;
  name: string;
  path: string;
}
