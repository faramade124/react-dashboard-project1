"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "/Users/Raheem/react-dashboad-project1/src/components/contents/AuthContext"
import { FaApple, FaFacebook, FaGoogle, FaEye, FaEyeSlash, FaTimes } from "react-icons/fa"
import "./Login.css"

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const { login, signInWithGoogle, signInWithFacebook } = useAuth()
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newErrors = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      setLoading(true)
      await login(formData.email, formData.password)
      navigate("/dashboard")
    } catch (error) {
      setErrors({ submit: "Invalid email or password" })
    } finally {
      setLoading(false)
    }
  }

  const handleSocialLogin = async (provider) => {
    try {
      setLoading(true)
      if (provider === "google") {
        await signInWithGoogle()
      } else if (provider === "facebook") {
        await signInWithFacebook()
      }
      navigate("/dashboard")
    } catch (error) {
      setErrors({ submit: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-modal">
        <div className="auth-header">
          <div className="auth-tabs">
            <button className="auth-tab" onClick={() => navigate("/register")}>
              Register
            </button>
            <button className="auth-tab active">Log in</button>
          </div>
          <button className="close-btn">
            <FaTimes />
          </button>
        </div>

        <div className="social-login">
          <button className="social-btn apple" onClick={() => handleSocialLogin("apple")}>
            <FaApple />
          </button>
          <button className="social-btn facebook" onClick={() => handleSocialLogin("facebook")}>
            <FaFacebook />
          </button>
          <button className="social-btn google" onClick={() => handleSocialLogin("google")}>
            <FaGoogle />
          </button>
        </div>

        <div className="divider">or login with email</div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="example@mail.com"
              className={errors.email ? "error" : ""}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="********"
                className={errors.password ? "error" : ""}
              />
              <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login to Dashboard"}
          </button>

          <div className="checkbox-group">
            <label className="checkbox-label">
              <input type="checkbox" name="rememberMe" checked={formData.rememberMe} onChange={handleInputChange} />
              <span className="checkmark"></span>
              Remember me
            </label>
          </div>

          {errors.submit && <div className="error-text">{errors.submit}</div>}
        </form>
      </div>
    </div>
  )
}

export default Login
