import { Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ListingCasesPage from "./pages/ListingCasePage";
import EditListingCasePage from "./pages/EditListingCasePage";
import AgentsPage from "./pages/AgentsPage";
import PhotographyCompanyPage from "./pages/photographyCompanyPage";
import PhotoUploadPage from "./pages/PhotoUploadPage";
import { Toaster } from 'react-hot-toast';
import MainLayout from "./layouts/MainLayout";
import FloorPlanUploadPage from "./pages/FloorPlanUploadPage";
import VideoUploadPage from "./pages/VideoUploadPage";
import VrUploadPage from "./pages/VrUploadPage";



function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        {/* Page with no Header */}
        <Route path="/" element={<LoginPage />} />

        {/* Page with the Header */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/listing-cases" element={<ListingCasesPage />} />
          <Route path="/all-agents" element={<AgentsPage />} />
          <Route path="/all-companies" element={<PhotographyCompanyPage />} />
          <Route path="/edit-listing/:id" element={<EditListingCasePage />} />
          <Route path="/photo-upload/:id" element={<PhotoUploadPage />} />
          <Route path="floorPlan-upload/:id" element={<FloorPlanUploadPage/>}/>
          <Route path="video-upload/:id" element={<VideoUploadPage/>}/>
          <Route path="vr-upload/:id" element={<VrUploadPage/>}/>
        </Route>
      </Routes>
    </>
  );

}

export default App;



