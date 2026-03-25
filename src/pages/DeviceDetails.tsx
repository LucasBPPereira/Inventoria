import React from 'react';
import { ArrowLeft, Clock, FileText, User, Mail, Building, Cpu, Tag, Calendar, ChevronRight, Plus, Users } from 'lucide-react';
import type { Device, DeviceEvent } from '../types/inventory';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import './DeviceDetails.css';

interface DeviceDetailsProps {
  device: Device;
  onBack: () => void;
  onEdit: () => void;
}

const DeviceDetails: React.FC<DeviceDetailsProps> = ({ device, onBack, onEdit }) => {
  const getEventIcon = (type: DeviceEvent['type']) => {
    switch (type) {
      case 'return': return <ArrowLeft size={16} />;
      case 'transfer': return <Users size={16} />;
      case 'update': return <FileText size={16} />;
      default: return <Clock size={16} />;
    }
  };

  return (
    <div className="details-page">
      <div className="details-header">
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={20} />
          Voltar para Lista
        </button>
        <div className="header-actions">
          <button className="btn-secondary" onClick={onEdit}>Editar Dados</button>
          <button className="btn-primary">
            <Plus size={18} />
            Registrar Evento
          </button>
        </div>
      </div>

      <div className="details-grid">
        <div className="details-main">
          {/* Info Card */}
          <div className="card info-card">
            <div className="card-header">
              <h3>Informações Gerais</h3>
              <span className={`status-badge ${device.status}`}>
                {device.status === 'active' ? 'Ativo' : 'Inativo'}
              </span>
            </div>
            
            <div className="info-grid">
              <div className="info-item">
                <Tag className="info-icon" size={18} />
                <div className="info-content">
                  <label>Patrimônio</label>
                  <span>{device.patrimonio}</span>
                </div>
              </div>
              <div className="info-item">
                <Cpu className="info-icon" size={18} />
                <div className="info-content">
                  <label>Marca / Modelo</label>
                  <span>{device.specs.brand} {device.specs.model}</span>
                </div>
              </div>
              <div className="info-item">
                <Building className="info-icon" size={18} />
                <div className="info-content">
                  <label>Propriedade</label>
                  <span>
                    {device.ownership.type === 'own' ? 'Próprio' : `Locado (${device.ownership.company})`}
                    {device.ownership.monthlyValue && ` • R$ ${device.ownership.monthlyValue.toLocaleString('pt-BR')}/mês`}
                  </span>
                </div>
              </div>
              <div className="info-item">
                <Calendar className="info-icon" size={18} />
                <div className="info-content">
                  <label>Data de Criação</label>
                  <span>{format(new Date(device.createdAt), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</span>
                </div>
              </div>
            </div>

            <hr className="divider" />

            <div className="assignment-section">
              <h4>Responsável Atual</h4>
              <div className="assignment-grid">
                <div className="assignment-item">
                  <User size={16} />
                  <span>{device.assignment.responsible}</span>
                </div>
                <div className="assignment-item">
                  <Mail size={16} />
                  <span>{device.assignment.email}</span>
                </div>
                <div className="assignment-item">
                  <Building size={16} />
                  <span>Setor: {device.assignment.department}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Documents Card */}
          <div className="card documents-card">
            <div className="card-header">
              <h3>Documentos e Termos</h3>
              <button className="text-btn">Ver todos</button>
            </div>
            <div className="docs-list">
              {device.documents.map(doc => (
                <div key={doc.id} className="doc-item">
                  <div className="doc-icon">
                    <FileText size={20} />
                  </div>
                  <div className="doc-info">
                    <span className="doc-name">{doc.name}</span>
                    <span className="doc-meta">
                      {doc.type} • {format(new Date(doc.uploadDate), 'dd/MM/yyyy')}
                    </span>
                  </div>
                  <ChevronRight size={18} className="chevron" />
                </div>
              ))}
              <button className="add-doc-btn">
                <Plus size={18} />
                Anexar novo documento
              </button>
            </div>
          </div>
        </div>

        {/* Timeline Column */}
        <div className="details-aside">
          <div className="card timeline-card">
            <div className="card-header">
              <h3>Histórico de Ocorrências</h3>
              <Clock size={18} className="text-muted" />
            </div>
            <div className="timeline">
              {device.history.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((event, index) => (
                <div key={event.id} className="timeline-item">
                  <div className="timeline-marker">
                    <div className={`marker-icon ${event.type}`}>
                      {getEventIcon(event.type)}
                    </div>
                    {index !== device.history.length - 1 && <div className="marker-line"></div>}
                  </div>
                  <div className="timeline-content">
                    <div className="event-header">
                      <span className="event-date">
                        {format(new Date(event.date), "dd/MM/yyyy HH:mm")}
                      </span>
                      <span className="event-responsible">por {event.responsible}</span>
                    </div>
                    <h4 className="event-title">{event.title}</h4>
                    <p className="event-description">{event.description}</p>
                    
                    {event.changes && (
                      <div className="event-changes">
                        {Object.entries(event.changes).map(([field, change]) => (
                          <div key={field} className="change-item">
                            <span className="change-field">{field}:</span>
                            <span className="change-from">{String(change.from || 'N/A')}</span>
                            <ChevronRight size={12} />
                            <span className="change-to">{String(change.to || 'N/A')}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceDetails;
