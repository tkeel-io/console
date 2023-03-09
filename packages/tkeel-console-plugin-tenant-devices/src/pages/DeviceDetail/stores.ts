// cspell: disable-next-line
import { create } from 'zustand';

import type { TelemetryTableItem } from './components/TelemetryData/TelemetryDataTable';

interface TelemetryTableRowDataStore {
  rowData: TelemetryTableItem | null;
  setRowData: (rowData: TelemetryTableItem | null) => void;
}

export const useTelemetryTableRowDataStore = create<TelemetryTableRowDataStore>(
  (set) => ({
    rowData: null,
    setRowData: (rowData) => set({ rowData }),
  })
);
