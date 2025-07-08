"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaTimes, FaSearch, FaMapMarkerAlt, FaClock, FaDollarSign, FaUsers } from "react-icons/fa"
import "./AddressSearch.css"

function AddressSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()

  const handleUseCurrentLocation = () => {
    // In a real app, you would use geolocation API
    navigate("/address-form")
  }

  const handleAddManually = () => {
    navigate("/address-form")
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

        <div className="address-search">
          <div className="search-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for address"
              className="search-input"
            />
          </div>

          <div className="privacy-note">Your address is not visible to other users</div>

          <div className="location-options">
            <button className="location-btn current-location" onClick={handleUseCurrentLocation}>
              <FaMapMarkerAlt />
              Use current location
            </button>
            <button className="location-btn add-manually" onClick={handleAddManually}>
              Add manually
            </button>
          </div>

          <div className="sharing-info">
            <h3>Sharing your address shows:</h3>
            <div className="benefit-list">
              <div className="benefit-item">
                <FaUsers className="benefit-icon" />
                <span>People near you</span>
              </div>
              <div className="benefit-item">
                <FaClock className="benefit-icon" />
                <span>Estimated delivery time</span>
              </div>
              <div className="benefit-item">
                <FaDollarSign className="benefit-icon" />
                <span>Estimate shipping costs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddressSearch
