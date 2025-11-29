'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { AgentType, TaskPriority } from '@/lib/types';
import { Plus } from 'lucide-react';

export default function TaskCreator() {
  const { addTask } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [agentType, setAgentType] = useState<AgentType | ''>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    addTask({
      title,
      description,
      priority,
      status: 'pending',
      assignedTo: null,
      agentType: agentType || null,
      completedAt: null,
      dependencies: [],
      output: null,
      errorMessage: null,
      estimatedDuration: 120,
      actualDuration: null
    });

    setTitle('');
    setDescription('');
    setPriority('medium');
    setAgentType('');
    setIsOpen(false);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold flex items-center justify-center gap-2 transition-all"
        >
          <Plus size={20} />
          Create New Task
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Task Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:outline-none focus:border-purple-500"
              placeholder="Enter task title..."
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:outline-none focus:border-purple-500 resize-none"
              placeholder="Describe the task..."
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:outline-none focus:border-purple-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Agent Type (Optional)</label>
              <select
                value={agentType}
                onChange={(e) => setAgentType(e.target.value as AgentType | '')}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:outline-none focus:border-purple-500"
              >
                <option value="">Auto-assign</option>
                <option value="research">Research</option>
                <option value="creative">Creative</option>
                <option value="tech">Tech</option>
                <option value="sales">Sales</option>
                <option value="support">Support</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-bold transition-all"
            >
              Create Task
            </button>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setTitle('');
                setDescription('');
              }}
              className="flex-1 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded font-bold transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
