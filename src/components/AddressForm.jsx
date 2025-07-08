"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "/Users/Raheem/react-dashboad-project1/src/components/contents/AuthContext"
import { FaTimes } from "react-icons/fa"
import "./AddressForm.css"

function AddressForm() {
  const [formData, setFormData] = useState({
    streetAddress: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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

    if (!formData.streetAddress.trim()) {
      newErrors.streetAddress = "Street address is required"
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required"
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required"
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "Zip code is required"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      setLoading(true)

      // Get registration data from localStorage
      const registrationData = JSON.parse(localStorage.getItem("registrationData") || "{}")

      // Create Firebase account
      await signup(registrationData.email, registrationData.password)

      // Store complete user data (in a real app, you'd save this to Firestore)
      const completeUserData = {
        ...registrationData,
        ...formData,
        createdAt: new Date().toISOString(),
      }

      localStorage.setItem("userData", JSON.stringify(completeUserData))
      localStorage.removeItem("registrationData")

      navigate("/success")
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
          <h2>Add address</h2>
          <span className="step-indicator">3 of 3</span>
          <button className="close-btn">
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <input
              type="text"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleInputChange}
              placeholder="Street address"
              className={errors.streetAddress ? "error" : ""}
            />
            {errors.streetAddress && <span className="error-text">{errors.streetAddress}</span>}
          </div>

          <div className="form-group">
            <input
              type="text"
              name="apartment"
              value={formData.apartment}
              onChange={handleInputChange}
              placeholder="Apartment"
            />
            <span className="optional-text">Optional</span>
          </div>

          <div className="form-group">
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="City"
              className={errors.city ? "error" : ""}
            />
            {errors.city && <span className="error-text">{errors.city}</span>}
          </div>

          <div className="form-row">
            <div className="form-group half">
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="State"
                className={errors.state ? "error" : ""}
              />
              {errors.state && <span className="error-text">{errors.state}</span>}
            </div>
            <div className="form-group half">
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                placeholder="Zip code"
                className={errors.zipCode ? "error" : ""}
              />
              {errors.zipCode && <span className="error-text">{errors.zipCode}</span>}
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Saving information..." : "Save information"}
          </button>

          {errors.submit && <div className="error-text">{errors.submit}</div>}
        </form>
      </div>
    </div>
  )
}

export default AddressForm
