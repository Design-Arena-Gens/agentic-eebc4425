export type AgentType = 'research' | 'creative' | 'tech' | 'sales' | 'support';

export type AgentStatus = 'idle' | 'working' | 'waiting' | 'error' | 'completed';

export type TaskPriority = 'low' | 'medium' | 'high' | 'critical';

export type TaskStatus = 'pending' | 'assigned' | 'in_progress' | 'review' | 'completed' | 'failed' | 'blocked';

export interface Agent {
  id: string;
  name: string;
  type: AgentType;
  status: AgentStatus;
  currentTask: string | null;
  tasksCompleted: number;
  errorCount: number;
  lastActive: Date;
  capabilities: string[];
  metrics: {
    successRate: number;
    avgCompletionTime: number;
    totalProcessed: number;
  };
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  assignedTo: string | null;
  agentType: AgentType | null;
  createdAt: Date;
  updatedAt: Date;
  completedAt: Date | null;
  dependencies: string[];
  output: string | null;
  errorMessage: string | null;
  estimatedDuration: number;
  actualDuration: number | null;
}

export interface OrchestratorState {
  mode: 'auto' | 'manual';
  isProcessing: boolean;
  totalTasksProcessed: number;
  activeAgents: number;
  systemHealth: 'healthy' | 'degraded' | 'critical';
  lastDecision: string | null;
  decisionHistory: Decision[];
}

export interface Decision {
  timestamp: Date;
  taskId: string;
  agentId: string;
  reasoning: string;
  outcome: 'success' | 'failure';
}

export interface SystemLog {
  id: string;
  timestamp: Date;
  level: 'info' | 'warning' | 'error' | 'success';
  source: string;
  message: string;
  metadata?: any;
}
