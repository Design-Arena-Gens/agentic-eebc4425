'use client';

import { Task } from '@/lib/types';
import { AlertCircle, CheckCircle, Clock, Play, XCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const statusColors = {
    pending: 'bg-gray-700 text-gray-300',
    assigned: 'bg-blue-600 text-white',
    in_progress: 'bg-purple-600 text-white',
    review: 'bg-yellow-600 text-white',
    completed: 'bg-green-600 text-white',
    failed: 'bg-red-600 text-white',
    blocked: 'bg-orange-600 text-white'
  };

  const priorityColors = {
    low: 'border-l-gray-500',
    medium: 'border-l-blue-500',
    high: 'border-l-orange-500',
    critical: 'border-l-red-500'
  };

  const statusIcons = {
    pending: Clock,
    assigned: Play,
    in_progress: Play,
    review: AlertCircle,
    completed: CheckCircle,
    failed: XCircle,
    blocked: AlertCircle
  };

  const StatusIcon = statusIcons[task.status];

  return (
    <div className={`bg-gray-800 border-l-4 ${priorityColors[task.priority]} rounded-lg p-4 hover:shadow-lg transition-all`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h4 className="text-white font-semibold mb-1">{task.title}</h4>
          <p className="text-sm text-gray-400 mb-2">{task.description}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${statusColors[task.status]} ml-2 whitespace-nowrap`}>
          <StatusIcon size={12} />
          {task.status}
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
        <span className={`px-2 py-1 rounded uppercase font-bold ${priorityColors[task.priority].replace('border-l-', 'bg-')} bg-opacity-20`}>
          {task.priority}
        </span>
        {task.agentType && (
          <span className="px-2 py-1 bg-gray-700 rounded">
            {task.agentType}
          </span>
        )}
        <span className="ml-auto">
          {formatDistanceToNow(task.createdAt, { addSuffix: true })}
        </span>
      </div>

      {task.assignedTo && (
        <div className="text-xs text-gray-400 mb-2">
          Assigned to: <span className="text-blue-400">{task.assignedTo}</span>
        </div>
      )}

      {task.output && (
        <div className="mt-2 p-2 bg-gray-900 rounded border border-green-900">
          <p className="text-xs text-green-400 font-semibold mb-1">Output:</p>
          <p className="text-xs text-gray-300">{task.output}</p>
        </div>
      )}

      {task.errorMessage && (
        <div className="mt-2 p-2 bg-gray-900 rounded border border-red-900">
          <p className="text-xs text-red-400 font-semibold mb-1">Error:</p>
          <p className="text-xs text-gray-300">{task.errorMessage}</p>
        </div>
      )}

      {task.dependencies.length > 0 && (
        <div className="mt-2 text-xs text-gray-500">
          Dependencies: {task.dependencies.join(', ')}
        </div>
      )}
    </div>
  );
}
