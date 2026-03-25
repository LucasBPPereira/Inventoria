import React from 'react';
import { Plus, Laptop, ShieldCheck, Truck, MoreVertical, Eye } from 'lucide-react';
import type { Device } from '../types/inventory';
import './Dashboard.css';

interface DashboardProps {
  devices: Device[];
  onViewDevice: (device: Device) => void;
  onAddNew: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ devices, onViewDevice, onAddNew }) => {
  const totalDevices = devices.length;
  const ownDevices = devices.filter(d => d.ownership.type === 'own').length;
  const leasedDevices = devices.filter(d => d.ownership.type === 'leased').length;

  return (
    <div className="dashboard-page">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">
            <Laptop size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Total de Equipamentos</span>
            <span className="stat-value">{totalDevices}</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon green">
            <ShieldCheck size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Próprios</span>
            <span className="stat-value">{ownDevices}</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon orange">
            <Truck size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Locados</span>
            <span className="stat-value">{leasedDevices}</span>
          </div>
        </div>
      </div>

      <div className="table-actions">
        <div className="filters">
          {/* Filters could go here */}
        </div>
        <button className="btn-primary" onClick={onAddNew}>
          <Plus size={20} />
          Novo Equipamento
        </button>
      </div>

      <div className="table-container">
        <table className="device-table">
          <thead>
            <tr>
              <th>Patrimônio</th>
              <th>Nome / Hostname</th>
              <th>Responsável</th>
              <th>Departamento</th>
              <th>Marca/Modelo</th>
              <th>Posse</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((device) => (
              <tr key={device.id} className="table-row">
                <td>
                  <span className="patrimonio">#{device.patrimonio}</span>
                </td>
                <td>
                  <span className="device-name">{device.name}</span>
                </td>
                <td>{device.assignment.responsible}</td>
                <td>
                  <span className="dept-badge">{device.assignment.department}</span>
                </td>
                <td>
                  <div className="specs-cell">
                    <span>{device.specs.brand}</span>
                    <span className="model-text">{device.specs.model}</span>
                  </div>
                </td>
                <td>
                  <span className={`ownership-badge ${device.ownership.type}`}>
                    {device.ownership.type === 'own' ? 'Próprio' : 'Locado'}
                  </span>
                </td>
                <td>
                  <span className={`status-badge ${device.status}`}>
                    {device.status === 'active' ? 'Ativo' : 'Manutenção'}
                  </span>
                </td>
                <td className="actions-cell">
                  <button className="action-btn" onClick={() => onViewDevice(device)}>
                    <Eye size={18} />
                  </button>
                  <button className="action-btn">
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
