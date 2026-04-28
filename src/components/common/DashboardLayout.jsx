import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../store/AuthProvider';
import './DashboardLayout.css';

export default function DashboardLayout({ children, role }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  let menuItems = [];
  if (role === 'admin') {
    menuItems = [
      { label: 'Dashboard', path: '/admin/dashboard' },
      { label: 'Users', path: '/admin/users' },
      { label: 'Products', path: '/admin/products' },
      { label: 'Orders', path: '/admin/orders' },
    ];
  } else if (role === 'farmer') {
    menuItems = [
      { label: 'Dashboard', path: '/farmer/dashboard' },
      { label: 'My Products', path: '/farmer/products' },
      { label: 'Add Product', path: '/farmer/add-product' },
      { label: 'Orders', path: '/farmer/orders' },
      { label: 'Feedback', path: '/contact' },
    ];
  } else if (role === 'customer') {
    menuItems = [
      { label: 'Dashboard', path: '/customer/dashboard' },
      { label: 'My Orders', path: '/customer/orders' },
      { label: 'Feedback', path: '/contact' },
      { label: 'Profile', path: '/customer/profile' },
    ];
  }

  return (
    <div className={`dashboard-layout ${isSidebarOpen ? 'menu-open' : ''}`}>
      <button
        type="button"
        className="sidebar-backdrop"
        onClick={closeSidebar}
        aria-label="Close dashboard menu"
      />

      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>🌾 OrganicSiri</h2>
          <p className="role-badge">{role.charAt(0).toUpperCase() + role.slice(1)}</p>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={closeSidebar}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <Link to="/" className="home-link" onClick={closeSidebar}>← Back to Home</Link>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </aside>

      <div className="dashboard-content">
        <div className="topbar">
          <button
            type="button"
            className="sidebar-toggle"
            onClick={() => setIsSidebarOpen((previous) => !previous)}
            aria-label={isSidebarOpen ? 'Close dashboard menu' : 'Open dashboard menu'}
            aria-expanded={isSidebarOpen}
          >
            <span />
            <span />
            <span />
          </button>
          <h1 className="page-title">Dashboard</h1>
          <div className="user-info">
            <span>{user?.name}</span>
            <span className="user-icon">👤</span>
          </div>
        </div>

        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}
