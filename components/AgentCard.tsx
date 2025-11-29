'use client';

import { Agent } from '@/lib/types';
import { Activity, CheckCircle, XCircle, Clock, Zap } from 'lucide-react';

interface AgentCardProps {
  agent: Agent;
}

export default function AgentCard({ agent }: AgentCardProps) {
  const statusColors = {
    idle: 'bg-gray-700 text-gray-300',
    working: 'bg-blue-600 text-white',
    waiting: 'bg-yellow-600 text-white',
    error: 'bg-red-600 text-white',
    completed: 'bg-green-600 text-white'
  };

  const statusIcons = {
    idle: Clock,
    working: Activity,
    waiting: Clock,
    error: XCircle,
    completed: CheckCircle
  };

  const StatusIcon = statusIcons[agent.status];

  const typeColors = {
    research: 'border-purple-500',
    creative: 'border-pink-500',
    tech: 'border-blue-500',
    sales: 'border-green-500',
    support: 'border-yellow-500'
  };

  return (
    <div className={`bg-gray-800 border-2 ${typeColors[agent.type]} rounded-lg p-4 hover:shadow-lg transition-all`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-bold text-white">{agent.name}</h3>
          <p className="text-sm text-gray-400 uppercase">{agent.type}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${statusColors[agent.status]}`}>
          <StatusIcon size={14} />
          {agent.status}
        </div>
      </div>

      {agent.currentTask && (
        <div className="mb-3 p-2 bg-gray-900 rounded border border-gray-700">
          <p className="text-xs text-gray-400">Current Task</p>
          <p className="text-sm text-white truncate">{agent.currentTask}</p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="text-center p-2 bg-gray-900 rounded">
          <p className="text-2xl font-bold text-green-400">{agent.tasksCompleted}</p>
          <p className="text-xs text-gray-500">Completed</p>
        </div>
        <div className="text-center p-2 bg-gray-900 rounded">
          <p className="text-2xl font-bold text-red-400">{agent.errorCount}</p>
          <p className="text-xs text-gray-500">Errors</p>
        </div>
        <div className="text-center p-2 bg-gray-900 rounded">
          <p className="text-2xl font-bold text-blue-400">{agent.metrics.successRate.toFixed(0)}%</p>
          <p className="text-xs text-gray-500">Success</p>
        </div>
      </div>

      <div className="mb-3">
        <p className="text-xs text-gray-400 mb-1">Capabilities</p>
        <div className="flex flex-wrap gap-1">
          {agent.capabilities.slice(0, 3).map(cap => (
            <span key={cap} className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded">
              {cap}
            </span>
          ))}
          {agent.capabilities.length > 3 && (
            <span className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded">
              +{agent.capabilities.length - 3}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-500">
        <Zap size={12} />
        <span>Avg: {agent.metrics.avgCompletionTime}s</span>
        <span className="ml-auto">{agent.metrics.totalProcessed} processed</span>
      </div>
    </div>
  );
}
