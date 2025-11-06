import { useNavigate } from "react-router-dom";
export default function ModuleCard({ title, icon, to }) {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(to)}
            className="flex flex-col justify-center items-center 
      hover:bg-blue-400 transition shadow-sm cursor-pointer mt-4 w-40 h-30 border border-blue-100 bg-blue-200 border-opacity-40 rounded-xl p-6 ">
            <div>{icon}</div>
            <div className="font-md text-center">{title}</div>
        </div>
    )

}
