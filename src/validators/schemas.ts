import { z } from "zod";
import { v4 as uuidv4 } from "uuid"; // Importa uuid

// Esquema para una tarea (Task)
export const taskSchema = z.object({
  id: z.string().default(() => uuidv4()), // Genera un UUID por defecto
  title: z.string().min(1, "Task title is required").default("New Task"), // Valor predeterminado
  state: z
    .enum(["BACKLOG", "IN_PROGRESS", "IN_REVIEW", "COMPLETED"])
    .default("BACKLOG"), // Estado predeterminado
  image: z.string().url("Task image must be a valid URL").optional(), // URL opcional
  tags: z
    .array(
      z.object({
        id: z.string().default(() => uuidv4()), // UUID para cada tag
        name: z.string().default("Default Tag"),
        color: z.string().default("blue"),
      })
    )
    .optional()
    .default([]), // Array vacío por defecto
  createdAt: z
    .string()
    .datetime("Invalid date format")
    .default(() => new Date().toISOString()), // Fecha actual
  updatedAt: z.string().datetime("Invalid date format").optional(),
});

// Esquema para la creación de boards
export const createBoardSchema = z.object({
  id: z.string().default(() => uuidv4()), // Genera un UUID por defecto
  title: z
    .string()
    .min(1, "Title is required")
    .max(30, "Title must be 30 characters or less")
    .default("New Board"), // Título predeterminado
  logo: z
    .string()
    .min(1, "Logo is required")
    .url("Logo must be a valid URL")
    .default("https://picsum.photos/100"), // Logo por defecto
  tasks: z.array(taskSchema).optional().default([]), // Array de tareas vacío por defecto
  createdAt: z.string().default(() => new Date().toISOString()), // Fecha actual
  updatedAt: z.string().default(() => new Date().toISOString()), // Fecha actual
});

// Tipos inferidos a partir de los esquemas
export type TaskFormData = z.infer<typeof taskSchema>;
export type CreateBoardFormData = z.infer<typeof createBoardSchema>;
