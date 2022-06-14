interface ValueItem {
  timestamp: number;
  value: number;
}

interface ResItem {
  metric: Record<string, unknown>;
  value: ValueItem | null;
  values: ValueItem[];
}

interface Result {
  query: string;
  result: [ResItem];
  result_type: string;
}

interface ValueItemMap {
  [name: string]: ValueItem | undefined;
}

interface ValueItemsMap {
  [name: string]: ValueItem[];
}

interface TimestampItem {
  timestamp: number;
  [name: string]: number;
}

interface TimestampItemMap {
  [timestamp: number]: TimestampItem;
}

export type {
  Result,
  TimestampItem,
  TimestampItemMap,
  ValueItem,
  ValueItemMap,
  ValueItemsMap,
};
