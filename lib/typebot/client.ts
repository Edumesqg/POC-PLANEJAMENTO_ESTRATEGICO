export interface TypebotSession {
  id: string;
  agentId: 'luna' | 'jack' | 'nina';
  userId: string;
  status: 'active' | 'completed' | 'failed';
  startedAt: number;
  completedAt?: number;
  data?: Record<string, any>;
}

export interface TypebotProgress {
  state: 'not_started' | 'active' | 'processing' | 'completed';
  currentAgent: 'luna' | 'jack' | 'nina' | null;
  completedAgents: string[];
  startedAt?: number;
  lastUpdated: number;
}

export class TypebotClient {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || '/api/typebot';
  }

  async startSession(
    agentId: 'luna' | 'jack' | 'nina',
    userId: string
  ): Promise<TypebotSession> {
    throw new Error('Not implemented yet');
  }

  async getProgress(userId: string): Promise<TypebotProgress> {
    throw new Error('Not implemented yet');
  }

  async updateProgress(
    userId: string,
    progress: Partial<TypebotProgress>
  ): Promise<void> {
    throw new Error('Not implemented yet');
  }

  getLocalProgress(): TypebotProgress | null {
    if (typeof window === 'undefined') return null;

    const stored = localStorage.getItem('typebotProgress');
    if (!stored) return null;

    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }

  saveLocalProgress(progress: TypebotProgress): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('typebotProgress', JSON.stringify(progress));
  }
}

export const typebotClient = new TypebotClient();
