import React from 'react';
import { Laptop, History, Users, FileText, Settings, LogOut, Box } from 'lucide-react';
import './Sidebar.css';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', icon: <Laptop size={20} />, label: 'Equipamentos' },
    { id: 'users', icon: <Users size={20} />, label: 'Responsáveis' },
    { id: 'documents', icon: <FileText size={20} />, label: 'Documentos' },
    { id: 'history', icon: <History size={20} />, label: 'Histórico Global' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <Box size={32} color="#fff" />
        <span>Inventoria</span>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="nav-item">
          <Settings size={20} />
          <span>Configurações</span>
        </button>
        <button className="nav-item logout">
          <LogOut size={20} />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
