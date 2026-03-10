export interface Experience {
  id: number;
  company: string;
  role: string;
  description: string;
  tags: string[];
  start_date: string;
  end_date: string | null;
  location: string | null;
}
