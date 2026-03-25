import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import type { Device, OwnershipType } from '../types/inventory';
import './DeviceForm.css';

interface DeviceFormProps {
  onSave: (device: Partial<Device>) => void;
  onCancel: () => void;
  initialData?: Device;
}

const DeviceForm: React.FC<DeviceFormProps> = ({ onSave, onCancel, initialData }) => {
  const [formData, setFormData] = useState({
    patrimonio: initialData?.patrimonio || '',
    name: initialData?.name || '',
    brand: initialData?.specs.brand || '',
    model: initialData?.specs.model || '',
    responsible: initialData?.assignment.responsible || '',
    email: initialData?.assignment.email || '',
    department: initialData?.assignment.department || '',
    ownershipType: initialData?.ownership.type || 'own' as OwnershipType,
    company: initialData?.ownership.company || '',
    monthlyValue: initialData?.ownership.monthlyValue || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as any);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{initialData ? 'Editar Equipamento' : 'Cadastrar Novo Equipamento'}</h2>
          <button className="close-btn" onClick={onCancel}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="device-form">
          <div className="form-section">
            <h3>Identificação</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Nº Patrimônio</label>
                <input 
                  type="text" 
                  value={formData.patrimonio}
                  onChange={e => setFormData({...formData, patrimonio: e.target.value})}
                  placeholder="Ex: 123456" 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Nome do Equipamento (Hostname)</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  placeholder="Ex: NBCLFTI08" 
                  required 
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Especificações</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Marca</label>
                <input 
                  type="text" 
                  value={formData.brand}
                  onChange={e => setFormData({...formData, brand: e.target.value})}
                  placeholder="Ex: Dell, Lenovo" 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Modelo</label>
                <input 
                  type="text" 
                  value={formData.model}
                  onChange={e => setFormData({...formData, model: e.target.value})}
                  placeholder="Ex: Latitude 5420" 
                  required 
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Responsável e Localização</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Nome do Responsável</label>
                <input 
                  type="text" 
                  value={formData.responsible}
                  onChange={e => setFormData({...formData, responsible: e.target.value})}
                  placeholder="Nome completo" 
                  required 
                />
              </div>
              <div className="form-group">
                <label>E-mail</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  placeholder="email@empresa.com" 
                  required 
                />
              </div>
            </div>
            <div className="form-group">
              <label>Departamento</label>
              <select 
                value={formData.department}
                onChange={e => setFormData({...formData, department: e.target.value})}
                required
              >
                <option value="">Selecione um departamento</option>
                <option value="TI">TI</option>
                <option value="Financeiro">Financeiro</option>
                <option value="RH">RH</option>
                <option value="Comercial">Comercial</option>
                <option value="Operações">Operações</option>
              </select>
            </div>
          </div>

          <div className="form-section">
            <h3>Propriedade</h3>
            <div className="radio-group">
              <label className="radio-label">
                <input 
                  type="radio" 
                  name="ownership" 
                  value="own" 
                  checked={formData.ownershipType === 'own'}
                  onChange={() => setFormData({...formData, ownershipType: 'own'})}
                />
                Principal (Próprio)
              </label>
              <label className="radio-label">
                <input 
                  type="radio" 
                  name="ownership" 
                  value="leased"
                  checked={formData.ownershipType === 'leased'}
                  onChange={() => setFormData({...formData, ownershipType: 'leased'})}
                />
                Locado
              </label>
            </div>
            
            {formData.ownershipType === 'leased' && (
              <div className="form-row mt-2">
                <div className="form-group">
                  <label>Empresa Fornecedora</label>
                  <input 
                    type="text" 
                    value={formData.company}
                    onChange={e => setFormData({...formData, company: e.target.value})}
                    placeholder="Ex: RentIT Solutions" 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Valor Mensal (R$)</label>
                  <input 
                    type="number" 
                    value={formData.monthlyValue}
                    onChange={e => setFormData({...formData, monthlyValue: e.target.value})}
                    placeholder="0,00" 
                    required 
                  />
                </div>
              </div>
            )}
          </div>

          <div className="form-footer">
            <button type="button" className="btn-ghost" onClick={onCancel}>Cancelar</button>
            <button type="submit" className="btn-primary">
              <Save size={18} />
              {initialData ? 'Atualizar' : 'Salvar Equipamento'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeviceForm;
