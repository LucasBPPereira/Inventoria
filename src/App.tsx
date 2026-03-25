import { useState, useEffect } from 'react';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './pages/Dashboard';
import DeviceDetails from './pages/DeviceDetails';
import type { Device, DeviceEvent } from './types/inventory';
import { mockDevices } from './data/mockData';
import DeviceForm from './components/DeviceForm';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [devices, setDevices] = useState<Device[]>(() => {
    const saved = localStorage.getItem('inventoria_devices');
    return saved ? JSON.parse(saved) : mockDevices;
  });

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('inventoria_devices', JSON.stringify(devices));
  }, [devices]);

  const handleViewDevice = (device: Device) => {
    setSelectedDevice(device);
    setActiveTab('device-details');
  };

  const handleBackToDashboard = () => {
    setSelectedDevice(null);
    setActiveTab('dashboard');
  };

  const handleSaveDevice = (deviceData: any) => {
    if (selectedDevice) {
      // Edit
      const changes: Record<string, { from: any, to: any }> = {};
      
      // Simple diff logic
      if (selectedDevice.patrimonio !== deviceData.patrimonio) 
        changes.patrimonio = { from: selectedDevice.patrimonio, to: deviceData.patrimonio };
      if (selectedDevice.name !== deviceData.name) 
        changes.nome = { from: selectedDevice.name, to: deviceData.name };
      if (selectedDevice.specs.brand !== deviceData.brand) 
        changes.marca = { from: selectedDevice.specs.brand, to: deviceData.brand };
      if (selectedDevice.specs.model !== deviceData.model) 
        changes.modelo = { from: selectedDevice.specs.model, to: deviceData.model };
      if (selectedDevice.assignment.responsible !== deviceData.responsible) 
        changes.responsável = { from: selectedDevice.assignment.responsible, to: deviceData.responsible };
      if (selectedDevice.assignment.email !== deviceData.email) 
        changes.email = { from: selectedDevice.assignment.email, to: deviceData.email };
      if (selectedDevice.assignment.department !== deviceData.department) 
        changes.departamento = { from: selectedDevice.assignment.department, to: deviceData.department };
      if (selectedDevice.ownership.type !== deviceData.ownershipType) 
        changes.posse = { from: selectedDevice.ownership.type, to: deviceData.ownershipType };
      if (selectedDevice.ownership.monthlyValue !== Number(deviceData.monthlyValue)) 
        changes.valor = { from: selectedDevice.ownership.monthlyValue || 0, to: Number(deviceData.monthlyValue) || 0 };

      const hasChanges = Object.keys(changes).length > 0;
      const changedFields = Object.keys(changes).join(', ');

      const updatedDevices = devices.map(d => {
        if (d.id === selectedDevice.id) {
          const newEvent: DeviceEvent = {
            id: Math.random().toString(36).substr(2, 9),
            type: 'update',
            title: 'Equipamento Atualizado',
            description: hasChanges 
              ? `Os seguintes campos foram alterados: ${changedFields}.` 
              : 'Informações gerais atualizadas (sem alterações de valores).',
            date: new Date().toISOString(),
            responsible: 'Admin',
            changes: hasChanges ? changes : undefined
          };
          return {
            ...d,
            patrimonio: deviceData.patrimonio,
            name: deviceData.name,
            specs: { ...d.specs, brand: deviceData.brand, model: deviceData.model },
            assignment: { 
              ...d.assignment, 
              responsible: deviceData.responsible, 
              email: deviceData.email, 
              department: deviceData.department 
            },
            ownership: { 
              ...d.ownership, 
              type: deviceData.ownershipType, 
              company: deviceData.company,
              monthlyValue: deviceData.monthlyValue ? Number(deviceData.monthlyValue) : undefined
            },
            history: [newEvent, ...d.history],
            updatedAt: new Date().toISOString()
          };
        }
        return d;
      });
      setDevices(updatedDevices);
    } else {
      // Create
      const newDevice: Device = {
        id: Math.random().toString(36).substr(2, 9),
        patrimonio: deviceData.patrimonio,
        name: deviceData.name,
        status: 'active',
        specs: { brand: deviceData.brand, model: deviceData.model },
        assignment: { 
          responsible: deviceData.responsible, 
          email: deviceData.email, 
          department: deviceData.department 
        },
        ownership: { 
          type: deviceData.ownershipType, 
          company: deviceData.company,
          monthlyValue: deviceData.monthlyValue ? Number(deviceData.monthlyValue) : undefined
        },
        history: [{
          id: Math.random().toString(36).substr(2, 9),
          type: 'creation',
          title: 'Cadastro Inicial',
          description: 'Equipamento adicionado ao sistema.',
          date: new Date().toISOString(),
          responsible: 'Admin'
        }],
        documents: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setDevices([newDevice, ...devices]);
    }
    setIsFormOpen(false);
    setSelectedDevice(null);
  };

  const renderContent = () => {
    if (activeTab === 'device-details' && selectedDevice) {
      return (
        <DeviceDetails 
          device={selectedDevice} 
          onBack={handleBackToDashboard}
          onEdit={() => setIsFormOpen(true)}
        />
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            devices={devices} 
            onViewDevice={handleViewDevice} 
            onAddNew={() => {
              setSelectedDevice(null);
              setIsFormOpen(true);
            }}
          />
        );
      case 'users':
        return <div className="placeholder-view">Gestão de Usuários (Em breve)</div>;
      case 'documents':
        return <div className="placeholder-view">Gestão de Documentos (Em breve)</div>;
      case 'history':
        return <div className="placeholder-view">Histórico Global (Em breve)</div>;
      default:
        return (
          <Dashboard 
            devices={devices} 
            onViewDevice={handleViewDevice} 
            onAddNew={() => {
              setSelectedDevice(null);
              setIsFormOpen(true);
            }}
          />
        );
    }
  };

  const getTitle = () => {
    if (activeTab === 'device-details') return 'Detalhes do Equipamento';
    switch (activeTab) {
      case 'dashboard': return 'Equipamentos';
      case 'users': return 'Responsáveis';
      case 'documents': return 'Documentos';
      case 'history': return 'Histórico Global';
      default: return 'Inventoria';
    }
  };

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab === 'device-details' ? 'dashboard' : activeTab} setActiveTab={setActiveTab} />
      <main className="main-content">
        <Header title={getTitle()} />
        <div className="content-area">
          {renderContent()}
        </div>
      </main>

      {isFormOpen && (
        <DeviceForm 
          onSave={handleSaveDevice}
          onCancel={() => {
            setIsFormOpen(false);
            if (activeTab !== 'device-details') setSelectedDevice(null);
          }}
          initialData={selectedDevice || undefined}
        />
      )}
    </div>
  );
}

export default App;
