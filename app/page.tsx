'use client';

import { useEffect } from 'react';
import { useStore } from '@/lib/store';
import AgentCard from '@/components/AgentCard';
import TaskCard from '@/components/TaskCard';
import OrchestratorPanel from '@/components/OrchestratorPanel';
import TaskCreator from '@/components/TaskCreator';
import SystemLogs from '@/components/SystemLogs';
import { Network } from 'lucide-react';

export default function Home() {
  const { agents, tasks, logs, addTask } = useStore();

  useEffect(() => {
    // Add some sample tasks on mount
    const sampleTasks = [
      {
        title: 'Market Analysis for Q4',
        description: 'Analyze competitor strategies and market trends for Q4 planning',
        priority: 'high' as const,
        status: 'pending' as const,
        assignedTo: null,
        agentType: 'research' as const,
        completedAt: null,
        dependencies: [],
        output: null,
        errorMessage: null,
        estimatedDuration: 120,
        actualDuration: null
      },
      {
        title: 'Create Social Media Campaign',
        description: 'Design a comprehensive social media campaign for new product launch',
        priority: 'medium' as const,
        status: 'pending' as const,
        assignedTo: null,
        agentType: 'creative' as const,
        completedAt: null,
        dependencies: [],
        output: null,
        errorMessage: null,
        estimatedDuration: 180,
        actualDuration: null
      },
      {
        title: 'Fix Authentication Bug',
        description: 'Resolve JWT token expiration issues in production',
        priority: 'critical' as const,
        status: 'pending' as const,
        assignedTo: null,
        agentType: 'tech' as const,
        completedAt: null,
        dependencies: [],
        output: null,
        errorMessage: null,
        estimatedDuration: 240,
        actualDuration: null
      },
      {
        title: 'Outreach to Enterprise Clients',
        description: 'Contact 50 enterprise leads with personalized proposals',
        priority: 'high' as const,
        status: 'pending' as const,
        assignedTo: null,
        agentType: 'sales' as const,
        completedAt: null,
        dependencies: [],
        output: null,
        errorMessage: null,
        estimatedDuration: 150,
        actualDuration: null
      },
      {
        title: 'Update Customer Documentation',
        description: 'Revise help documentation based on recent feature updates',
        priority: 'low' as const,
        status: 'pending' as const,
        assignedTo: null,
        agentType: 'support' as const,
        completedAt: null,
        dependencies: [],
        output: null,
        errorMessage: null,
        estimatedDuration: 90,
        actualDuration: null
      }
    ];

    if (tasks.length === 0) {
      sampleTasks.forEach(task => addTask(task));
    }
  }, []);

  const pendingTasks = tasks.filter(t => t.status === 'pending' || t.status === 'assigned');
  const activeTasks = tasks.filter(t => t.status === 'in_progress' || t.status === 'review');
  const completedTasks = tasks.filter(t => t.status === 'completed' || t.status === 'failed');

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black p-6">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Network size={48} className="text-purple-500" />
            <h1 className="text-5xl font-bold text-white">LUXOR9</h1>
          </div>
          <p className="text-gray-400 text-lg">Multi-Agent Orchestration Platform</p>
        </div>

        {/* Orchestrator Panel */}
        <div className="mb-8">
          <OrchestratorPanel />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          {/* Agents Section */}
          <div className="xl:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Network size={24} />
              Agent Fleet
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {agents.map(agent => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          </div>

          {/* System Logs */}
          <div>
            <SystemLogs logs={logs} />
          </div>
        </div>

        {/* Task Management */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Pending Tasks */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">
                Pending Tasks ({pendingTasks.length})
              </h2>
            </div>
            <div className="space-y-3 mb-4">
              <TaskCreator />
              {pendingTasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>

          {/* Active Tasks */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">
              Active Tasks ({activeTasks.length})
            </h2>
            <div className="space-y-3">
              {activeTasks.length === 0 ? (
                <div className="bg-gray-800 rounded-lg p-8 text-center">
                  <p className="text-gray-500">No active tasks</p>
                </div>
              ) : (
                activeTasks.map(task => (
                  <TaskCard key={task.id} task={task} />
                ))
              )}
            </div>
          </div>

          {/* Completed Tasks */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">
              Completed Tasks ({completedTasks.length})
            </h2>
            <div className="space-y-3 max-h-[800px] overflow-y-auto">
              {completedTasks.length === 0 ? (
                <div className="bg-gray-800 rounded-lg p-8 text-center">
                  <p className="text-gray-500">No completed tasks yet</p>
                </div>
              ) : (
                completedTasks.map(task => (
                  <TaskCard key={task.id} task={task} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
