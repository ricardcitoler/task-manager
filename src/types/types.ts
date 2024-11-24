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

type TaskState = "BACKLOG" | "IN_PROGRESS" | "IN_REVIEW" | "COMPLETED";
