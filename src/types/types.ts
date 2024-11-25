export interface Board {
  id: string;
  title: string;
  tasks?: Task[];
  logo?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Task {
  id: string;
  title: string;
  state: TaskState;
  image?: string;
  tags?: Tags[];
  createdAt: string;
  updatedAt?: string;
}

export interface Tags {
  id: string;
  name: string;
  color: string;
}

export interface ColumnType {
  name: string;
  tasks: Task[];
}

export type TaskState = "BACKLOG" | "IN_PROGRESS" | "IN_REVIEW" | "COMPLETED";
