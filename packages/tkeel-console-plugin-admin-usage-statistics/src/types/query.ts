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

export type { QueryItem };
