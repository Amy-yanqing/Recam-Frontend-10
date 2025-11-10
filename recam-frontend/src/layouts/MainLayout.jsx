import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";

export default function MainLayout() {

    return (
        <div className="min-h-screen flex flex-col bg-white">
            {/* Common Header */}
            <Header />

            {/* Subpage rendering area */}
            <main>
                <Outlet />
            </main>
        </div>
    )
}