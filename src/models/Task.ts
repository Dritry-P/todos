export interface Task {
    id: number;
    title: string;
    description: string;
    status: 'completed' | 'pending';
    file?: File | null;
  }
  