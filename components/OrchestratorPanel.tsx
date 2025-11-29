'use client';

import { useStore } from '@/lib/store';
import { Brain, Power, Activity, AlertTriangle, CheckCircle } from 'lucide-react';

export default function OrchestratorPanel() {
  const { orchestrator, setOrchestratorMode, agents, tasks } = useStore();

  const activeAgents = agents.filter(a => a.status === 'working').length;
  const pendingTasks = tasks.filter(t => t.status === 'pending').length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const failedTasks = tasks.filter(t => t.status === 'failed').length;

  const healthColors = {
    healthy: 'text-green-400',
    degraded: 'text-yellow-400',
    critical: 'text-red-400'
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-lg p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-600 rounded-lg">
            <Brain size={32} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Master Orchestrator</h2>
            <p className="text-sm text-gray-400">GPT-4o / Claude Sonnet</p>
          </div>
        </div>
        <div className={`flex items-center gap-2 ${healthColors[orchestrator.systemHealth]}`}>
          <Activity size={24} />
          <span className="font-bold uppercase">{orchestrator.systemHealth}</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Active Agents</span>
            <Power size={16} className="text-green-400" />
          </div>
          <p className="text-3xl font-bold text-white">{activeAgents}</p>
          <p className="text-xs text-gray-500">of {agents.length} total</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Pending Tasks</span>
            <AlertTriangle size={16} className="text-yellow-400" />
          </div>
          <p className="text-3xl font-bold text-white">{pendingTasks}</p>
          <p className="text-xs text-gray-500">awaiting assignment</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Completed</span>
            <CheckCircle size={16} className="text-green-400" />
          </div>
          <p className="text-3xl font-bold text-white">{completedTasks}</p>
          <p className="text-xs text-gray-500">total processed: {orchestrator.totalTasksProcessed}</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Failed Tasks</span>
            <AlertTriangle size={16} className="text-red-400" />
          </div>
          <p className="text-3xl font-bold text-white">{failedTasks}</p>
          <p className="text-xs text-gray-500">
            {tasks.length > 0 ? ((failedTasks / tasks.length) * 100).toFixed(1) : 0}% failure rate
          </p>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-semibold mb-1">Orchestration Mode</p>
            <p className="text-sm text-gray-400">
              {orchestrator.mode === 'auto'
                ? 'Automatically routing and assigning tasks'
                : 'Manual task assignment enabled'}
            </p>
          </div>
          <button
            onClick={() => setOrchestratorMode(orchestrator.mode === 'auto' ? 'manual' : 'auto')}
            className={`px-6 py-3 rounded-lg font-bold transition-all ${
              orchestrator.mode === 'auto'
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
            }`}
          >
            {orchestrator.mode === 'auto' ? 'AUTO' : 'MANUAL'}
          </button>
        </div>
      </div>

      {orchestrator.lastDecision && (
        <div className="bg-gray-800 rounded-lg p-4 border border-purple-900">
          <p className="text-xs text-gray-400 mb-1">Last Decision</p>
          <p className="text-sm text-white">{orchestrator.lastDecision}</p>
        </div>
      )}
    </div>
  );
}
