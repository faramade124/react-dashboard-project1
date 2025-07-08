"use client"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import AuthContext from "./components/contents/AuthContext";
import Register from "./components/Register"
import PersonalInfo from "./components/PersonalInfo"
import AddressSearch from "./components/AddressSearch"
import AddressForm from "./components/AddressForm"
import Success from "./components/Success"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
import "./App.css"

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth()
  return currentUser ? children : <Navigate to="/login" />
}

function PublicRoute({ children }) {
  const { currentUser } = useAuth()
  return !currentUser ? children : <Navigate to="/dashboard" />
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Navigate to="/register" />} />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/personal-info"
              element={
                <PublicRoute>
                  <PersonalInfo />
                </PublicRoute>
              }
            />
            <Route
              path="/address-search"
              element={
                <PublicRoute>
                  <AddressSearch />
                </PublicRoute>
              }
            />
            <Route
              path="/address-form"
              element={
                <PublicRoute>
                  <AddressForm />
                </PublicRoute>
              }
            />
            <Route
              path="/success"
              element={
                <PublicRoute>
                  <Success />
                </PublicRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
