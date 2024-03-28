import Button from "@/app/components/Button";
import DropDown from "@/app/components/DropDown";
import { FaCheck, FaPlus, FaChevronLeft } from 'react-icons/fa';

export default function Page() {
    return (
        <div className="m-5 flex justify-center">
            <div className="max-w-lg">
                <Button className="mb-8" variant="none">
                    <div className="flex items-center">
                        <FaChevronLeft color="blue" className="mr-2" />
                        <p className="text-waikawa-gray-700 font-semibold">Go Back</p>
                    </div>
                </Button>
                <div className="p-5 bg-white rounded-md text-east-bay-900 relative">
                    <div className="absolute -top-6 w-[50px] h-[50px] rounded-full flex justify-center items-center bg-purple-400">
                        <FaPlus size={25} color="white" />
                    </div>
                    <h1 className="my-5">Create New Feedback</h1>
                    <div>
                        <h3>Feedback Title</h3>
                        <p className="mt-1">Add a short, descriptive headline</p>
                        <textarea className="bg-zircon-50 rounded-md w-full my-4 p-4 outline-royal-blue-500"></textarea>
                    </div>
                    <div>
                        <h3>Category</h3>
                        <p className="mt-1">Choose a category for your feedback</p>
                        <DropDown heading="Category:" options={["Feature", "UI", "UX", "Enhancement", "Bug"]} className="my-8"></DropDown>
                    </div>
                    <div>
                        <h3>Feedback Detail</h3>
                        <p className="mt-1">Include any specific comments on what should be improved, added, etc.</p>
                        <textarea className="bg-zircon-50 rounded-md w-full my-4 h-[150px] p-4 outline-royal-blue-500"></textarea>
                    </div>
                    <Button className="w-full mb-5 text-white semibold py-3" variant="purple"><span className="w-full">Add Feedback</span></Button>
                    <Button className="w-full text-white semibold py-3" variant="east-bay"><span className="w-full">Cancel</span></Button>
                </div>
            </div>
        </div>
    )
}