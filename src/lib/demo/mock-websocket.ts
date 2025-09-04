/**
 * Mock WebSocket service for real-time demo updates
 * Simulates real-time events based on the diagnostic and playbook data
 */

export interface WebSocketEvent {
  type: string;
  timestamp: number;
  data: any;
}

export class MockWebSocket {
  private listeners: { [eventType: string]: ((data: any) => void)[] } = {};
  private eventQueue: WebSocketEvent[] = [];
  private isConnected = false;
  private intervalId: NodeJS.Timeout | null = null;

  // Real-time events based on diagnostic and playbook insights
  private demoEvents: WebSocketEvent[] = [
    {
      type: 'diagnostic:insight',
      timestamp: 2000,
      data: {
        type: 'opportunity',
        title: 'High-value keyword opportunity detected',
        description: '"Zapier too expensive" - 8,100 monthly searches, zero competition',
        impact: 'HIGH',
        action: 'Create comparison content'
      }
    },
    {
      type: 'content:performance',
      timestamp: 5000,
      data: {
        type: 'success',
        title: 'Migration guide outperforming competitors',
        description: 'Converting at 12.3% vs Make\'s guide at 4.1%',
        content: 'When Rules Break',
        metric: 'conversion_rate',
        value: 12.3
      }
    },
    {
      type: 'ai:visibility',
      timestamp: 8000,
      data: {
        type: 'improvement',
        platform: 'ChatGPT',
        change: '+8%',
        description: 'Technical content gaining AI traction',
        recommendation: 'Continue publishing technical deep-dives'
      }
    },
    {
      type: 'competitive:intelligence',
      timestamp: 12000,
      data: {
        type: 'competitor_move',
        competitor: 'Zapier',
        action: 'Published cost calculator series',
        impact: 'Getting 2,400 views/day, ranking #1',
        recommendation: 'Create interactive calculator within 72 hours'
      }
    },
    {
      type: 'workflow:progress',
      timestamp: 15000,
      data: {
        workflowId: 'workflow-001',
        stage: 'draft',
        progress: 75,
        message: 'Draft generation 75% complete'
      }
    },
    {
      type: 'playbook:recommendation',
      timestamp: 18000,
      data: {
        type: 'urgent',
        play: 'Migration Accelerator',
        opportunity: '24-48 hour window to capture traffic',
        description: 'Zapier price increase triggered surge in "too expensive" searches',
        action: 'Publish pricing comparison immediately'
      }
    }
  ];

  constructor() {
    this.setupEventQueue();
  }

  private setupEventQueue() {
    // Shuffle and repeat events for continuous demo
    this.eventQueue = [...this.demoEvents];
    this.scheduleNextEvent();
  }

  private scheduleNextEvent() {
    if (this.eventQueue.length === 0) {
      // Reset queue when empty
      this.eventQueue = [...this.demoEvents];
    }

    const event = this.eventQueue.shift();
    if (event && this.isConnected) {
      setTimeout(() => {
        this.emit(event.type, event.data);
        this.scheduleNextEvent();
      }, event.timestamp);
    }
  }

  connect(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.isConnected = true;
        this.emit('connection:established', { status: 'connected' });
        this.scheduleNextEvent();
        resolve();
      }, 1000);
    });
  }

  disconnect() {
    this.isConnected = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.emit('connection:closed', { status: 'disconnected' });
  }

  on(eventType: string, callback: (data: any) => void) {
    if (!this.listeners[eventType]) {
      this.listeners[eventType] = [];
    }
    this.listeners[eventType].push(callback);
  }

  off(eventType: string, callback: (data: any) => void) {
    if (this.listeners[eventType]) {
      this.listeners[eventType] = this.listeners[eventType].filter(cb => cb !== callback);
    }
  }

  private emit(eventType: string, data: any) {
    if (this.listeners[eventType]) {
      this.listeners[eventType].forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error('WebSocket callback error:', error);
        }
      });
    }
  }

  // Simulate specific events for demo
  simulateEvent(type: string, data: any, delay = 0) {
    setTimeout(() => {
      this.emit(type, data);
    }, delay);
  }

  // Get connection status
  getStatus() {
    return this.isConnected ? 'connected' : 'disconnected';
  }
}

// Singleton instance for demo
export const mockWebSocket = new MockWebSocket();

// React hook for using mock WebSocket
export function useMockWebSocket() {
  const [isConnected, setIsConnected] = React.useState(false);
  const [lastEvent, setLastEvent] = React.useState<any>(null);

  React.useEffect(() => {
    const handleConnection = (data: any) => {
      setIsConnected(data.status === 'connected');
    };

    const handleAnyEvent = (data: any) => {
      setLastEvent({ type: 'update', data, timestamp: Date.now() });
    };

    // Connect and setup listeners
    mockWebSocket.connect();
    mockWebSocket.on('connection:established', handleConnection);
    mockWebSocket.on('connection:closed', handleConnection);
    
    // Listen to all event types
    [
      'diagnostic:insight',
      'content:performance', 
      'ai:visibility',
      'competitive:intelligence',
      'workflow:progress',
      'playbook:recommendation'
    ].forEach(eventType => {
      mockWebSocket.on(eventType, handleAnyEvent);
    });

    return () => {
      mockWebSocket.disconnect();
    };
  }, []);

  return {
    isConnected,
    lastEvent,
    simulateEvent: mockWebSocket.simulateEvent.bind(mockWebSocket)
  };
}
