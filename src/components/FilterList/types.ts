export interface FilterListProps {
  title: string;
  data?: Array<string>;
  onSelectedChange: (item: any) => void;
  value: string | null;
}
