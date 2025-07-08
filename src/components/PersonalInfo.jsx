"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaTimes, FaCalendar } from "react-icons/fa"
import "./PersonalInfo.css"

function PersonalInfo() {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "male",
    countryCode: "+598",
    phoneNumber: "",
    birthday: "",
  })
  const [errors, setErrors] = useState({})
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

  const handleSubmit = (e) => {
    e.preventDefault()

    const newErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Store personal info data
    const existingData = JSON.parse(localStorage.getItem("registrationData") || "{}")
    localStorage.setItem(
      "registrationData",
      JSON.stringify({
        ...existingData,
        ...formData,
      }),
    )

    navigate("/address-search")
  }

  return (
    <div className="auth-container">
      <div className="auth-modal">
        <div className="auth-header">
          <h2>Personal information</h2>
          <span className="step-indicator">2 of 3</span>
          <button className="close-btn">
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Full name"
              className={errors.fullName ? "error" : ""}
            />
            {errors.fullName && <span className="error-text">{errors.fullName}</span>}
          </div>

          <div className="form-group">
            <label>Gender:</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleInputChange}
                />
                <span className="radio-custom"></span>
                Male
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleInputChange}
                />
                <span className="radio-custom"></span>
                Female
              </label>
            </div>
          </div>

          <div className="info-text">
            <i>ℹ</i> The phone number and birthday are only visible to you
          </div>

          <div className="form-group">
            <div className="phone-input">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleInputChange}
                className="country-code"
              >
                <option value="+598">+ 598</option>
                <option value="+1">+ 1</option>
                <option value="+44">+ 44</option>
                <option value="+33">+ 33</option>
              </select>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Phone number"
                className={errors.phoneNumber ? "error" : ""}
              />
            </div>
            {errors.phoneNumber && <span className="error-text">{errors.phoneNumber}</span>}
          </div>

          <div className="form-group">
            <div className="input-wrapper">
              <input
                type="date"
                name="birthday"
                value={formData.birthday}
                onChange={handleInputChange}
                placeholder="Birthday"
              />
              <span className="optional-text">Optional</span>
              <FaCalendar className="input-icon" />
            </div>
            <div className="birthday-hint">Let us know about your birthday so as not to miss a gift</div>
          </div>

          <button type="submit" className="submit-btn">
            Save information
          </button>
        </form>
      </div>
    </div>
  )
}

export default PersonalInfo
