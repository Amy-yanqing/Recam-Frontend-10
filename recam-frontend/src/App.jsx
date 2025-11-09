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
        </Route>
      </Routes>
    </>
  );

}

export default App;



