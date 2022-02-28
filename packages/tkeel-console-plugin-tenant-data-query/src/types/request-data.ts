export default interface RequestData {
  page_name?: number;
  page_size?: number;
  order_by?: string;
  is_descending?: boolean;
  query?: string;
  condition: {
    field: string;
    operator: string;
    value: unknown;
  }[];
}
