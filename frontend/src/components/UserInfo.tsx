"use client";

import React, { useState } from 'react';
import Image from 'next/image';

const UserInfo = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const userAvatar = null; // Replace with actual avatar URL or null if missing

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="nt-user-info">
      <div className="nt-user-avatar" onClick={toggleDropdown}>
        {userAvatar ? (
          <Image src={userAvatar} alt="User Avatar" width={40} height={40} className="nt-avatar-image" />
        ) : (
          <div className="nt-avatar-icon">👤</div>
        )}
      </div>
      {dropdownOpen && (
        <div className="nt-user-dropdown">
          <p className="nt-user-name">John Doe</p>
          <p className="nt-user-email">john.doe@example.com</p>
          <button className="nt-notifications">Notifications</button>
          <button className="nt-settings">Settings</button>
          <button className="nt-logout">Logout</button>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
