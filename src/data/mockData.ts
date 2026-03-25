import type { Device } from '../types/inventory';

export const mockDevices: Device[] = [
  {
    id: '1',
    patrimonio: '123456',
    name: 'NBCLFTI08',
    status: 'active',
    specs: {
      brand: 'Dell',
      model: 'Latitude 5420',
      serialNumber: 'ABC123XYZ'
    },
    assignment: {
      responsible: 'João Silva',
      email: 'joao.silva@empresa.com',
      department: 'TI'
    },
    ownership: {
      type: 'own'
    },
    history: [
      {
        id: 'h1',
        type: 'assignment',
        title: 'Entregue ao usuário',
        description: 'Equipamento entregue para o novo colaborador João Silva.',
        date: '2024-03-20T10:00:00Z',
        responsible: 'Maria Admin'
      },
      {
        id: 'h2',
        type: 'rename',
        title: 'Renomeado',
        description: 'Nome alterado de NB-TMP-01 para NBCLFTI08.',
        date: '2024-03-19T15:30:00Z',
        responsible: 'Sistema'
      },
      {
        id: 'h3',
        type: 'creation',
        title: 'Cadastro inicial',
        description: 'Equipamento cadastrado no sistema.',
        date: '2024-03-19T14:00:00Z',
        responsible: 'Maria Admin'
      }
    ],
    documents: [
      {
        id: 'd1',
        name: 'Termo_Entrega_NBCLFTI08.pdf',
        type: 'delivery',
        uploadDate: '2024-03-20T10:05:00Z',
        fileUrl: '#'
      }
    ],
    createdAt: '2024-03-19T14:00:00Z',
    updatedAt: '2024-03-20T10:00:00Z'
  },
  {
    id: '2',
    patrimonio: '654321',
    name: 'NBCLFTI15',
    status: 'active',
    specs: {
      brand: 'Lenovo',
      model: 'ThinkPad L14',
      serialNumber: 'LNV987654'
    },
    assignment: {
      responsible: 'Ana Oliveira',
      email: 'ana.oliveira@empresa.com',
      department: 'RH'
    },
    ownership: {
      type: 'leased',
      company: 'RentIT Solutions',
      contractNumber: 'CTR-2024-001'
    },
    history: [
      {
        id: 'h4',
        type: 'assignment',
        title: 'Entregue ao usuário',
        description: 'Equipamento entregue para Ana Oliveira.',
        date: '2024-02-15T09:00:00Z',
        responsible: 'Pedro TI'
      },
      {
        id: 'h5',
        type: 'creation',
        title: 'Cadastro inicial',
        description: 'Equipamento locado cadastrado.',
        date: '2024-02-14T16:00:00Z',
        responsible: 'Pedro TI'
      }
    ],
    documents: [
      {
        id: 'd2',
        name: 'Contrato_Locacao_RentIT.pdf',
        type: 'other',
        uploadDate: '2024-02-14T16:05:00Z',
        fileUrl: '#'
      }
    ],
    createdAt: '2024-02-14T16:00:00Z',
    updatedAt: '2024-02-15T09:00:00Z'
  }
];
