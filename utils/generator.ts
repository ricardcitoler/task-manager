import { Board, Tags, Task, TaskState } from "@/types/types";

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
  "Task",
  "Goal",
  "Feature",
  "Update",
  "Issue",
  "Plan",
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

// Generar nombres plausibles para tareas
const generateTaskTitle = (): string => {
  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomNumber = Math.floor(Math.random() * 1000); // Añadir un número para más realismo
  return `${randomAdjective} ${randomNoun} #${randomNumber}`;
};

// Generar nombres de tags con una sola palabra
const generateTagName = (): string => {
  const allWords = [...adjectives, ...nouns];
  return allWords[Math.floor(Math.random() * allWords.length)];
};

// Generar tags aleatorios
const generateRandomTags = (): Tags[] => {
  const colors = [
    "red-300",
    "blue-300",
    "green-300",
    "yellow-300",
    "purple-300",
    "orange-300",
    "pink-300",
    "teal-300",
    "cyan-300",
    "lime-300",
  ];
  return Array.from({ length: Math.floor(Math.random() * 4) + 1 }).map(() => ({
    id: crypto.randomUUID(),
    name: generateTagName(), // Una sola palabra
    color: colors[Math.floor(Math.random() * colors.length)],
  }));
};

// Generar tareas aleatorias con al menos 3 tareas por estado
const generateRandomTasks = async (): Promise<Task[]> => {
  const states: TaskState[] = [
    "BACKLOG",
    "IN_PROGRESS",
    "IN_REVIEW",
    "COMPLETED",
  ];

  // Genera al menos 3 tareas por estado
  const tasksByState = states.flatMap((state) =>
    Array.from({ length: 3 }).map(() => ({
      id: crypto.randomUUID(),
      title: generateTaskTitle(), // Nombres plausibles
      state, // Aseguramos el tipo TaskState
      image: Math.random() > 0.5 ? getRandomImageFromSet() : undefined,
      tags: generateRandomTags(),
      createdAt: new Date().toISOString(),
      updatedAt: undefined,
    }))
  );

  // Genera tareas adicionales aleatorias
  const additionalTasks = Array.from({
    length: Math.floor(Math.random() * 5),
  }).map(() => {
    const randomState: TaskState =
      states[Math.floor(Math.random() * states.length)];
    return {
      id: crypto.randomUUID(),
      title: generateTaskTitle(), // Nombres plausibles
      state: randomState,
      image: Math.random() > 0.5 ? getRandomImageFromSet() : undefined,
      tags: generateRandomTags(),
      createdAt: new Date().toISOString(),
      updatedAt: undefined,
    };
  });

  return Promise.resolve([...tasksByState, ...additionalTasks]);
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
