export type DeviceStatus = 'active' | 'maintenance' | 'retired';
export type OwnershipType = 'own' | 'leased';

export interface DeviceEvent {
  id: string;
  type: 'creation' | 'assignment' | 'return' | 'transfer' | 'rename' | 'maintenance' | 'note' | 'update';
  title: string;
  description: string;
  date: string;
  responsible: string;
  changes?: Record<string, { from: any, to: any }>;
  metadata?: Record<string, any>;
}

export interface DeviceDocument {
  id: string;
  name: string;
  type: 'delivery' | 'return' | 'exit' | 'quote' | 'invoice' | 'other';
  uploadDate: string;
  fileUrl: string; // For mock, we'll just use a placeholder
}

export interface Device {
  id: string;
  patrimonio: string;
  name: string; // e.g., NBCLFTI08
  status: DeviceStatus;
  
  specs: {
    brand: string;
    model: string;
    serialNumber?: string;
  };
  
  assignment: {
    responsible: string;
    email: string;
    department: string;
  };
  
  ownership: {
    type: OwnershipType;
    company?: string; // For leased
    contractNumber?: string;
    monthlyValue?: number;
  };
  
  history: DeviceEvent[];
  documents: DeviceDocument[];
  
  createdAt: string;
  updatedAt: string;
}
