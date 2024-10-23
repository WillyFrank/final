import React, { useState } from 'react';
import './App.css';

const Table = ({ headers, rows }) => (
  <table className="dashboard-table">
    <thead>
      <tr>
        {headers.map((header, index) => (
          <th key={index}>{header}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <td key={cellIndex}>{cell}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

const TabButton = ({ isActive, onClick, children }) => (
  <button
    className={`tab-button ${isActive ? 'active' : ''}`}
    onClick={onClick}
  >
    {children}
  </button>
);

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [qrCode, setQrCode] = useState("");
  const [cameraFootage, setCameraFootage] = useState("");

  const handleQRScan = () => {
    console.log("Scanning QR code:", qrCode);
  };

  const handleCCTVRequest = () => {
    console.log("Requesting CCTV footage:", cameraFootage);
  };

  const handleSendNotification = () => {
    console.log("Sending notifications to users");
  };

  const lostItemsHeaders = ["Item", "Location", "Date", "Status"];
  const lostItemsRows = [
    ["Wallet", "Main Hall", "2024-10-08", "Pending"],
    ["Phone", "Cafeteria", "2024-10-07", "Found"],
    ["Backpack", "Library", "2024-10-06", "Claimed"],
  ];

  const claimsHeaders = ["Claim ID", "Item", "Claimant", "Action"];
  const claimsRows = [
    ["CL001", "Wallet", "John Doe", <button className="action-button">Verify</button>],
    ["CL002", "Phone", "Jane Smith", <button className="action-button">Verify</button>],
  ];

  const auditLogsHeaders = ["Timestamp", "Admin", "Action", "Details"];
  const auditLogsRows = [
    ["2024-10-08 14:30", "Admin1", "Verified Claim", "Claim ID: CL001"],
    ["2024-10-08 13:45", "Admin2", "Registered Found Item", "Item: Phone"],
  ];

  return (
    <div className="admin-dashboard">
      {/* Sidebar for Navigation */}
      <div className="sidebar">
        <h2>Admin Dashboard</h2>
        <TabButton isActive={activeTab === "home"} onClick={() => setActiveTab("home")}>
          Home
        </TabButton>
        <TabButton isActive={activeTab === "lost-items"} onClick={() => setActiveTab("lost-items")}>
          View Lost Items
        </TabButton>
        <TabButton isActive={activeTab === "register-found"} onClick={() => setActiveTab("register-found")}>
          Register Found Items
        </TabButton>
        <TabButton isActive={activeTab === "cctv-footage"} onClick={() => setActiveTab("cctv-footage")}>
          CCTV Footage
        </TabButton>
        <TabButton isActive={activeTab === "match-verify"} onClick={() => setActiveTab("match-verify")}>
          Match & Verify
        </TabButton>
        <TabButton isActive={activeTab === "notifications"} onClick={() => setActiveTab("notifications")}>
          Notifications
        </TabButton>
        <TabButton isActive={activeTab === "audit-logs"} onClick={() => setActiveTab("audit-logs")}>
          Audit Logs
        </TabButton>
      </div>

      {/* Main Content Area */}
      <div className="content">
        {activeTab === "home" && (
          <div>
            <h1>Welcome to the Lost and Found Admin Dashboard</h1>
            <p>Here you can manage lost and found items, verify claims, and review logs.</p>
            <ul>
              <li>View Lost Item Reports</li>
              <li>Register Found Items via QR code scanning</li>
              <li>Request and Review CCTV Footage for verification</li>
              <li>Match and Verify Claims</li>
              <li>Send Notifications to users about found items</li>
              <li>Audit and Logging for admin actions</li>
            </ul>
          </div>
        )}

        {activeTab === "lost-items" && (
          <div>
            <h2>Lost Item Reports</h2>
            <Table headers={lostItemsHeaders} rows={lostItemsRows} />
          </div>
        )}

        {activeTab === "register-found" && (
          <div>
            <h2>Register Found Items</h2>
            <div className="input-group">
              <input
                type="text"
                placeholder="Enter QR Code"
                value={qrCode}
                onChange={(e) => setQrCode(e.target.value)}
              />
              <button onClick={handleQRScan} className="action-button">
                Scan QR
              </button>
            </div>
          </div>
        )}

        {activeTab === "cctv-footage" && (
          <div>
            <h2>Request and Review CCTV Footage</h2>
            <div className="input-group">
              <input
                type="text"
                placeholder="Enter camera ID or location"
                value={cameraFootage}
                onChange={(e) => setCameraFootage(e.target.value)}
              />
              <button onClick={handleCCTVRequest} className="action-button">
                Request Footage
              </button>
            </div>
          </div>
        )}

        {activeTab === "match-verify" && (
          <div>
            <h2>Match and Verify Claims</h2>
            <Table headers={claimsHeaders} rows={claimsRows} />
          </div>
        )}

        {activeTab === "notifications" && (
          <div>
            <h2>Send Notifications</h2>
            <button onClick={handleSendNotification} className="action-button">
              Send Notifications to Users
            </button>
          </div>
        )}

        {activeTab === "audit-logs" && (
          <div>
            <h2>Audit Logs</h2>
            <Table headers={auditLogsHeaders} rows={auditLogsRows} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
