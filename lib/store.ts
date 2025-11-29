import { create } from 'zustand';
import { Agent, Task, OrchestratorState, SystemLog, AgentType, TaskStatus } from './types';

interface Store {
  agents: Agent[];
  tasks: Task[];
  orchestrator: OrchestratorState;
  logs: SystemLog[];

  // Actions
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  assignTask: (taskId: string, agentId: string) => void;
  completeTask: (taskId: string, output: string) => void;
  failTask: (taskId: string, error: string) => void;

  updateAgent: (id: string, updates: Partial<Agent>) => void;
  addLog: (log: Omit<SystemLog, 'id' | 'timestamp'>) => void;

  setOrchestratorMode: (mode: 'auto' | 'manual') => void;
  processNextTask: () => void;
}

const createInitialAgents = (): Agent[] => [
  {
    id: 'agent-research-01',
    name: 'Research Agent Alpha',
    type: 'research',
    status: 'idle',
    currentTask: null,
    tasksCompleted: 0,
    errorCount: 0,
    lastActive: new Date(),
    capabilities: ['data-gathering', 'market-analysis', 'competitive-intel', 'trend-analysis'],
    metrics: { successRate: 100, avgCompletionTime: 120, totalProcessed: 0 }
  },
  {
    id: 'agent-creative-01',
    name: 'Creative Agent Beta',
    type: 'creative',
    status: 'idle',
    currentTask: null,
    tasksCompleted: 0,
    errorCount: 0,
    lastActive: new Date(),
    capabilities: ['content-creation', 'design', 'copywriting', 'branding'],
    metrics: { successRate: 100, avgCompletionTime: 180, totalProcessed: 0 }
  },
  {
    id: 'agent-tech-01',
    name: 'Tech Agent Gamma',
    type: 'tech',
    status: 'idle',
    currentTask: null,
    tasksCompleted: 0,
    errorCount: 0,
    lastActive: new Date(),
    capabilities: ['coding', 'debugging', 'architecture', 'optimization'],
    metrics: { successRate: 100, avgCompletionTime: 240, totalProcessed: 0 }
  },
  {
    id: 'agent-sales-01',
    name: 'Sales Agent Delta',
    type: 'sales',
    status: 'idle',
    currentTask: null,
    tasksCompleted: 0,
    errorCount: 0,
    lastActive: new Date(),
    capabilities: ['lead-generation', 'outreach', 'proposals', 'negotiation'],
    metrics: { successRate: 100, avgCompletionTime: 150, totalProcessed: 0 }
  },
  {
    id: 'agent-support-01',
    name: 'Support Agent Epsilon',
    type: 'support',
    status: 'idle',
    currentTask: null,
    tasksCompleted: 0,
    errorCount: 0,
    lastActive: new Date(),
    capabilities: ['customer-service', 'troubleshooting', 'documentation', 'training'],
    metrics: { successRate: 100, avgCompletionTime: 90, totalProcessed: 0 }
  }
];

export const useStore = create<Store>((set, get) => ({
  agents: createInitialAgents(),
  tasks: [],
  orchestrator: {
    mode: 'auto',
    isProcessing: false,
    totalTasksProcessed: 0,
    activeAgents: 0,
    systemHealth: 'healthy',
    lastDecision: null,
    decisionHistory: []
  },
  logs: [],

  addTask: (taskData) => {
    const task: Task = {
      ...taskData,
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    set((state) => ({
      tasks: [...state.tasks, task],
    }));

    get().addLog({
      level: 'info',
      source: 'orchestrator',
      message: `New task created: ${task.title}`,
      metadata: { taskId: task.id }
    });

    if (get().orchestrator.mode === 'auto') {
      setTimeout(() => get().processNextTask(), 500);
    }
  },

  updateTask: (id, updates) => {
    set((state) => ({
      tasks: state.tasks.map(t =>
        t.id === id ? { ...t, ...updates, updatedAt: new Date() } : t
      )
    }));
  },

  assignTask: (taskId, agentId) => {
    const agent = get().agents.find(a => a.id === agentId);
    const task = get().tasks.find(t => t.id === taskId);

    if (!agent || !task) return;

    get().updateTask(taskId, {
      status: 'assigned',
      assignedTo: agentId
    });

    get().updateAgent(agentId, {
      status: 'working',
      currentTask: taskId,
      lastActive: new Date()
    });

    get().addLog({
      level: 'info',
      source: 'orchestrator',
      message: `Task "${task.title}" assigned to ${agent.name}`,
      metadata: { taskId, agentId }
    });

    // Simulate task processing
    const duration = agent.metrics.avgCompletionTime * 1000;
    setTimeout(() => {
      const random = Math.random();
      if (random > 0.1) {
        get().completeTask(taskId, `Task completed successfully by ${agent.name}`);
      } else {
        get().failTask(taskId, 'Simulated error: Task processing failed');
      }
    }, duration);

    get().updateTask(taskId, { status: 'in_progress' });
  },

  completeTask: (taskId, output) => {
    const task = get().tasks.find(t => t.id === taskId);
    if (!task || !task.assignedTo) return;

    const agent = get().agents.find(a => a.id === task.assignedTo);
    if (!agent) return;

    const duration = Date.now() - task.updatedAt.getTime();

    get().updateTask(taskId, {
      status: 'completed',
      output,
      completedAt: new Date(),
      actualDuration: duration
    });

    get().updateAgent(task.assignedTo, {
      status: 'idle',
      currentTask: null,
      tasksCompleted: agent.tasksCompleted + 1,
      lastActive: new Date(),
      metrics: {
        ...agent.metrics,
        totalProcessed: agent.metrics.totalProcessed + 1,
        successRate: ((agent.metrics.successRate * agent.metrics.totalProcessed + 100) / (agent.metrics.totalProcessed + 1))
      }
    });

    set((state) => ({
      orchestrator: {
        ...state.orchestrator,
        totalTasksProcessed: state.orchestrator.totalTasksProcessed + 1,
        lastDecision: `Task ${taskId} completed by ${agent.name}`
      }
    }));

    get().addLog({
      level: 'success',
      source: agent.name,
      message: `Task completed: ${task.title}`,
      metadata: { taskId, output }
    });

    if (get().orchestrator.mode === 'auto') {
      setTimeout(() => get().processNextTask(), 1000);
    }
  },

  failTask: (taskId, error) => {
    const task = get().tasks.find(t => t.id === taskId);
    if (!task || !task.assignedTo) return;

    const agent = get().agents.find(a => a.id === task.assignedTo);
    if (!agent) return;

    get().updateTask(taskId, {
      status: 'failed',
      errorMessage: error
    });

    get().updateAgent(task.assignedTo, {
      status: 'error',
      currentTask: null,
      errorCount: agent.errorCount + 1,
      metrics: {
        ...agent.metrics,
        totalProcessed: agent.metrics.totalProcessed + 1,
        successRate: ((agent.metrics.successRate * agent.metrics.totalProcessed) / (agent.metrics.totalProcessed + 1))
      }
    });

    get().addLog({
      level: 'error',
      source: agent.name,
      message: `Task failed: ${task.title} - ${error}`,
      metadata: { taskId, error }
    });

    setTimeout(() => {
      get().updateAgent(task.assignedTo!, { status: 'idle' });
    }, 3000);
  },

  updateAgent: (id, updates) => {
    set((state) => ({
      agents: state.agents.map(a =>
        a.id === id ? { ...a, ...updates } : a
      )
    }));
  },

  addLog: (logData) => {
    const log: SystemLog = {
      ...logData,
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date()
    };

    set((state) => ({
      logs: [log, ...state.logs].slice(0, 100)
    }));
  },

  setOrchestratorMode: (mode) => {
    set((state) => ({
      orchestrator: { ...state.orchestrator, mode }
    }));

    get().addLog({
      level: 'info',
      source: 'orchestrator',
      message: `Orchestrator mode changed to ${mode}`
    });

    if (mode === 'auto') {
      get().processNextTask();
    }
  },

  processNextTask: () => {
    const state = get();
    const pendingTasks = state.tasks.filter(t => t.status === 'pending');

    if (pendingTasks.length === 0) return;

    const idleAgents = state.agents.filter(a => a.status === 'idle');

    if (idleAgents.length === 0) return;

    // Sort tasks by priority
    const sortedTasks = pendingTasks.sort((a, b) => {
      const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

    const task = sortedTasks[0];

    // Find best agent for task
    let bestAgent = idleAgents.find(a => a.type === task.agentType);
    if (!bestAgent) {
      bestAgent = idleAgents[0];
    }

    get().assignTask(task.id, bestAgent.id);
  }
}));
