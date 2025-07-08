"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthProvider, useAuth } from "@/components/contents/AuthContext";
import { FaApple, FaFacebook, FaGoogle, FaEye, FaEyeSlash, FaTimes, FaCheck } from "react-icons/fa"
import "./Register.css"

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    newsAndPromotions: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const { signup, signInWithGoogle, signInWithFacebook } = useAuth()
  const navigate = useNavigate()

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password) => {
    return password.length >= 8
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    // Clear errors when user starts typing
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
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 8 characters"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      setLoading(true)
      // Store registration data in localStorage for the multi-step process
      localStorage.setItem(
        "registrationData",
        JSON.stringify({
          email: formData.email,
          password: formData.password,
          newsAndPromotions: formData.newsAndPromotions,
        }),
      )
      navigate("/personal-info")
    } catch (error) {
      setErrors({ submit: error.message })
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
            <button className="auth-tab active">Register</button>
            <button className="auth-tab" onClick={() => navigate("/login")}>
              Log in
            </button>
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

        <div className="divider">or register with email</div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email address</label>
            <div className="input-wrapper">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="example@mail.com"
                className={errors.email ? "error" : ""}
              />
              {formData.email && validateEmail(formData.email) && <FaCheck className="input-icon success" />}
            </div>
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
              {formData.password && validatePassword(formData.password) && <FaCheck className="input-icon success" />}
            </div>
            <div className="password-hint">8+ characters</div>
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Creating account..." : "Create account"}
          </button>

          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="newsAndPromotions"
                checked={formData.newsAndPromotions}
                onChange={handleInputChange}
              />
              <span className="checkmark"></span>
              Send me news and promotions
            </label>
          </div>

          <div className="terms">
            By continuing I agree with the{" "}
            <a href="#" className="link">
              Terms & Conditions
            </a>{" "}
            <a href="#" className="link">
              Privacy Policy
            </a>
          </div>

          {errors.submit && <div className="error-text">{errors.submit}</div>}
        </form>
      </div>
    </div>
  )
}

export default Register
