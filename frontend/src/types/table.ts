import { ReactNode } from "react";

export type Column<T> = {
  key: keyof T;
  label: string;
  sortable?: boolean;
  editable?: boolean;
  options?: { id: string; name: string }[];
  render?: (value: unknown, item: T) => ReactNode;
}; 