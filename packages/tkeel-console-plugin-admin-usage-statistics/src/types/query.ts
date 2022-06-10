interface ValueItem {
  timestamp: number;
  value: number;
}

interface ResultItem {
  metric: Record<string, unknown>;
  value: ValueItem | null;
  values: ValueItem[];
}

interface QueryItem {
  query: string;
  result: ResultItem[];
  result_type: string;
}

interface ValueItemMap {
  [name: string]: ValueItem | undefined;
}

interface ValueItemsMap {
  [name: string]: ValueItem[];
}

export type { QueryItem, ValueItem, ValueItemMap, ValueItemsMap };
