"use client"
import { useNavigate } from "react-router-dom"
import { FaTimes } from "react-icons/fa"
import "./Success.css"

function Success() {
  const navigate = useNavigate()

  const handleGoToLogin = () => {
    navigate("/login")
  }

  return (
    <div className="auth-container">
      <div className="auth-modal success-modal">
        <button className="close-btn">
          <FaTimes />
        </button>

        <div className="success-content">
          <div className="success-illustration">
            <img src="/images/success.png" alt="Success" />
          </div>

          <h2 className="success-title">You are successfully registered!</h2>

          <button className="submit-btn" onClick={handleGoToLogin}>
            Go to Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default Success
