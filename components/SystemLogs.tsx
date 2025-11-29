'use client';

import { SystemLog } from '@/lib/types';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';
import { format } from 'date-fns';

interface SystemLogsProps {
  logs: SystemLog[];
}

export default function SystemLogs({ logs }: SystemLogsProps) {
  const levelColors = {
    info: 'text-blue-400',
    warning: 'text-yellow-400',
    error: 'text-red-400',
    success: 'text-green-400'
  };

  const levelIcons = {
    info: Info,
    warning: AlertCircle,
    error: XCircle,
    success: CheckCircle
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 h-[400px] overflow-y-auto">
      <h3 className="text-white font-bold mb-3 flex items-center gap-2">
        <Activity size={20} />
        System Logs
      </h3>
      <div className="space-y-2">
        {logs.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-8">No logs yet</p>
        ) : (
          logs.map((log) => {
            const Icon = levelIcons[log.level];
            return (
              <div
                key={log.id}
                className="p-2 bg-gray-900 rounded border border-gray-700 hover:border-gray-600 transition-colors"
              >
                <div className="flex items-start gap-2">
                  <Icon size={16} className={`mt-0.5 ${levelColors[log.level]}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-gray-500">
                        {format(log.timestamp, 'HH:mm:ss')}
                      </span>
                      <span className="text-xs text-gray-600">•</span>
                      <span className="text-xs text-gray-400">{log.source}</span>
                    </div>
                    <p className="text-sm text-white">{log.message}</p>
                    {log.metadata && (
                      <details className="mt-1">
                        <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-400">
                          View metadata
                        </summary>
                        <pre className="text-xs text-gray-400 mt-1 p-2 bg-gray-950 rounded overflow-x-auto">
                          {JSON.stringify(log.metadata, null, 2)}
                        </pre>
                      </details>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

function Activity({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}
