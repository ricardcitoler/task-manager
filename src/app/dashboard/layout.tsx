
import HomeLayout from "@/components/home/HomeLayout";
import { boardsGenerator } from "../../../utils/generator";
import { Board } from "@/types/types";


const Page = async ({ children }: { children: React.ReactNode }) => {
    try {
        const initialBoards = await boardsGenerator();

        return (
            <HomeLayout initialBoards={initialBoards}>
                {children}
            </HomeLayout>
        );
    } catch (e: any) {
        console.log(e);
        if (e.response && e.response.data) {
            console.error("API Error:", e.response); // Log detailed error message
        } else {
            console.error("Error:", e.message); // Log generic error message
        }
    }
};

export default Page;