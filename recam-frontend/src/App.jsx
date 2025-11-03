import { Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ListingCasesPage from "./pages/ListingCasePage";
import EditListingCasePage from "./pages/EditListingCasePage";
import AgentsPage from "./pages/AgentsPage";
import PhotographyCompanyPage from "./pages/photographyCompanyPage";
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/listing-cases" element={<ListingCasesPage />} />
        <Route path="/all-agents" element={<AgentsPage />} />
        <Route path="/all-companies" element={<PhotographyCompanyPage />} />
        <Route path="/edit-listing/:id" element={<EditListingCasePage />} />
      </Routes>
    </>
  );

}

export default App;



