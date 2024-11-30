import HomePage from "@/components/home/HomePage";

const Page = ({ }) => {
    try {
        return <div className="w-full h-full">
            <HomePage />
        </div>;
    } catch (e) {
        console.log(e);
    }
};

export default Page;
