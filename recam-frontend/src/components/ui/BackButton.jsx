import { useNavigate } from "react-router-dom"

export default function BackButton({ to }) {
    const navigate = useNavigate();
    return (
        <button
            onClick={() => navigate(to)}
            className="text-blue-600 font-semibold hover:underline">
            Back
        </button>
    )
}

