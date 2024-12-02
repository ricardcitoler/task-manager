import HomeLayout from "@/components/home/HomeLayout";
import { boardsGenerator } from "../../../mocs/generator";

const Layout = async ({ children }: { children: React.ReactNode }) => {
    try {
        const initialBoards = await boardsGenerator();

        return (
            <HomeLayout initialBoards={initialBoards}>
                {children}
            </HomeLayout>
        );
    } catch (e: unknown) {
        // Validación de tipo para errores
        if (e instanceof Error) {
            console.error("Error:", e.message); // Log genérico para errores conocidos

            // Validar si el error tiene una propiedad 'response'
            if (
                typeof (e as any).response === "object" &&
                (e as any).response?.data
            ) {
                console.error("API Error:", (e as any).response);
            }
        } else {
            console.error("Unexpected error:", e);
        }
    }
};

export default Layout;
