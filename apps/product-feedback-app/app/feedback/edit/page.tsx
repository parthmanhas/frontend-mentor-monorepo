import Input from "@/app/components/Input";
import Dropdown from "@/app/components/DropDown";
import TextArea from "@/app/components/TextArea";
import Button from "@/app/components/Button";
import { FaPen, FaChevronLeft } from 'react-icons/fa';

export default function Page() {
    return (
        <div className="m-5">
            <Button className="mb-8" variant="none">
                <div className="flex items-center">
                    <FaChevronLeft color="blue" className="mr-2" />
                    <p className="text-waikawa-gray-700 font-semibold">Go Back</p>
                </div>
            </Button>
            <div className="rounded-md text-black h-fit bg-white mt-8 p-5 relative">
                <div className="w-50 h-50 rounded-full text-white bg-purple-500 absolute p-4 -top-6 left-5">
                    <FaPen size={20} />
                </div>

                <h1 className="text-east-bay-900 my-8">Editing feedback title</h1>
                <Input className="mb-5" title="Feedback Title" subtitle="Add a short, descriptive, headline" />
                <Dropdown className="mb-5 z-20" title="Category" subtitle="Choose a category for your feedback" heading="Category" options={['Option1', 'Option2']} />
                <Dropdown className="mb-5" title="Update Status" subtitle="Change Feedback state" heading="Update Status" options={['Status1', 'Status2']} />
                <TextArea title="Feedback Detail" subtitle="Include any specific comments on what should be improved, added, etc." />
                <div className="md:flex md:justify-between mt-7">
                    <Button variant="red" className="text-white font-semibold justify-center w-full mb-4 md:mb-0 md:w-fit">Delete</Button>
                    <div className="md:flex">
                        <Button variant="east-bay" className="text-white font-semibold mr-3 w-full justify-center md:w-fit mb-4 md:mb-0">Cancel</Button>
                        <Button className="text-white font-semibold justify-center w-full md:mb-0">Add Feedback</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}