import Button from "./Button";

export default function AddComment() {
    return <div className="w-full p-5 mt-5 rounded-md bg-white">
        <h1 className="text-east-bay-900">Add Comment</h1>
        <textarea className="w-full bg-white-lilac-50 rounded my-4 h-[100px] outline-royal-blue-500 p-4 text-east-bay-900"></textarea>
        <div className="w-full flex justify-between">
            <p className="text-waikawa-gray-700 items-center">225 characters left</p>
            <Button variant="purple">Post Comment</Button>
        </div>
    </div>
}