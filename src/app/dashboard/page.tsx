import HomePage from "@/components/home/HomePage";

const Page = ({ }) => {
    try {
        return <div className="">
            <HomePage />
        </div>;
    } catch (e) {
        console.log(e);
    }
};

export default Page;
