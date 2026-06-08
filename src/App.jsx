// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // ADD THIS
import ProtectedRoute from "./components/ProtectedRoute"; // ADD THIS
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";
import AddFunds from "./pages/AddFunds";
import Rewards from "./pages/Rewards";
import TransactionPage from "./pages/TransactionPage";
import Layout from "./components/Layout"; 
import HomePage from "./pages/Home";
import MyProfile from "./pages/MyProfile";
import Navbar from './components/Navbar'
import NotFoundPage from "./pages/NotFound";
import Product from "./pages/Product";
import ProductsList from "./pages/ProductsList";
import EditProduct from "./pages/EditProduct";

function App() {
  return (
    <AuthProvider> {/* WRAP WITH THIS */}
      <Router>
        <Routes>
          {/* Public routes without layout */}
          <Route path="/signup" element={<><Navbar/><SignupPage /></>} />
          <Route path="/login" element={<><Navbar/><LoginPage /></>} />
          <Route path="/" element={<HomePage />} />
          
          {/* Protected routes with layout - JUST WRAP EACH WITH ProtectedRoute */}
          <Route 
            path="/home" 
            element={
              <ProtectedRoute> {/* ADD THIS */}
                <Dashboard />
              </ProtectedRoute> /* ADD THIS */
            } 
          /> 
          
          <Route 
            path="/send-money" 
            element={
              <ProtectedRoute> {/* ADD THIS */}
                <Layout 
                  showBackButton={true}
                  showQuickActions={true}
                >
                  <SendMoney />
                </Layout>
              </ProtectedRoute> /* ADD THIS */
            } 
          /> 

          <Route 
            path="/profile" 
            element={
              <ProtectedRoute> {/* ADD THIS */}
                <Layout 
                  title="My Profile"
                  subtitle="Manage your account settings"
                  showBackButton={true}
                  showQuickActions={true}
                >
                  <MyProfile />
                </Layout>
              </ProtectedRoute> /* ADD THIS */
            } 
          />
          
          <Route 
            path="/add-funds" 
            element={
              <ProtectedRoute> {/* ADD THIS */}
                <Layout 
                  showBackButton={true}
                  showQuickActions={true}
                >
                  <AddFunds />
                </Layout>
              </ProtectedRoute> /* ADD THIS */
            } 
          /> 
          
          <Route 
            path="/rewards" 
            element={
              <ProtectedRoute> {/* ADD THIS */}
                <Layout 
                  showBackButton={true}
                  showQuickActions={true}
                >
                  <Rewards />
                </Layout>
              </ProtectedRoute> /* ADD THIS */
            } 
          /> 
          
          <Route 
            path="/transactions" 
            element={
              <ProtectedRoute> {/* ADD THIS */}
                <Layout 
                  showBackButton={true}
                  showQuickActions={true}
                >
                  <TransactionPage />
                </Layout>
              </ProtectedRoute> /* ADD THIS */
            } 
          /> 
          <Route 
            path="/products" 
            element={
              <ProtectedRoute> {/* ADD THIS */}
                <Layout 
                  showBackButton={true}
                  showQuickActions={true}
                >
                  <Product/>
                </Layout>
              </ProtectedRoute> /* ADD THIS */
            } 
          /> 
          <Route 
            path="/products-list" 
            element={
              <ProtectedRoute> {/* ADD THIS */}
                <Layout 
                  showBackButton={true}
                  showQuickActions={true}
                >
                  <ProductsList/>
                </Layout>
              </ProtectedRoute> /* ADD THIS */
            } 
          /> 
          <Route 
            path="/products/edit/:id" 
            element={
              <ProtectedRoute> {/* ADD THIS */}
                <Layout 
                  showBackButton={true}
                  showQuickActions={true}
                >
                  <EditProduct/>
                </Layout>
              </ProtectedRoute> /* ADD THIS */
            } 
          /> 

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider> /* ADD THIS */
  );
}

export default App;