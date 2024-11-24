import { redirect } from "next/navigation";

export default function Page() {
  // Redirige automáticamente a /home
  redirect("/dashboard");
  return null; // Este return nunca se alcanza porque redirect finaliza el proceso
}
