import { Board, Tags, Task } from "@/types/types";

// Palabras para generar títulos significativos
const adjectives = [
  "Creative",
  "Dynamic",
  "Efficient",
  "Agile",
  "Innovative",
  "Strategic",
  "Focused",
  "Organized",
  "Collaborative",
];
const nouns = [
  "Project",
  "Sprint",
  "Team",
  "Workflow",
  "Board",
  "Roadmap",
  "Plan",
  "Strategy",
  "Tasks",
  "Goals",
];

// Predefine un array con URLs de imágenes únicas
const imageURLs = Array.from({ length: 10 }).map(
  (_, i) => `https://picsum.photos/id/${i + 1}/200/300`
);

// Función para obtener una imagen aleatoria del array
const getRandomImageFromSet = (): string => {
  const randomIndex = Math.floor(Math.random() * imageURLs.length);
  return imageURLs[randomIndex];
};

// Generar un título aleatorio para un board
const generateBoardTitle = (): string => {
  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${randomAdjective} ${randomNoun}`;
};

// Generar tags aleatorios
const generateRandomTags = (): Tags[] => {
  const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
  return Array.from({ length: Math.floor(Math.random() * 4) + 1 }).map(() => ({
    id: crypto.randomUUID(),
    name: `Tag ${Math.random().toString(36).substring(7)}`,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));
};

// Generar tareas aleatorias
const generateRandomTasks = async (): Promise<Task[]> => {
  const states = ["BACKLOG", "IN_PROGRESS", "IN_REVIEW", "COMPLETED"];
  const tasks = Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map(
    async () => {
      const hasImage = Math.random() > 0.5; // 50% de probabilidad de tener imagen
      return {
        id: crypto.randomUUID(),
        title: `Task ${Math.random().toString(36).substring(7)}`,
        state: states[Math.floor(Math.random() * states.length)] as any,
        image: hasImage ? getRandomImageFromSet() : undefined, // Imagen aleatoria
        tags: generateRandomTags(),
        createdAt: new Date().toISOString(),
        updatedAt: undefined,
      };
    }
  );
  return Promise.all(tasks);
};

// Generar boards aleatorios
export const boardsGenerator = async (): Promise<Board[]> => {
  const boards = Array.from({ length: 13 }).map(async () => ({
    id: crypto.randomUUID(),
    title: generateBoardTitle(), // Títulos significativos
    tasks: await generateRandomTasks(),
    logo: getRandomImageFromSet(), // Logo aleatorio
    createdAt: new Date().toISOString(),
    updatedAt: undefined,
  }));
  return Promise.all(boards);
};

// Exportar el array de imágenes para reutilizarlo
export { imageURLs };
