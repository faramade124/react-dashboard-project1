"use client"

import { useState } from "react"
import { useAuth } from "/Users/Raheem/react-dashboad-project1/src/components/contents/AuthContext"
import { useNavigate } from "react-router-dom"
import {
  FaSearch,
  FaUsers,
  FaUserFriends,
  FaDesktop,
  FaTachometerAlt,
  FaBox,
  FaDollarSign,
  FaBullhorn,
  FaQuestionCircle,
  FaChevronRight,
  FaChevronDown,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa"
import "./Dashboard.css"

function Dashboard() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("Newest")

  const handleLogout = async () => {
    try {
      await logout()
      navigate("/login")
    } catch (error) {
      console.error("Failed to log out", error)
    }
  }

  const customers = [
    {
      name: "Jane Cooper",
      company: "Microsoft",
      phone: "(225) 555-0118",
      email: "jane@microsoft.com",
      country: "United States",
      status: "Active",
    },
    {
      name: "Floyd Miles",
      company: "Yahoo",
      phone: "(205) 555-0100",
      email: "floyd@yahoo.com",
      country: "Kiribati",
      status: "Inactive",
    },
    {
      name: "Ronald Richards",
      company: "Adobe",
      phone: "(302) 555-0107",
      email: "ronald@adobe.com",
      country: "Israel",
      status: "Inactive",
    },
    {
      name: "Marvin McKinney",
      company: "Tesla",
      phone: "(252) 555-0126",
      email: "marvin@tesla.com",
      country: "Iran",
      status: "Active",
    },
    {
      name: "Jerome Bell",
      company: "Google",
      phone: "(629) 555-0129",
      email: "jerome@google.com",
      country: "Réunion",
      status: "Active",
    },
    {
      name: "Kathryn Murphy",
      company: "Microsoft",
      phone: "(406) 555-0120",
      email: "kathryn@microsoft.com",
      country: "Curaçao",
      status: "Active",
    },
    {
      name: "Jacob Jones",
      company: "Yahoo",
      phone: "(208) 555-0112",
      email: "jacob@yahoo.com",
      country: "Brazil",
      status: "Active",
    },
    {
      name: "Kristin Watson",
      company: "Facebook",
      phone: "(704) 555-0127",
      email: "kristin@facebook.com",
      country: "Åland Islands",
      status: "Inactive",
    },
  ]

  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">⚡</div>
            <span className="logo-text">Dashboard</span>
            <span className="version">v.01</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-item active">
            <FaTachometerAlt className="nav-icon" />
            <span>Dashboard</span>
          </div>
          <div className="nav-item">
            <FaBox className="nav-icon" />
            <span>Product</span>
            <FaChevronRight className="nav-arrow" />
          </div>
          <div className="nav-item">
            <FaUsers className="nav-icon" />
            <span>Customers</span>
            <FaChevronRight className="nav-arrow" />
          </div>
          <div className="nav-item">
            <FaDollarSign className="nav-icon" />
            <span>Income</span>
            <FaChevronRight className="nav-arrow" />
          </div>
          <div className="nav-item">
            <FaBullhorn className="nav-icon" />
            <span>Promote</span>
            <FaChevronRight className="nav-arrow" />
          </div>
          <div className="nav-item">
            <FaQuestionCircle className="nav-icon" />
            <span>Help</span>
            <FaChevronRight className="nav-arrow" />
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="upgrade-card">
            <h4>Upgrade to PRO to get access all Features!</h4>
            <button className="upgrade-btn">Get Pro Now!</button>
          </div>

          <div className="user-profile">
            <div className="user-avatar">E</div>
            <div className="user-info">
              <div className="user-name">Evano</div>
              <div className="user-role">Project Manager</div>
            </div>
            <FaChevronDown className="user-arrow" />
          </div>
        </div>
      </div>

      <div className="main-content">
        <div className="top-bar">
          <div className="page-title">
            <h1>Hello Evano 👋,</h1>
          </div>
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon customers">
              <FaUsers />
            </div>
            <div className="stat-content">
              <div className="stat-label">Total Customers</div>
              <div className="stat-value">5,423</div>
              <div className="stat-change positive">
                <FaArrowUp /> 16% this month
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon members">
              <FaUserFriends />
            </div>
            <div className="stat-content">
              <div className="stat-label">Members</div>
              <div className="stat-value">1,893</div>
              <div className="stat-change negative">
                <FaArrowDown /> 1% this month
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon active">
              <FaDesktop />
            </div>
            <div className="stat-content">
              <div className="stat-label">Active Now</div>
              <div className="stat-value">189</div>
              <div className="stat-avatars">
                <div className="avatar">👤</div>
                <div className="avatar">👤</div>
                <div className="avatar">👤</div>
                <div className="avatar">👤</div>
                <div className="avatar">👤</div>
              </div>
            </div>
          </div>
        </div>

        <div className="customers-section">
          <div className="section-header">
            <div className="section-title">
              <h2>All Customers</h2>
              <span className="active-members">Active Members</span>
            </div>
            <div className="section-controls">
              <div className="search-wrapper">
                <FaSearch className="search-icon" />
                <input type="text" placeholder="Search" className="table-search" />
              </div>
              <div className="sort-wrapper">
                <span>Sort by:</span>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option>Newest</option>
                  <option>Oldest</option>
                  <option>Name A-Z</option>
                  <option>Name Z-A</option>
                </select>
              </div>
            </div>
          </div>

          <div className="customers-table">
            <table>
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Company</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>Country</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, index) => (
                  <tr key={index}>
                    <td>{customer.name}</td>
                    <td>{customer.company}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.email}</td>
                    <td>{customer.country}</td>
                    <td>
                      <span className={`status ${customer.status.toLowerCase()}`}>{customer.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="table-footer">
            <div className="showing-text">Showing data 1 to 8 of 256K entries</div>
            <div className="pagination">
              <button className="page-btn">{"<"}</button>
              <button className="page-btn active">1</button>
              <button className="page-btn">2</button>
              <button className="page-btn">3</button>
              <button className="page-btn">4</button>
              <span>...</span>
              <button className="page-btn">40</button>
              <button className="page-btn">{">"}</button>
            </div>
          </div>
        </div>

        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  )
}

export default Dashboard
