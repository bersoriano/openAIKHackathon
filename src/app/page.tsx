'use client';

import { useState, FormEvent } from 'react';
// Using standard HTML elements with Tailwind classes
import { Plus, Trash2, Save } from 'lucide-react';

interface Goal {
  id: number;
  prompt: string;
  type: 'Growth' | 'Produce';
}

interface AgentDescription {
  id: number;
  prompt: string;
}

export default function FormApp() {
  const [formData, setFormData] = useState({
    optimizer: '',
    goals: [] as Goal[],
    agentDescriptions: [] as AgentDescription[]
  });

  const [newGoal, setNewGoal] = useState('');
  const [newGoalType, setNewGoalType] = useState<'Growth' | 'Produce'>('Growth');
  const [newAgentDesc, setNewAgentDesc] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // const addPrompt = () => {
  //   if (newPrompt.trim()) {
  //     setFormData(prev => ({
  //       ...prev,
  //       prompts: [...prev.prompts, newPrompt.trim()]
  //     }));
  //     setNewPrompt('');
  //   }
  // };

  const addGoal = () => {
    if (newGoal.trim()) {
      const newId = formData.goals.length > 0 ? Math.max(...formData.goals.map(g => g.id)) + 1 : 1;
      setFormData(prev => ({
        ...prev,
        goals: [...prev.goals, { id: newId, prompt: newGoal.trim(), type: newGoalType }]
      }));
      setNewGoal('');
      setNewGoalType('Growth');
    }
  };

  const addAgentDesc = () => {
    if (newAgentDesc.trim()) {
      const newId = formData.agentDescriptions.length > 0 ? Math.max(...formData.agentDescriptions.map(a => a.id)) + 1 : 1;
      setFormData(prev => ({
        ...prev,
        agentDescriptions: [...prev.agentDescriptions, { id: newId, prompt: newAgentDesc.trim() }]
      }));
      setNewAgentDesc('');
    }
  };

  // const removePrompt = (index: number) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     prompts: prev.prompts.filter((_, i) => i !== index)
  //   }));
  // };

  const removeGoal = (id: number) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.filter(goal => goal.id !== id)
    }));
  };

  const removeAgentDesc = (id: number) => {
    setFormData(prev => ({
      ...prev,
      agentDescriptions: prev.agentDescriptions.filter(agent => agent.id !== id)
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('Form Data:', formData);
    
    // Simulate processing for 5 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  };

  const handleOptimizerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      optimizer: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 shadow-2xl max-w-md w-full mx-4">
            <div className="text-center">
              <div className="mb-6">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Thinking With OpenAI</h3>
              <p className="text-gray-600 flex items-center justify-center gap-1">
                You will get an optimized version of your content in a few seconds.
                <span className="flex gap-1">
                  <span className="animate-bounce" style={{ animationDelay: '0ms' }}>.</span>
                  <span className="animate-bounce" style={{ animationDelay: '150ms' }}>.</span>
                  <span className="animate-bounce" style={{ animationDelay: '300ms' }}>.</span>
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            AI Configuration Form
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Configure your optimizer, prompts, goals, and agent descriptions
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Optimizer Field */}
          <div className="bg-white rounded-lg shadow-md border">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                Optimizer
              </h3>
            </div>
            <div className="p-6">
              <input
                type="text"
                value={formData.optimizer}
                onChange={handleOptimizerChange}
                placeholder="Enter your optimizer configuration..."
                className="w-full text-lg py-6 px-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </div>

          {/* Prompts - Multiple */}
          {/* <div className="bg-white rounded-lg shadow-md border">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                Prompts
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newPrompt}
                    onChange={(e) => setNewPrompt(e.target.value)}
                    placeholder="Enter new prompt..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') addPrompt();
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={addPrompt}
                    disabled={!newPrompt.trim()}
                    className="flex-shrink-0 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                {formData.prompts.length > 0 && (
                  <div className="space-y-2">
                    {formData.prompts.map((prompt, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                      >
                        <span className="text-sm">{prompt}</span>
                        <button
                          type="button"
                          onClick={() => removePrompt(index)}
                          className="h-8 w-8 p-0 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div> */}

          {/* Goals - Multiple */}
          <div className="bg-white rounded-lg shadow-md border">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                Goals
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                    placeholder="Enter new goal..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') addGoal();
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <select
                    value={newGoalType}
                    onChange={(e) => setNewGoalType(e.target.value as 'Growth' | 'Produce')}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                  >
                    <option value="Growth">Growth</option>
                    <option value="Produce">Produce</option>
                  </select>
                  <button
                    type="button"
                    onClick={addGoal}
                    disabled={!newGoal.trim()}
                    className="flex-shrink-0 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                {formData.goals.length > 0 && (
                  <div className="space-y-2">
                    {formData.goals.map((goal) => (
                      <div
                        key={goal.id}
                        className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-200"
                      >
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-emerald-800">{goal.prompt}</span>
                          <span className="text-xs text-emerald-600 mt-1">Type: {goal.type}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeGoal(goal.id)}
                          className="h-8 w-8 p-0 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Agent Descriptions - Multiple */}
          <div className="bg-white rounded-lg shadow-md border">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                Agent Descriptions
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newAgentDesc}
                    onChange={(e) => setNewAgentDesc(e.target.value)}
                    placeholder="Enter new agent description..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') addAgentDesc();
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={addAgentDesc}
                    disabled={!newAgentDesc.trim()}
                    className="flex-shrink-0 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                {formData.agentDescriptions.length > 0 && (
                  <div className="space-y-2">
                    {formData.agentDescriptions.map((agent) => (
                      <div
                        key={agent.id}
                        className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg border border-indigo-200"
                      >
                        <span className="text-sm font-medium text-indigo-800">{agent.prompt}</span>
                        <button
                          type="button"
                          onClick={() => removeAgentDesc(agent.id)}
                          className="h-8 w-8 p-0 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full text-lg py-8 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-semibold rounded-lg flex items-center justify-center"
            >
              <Save className="h-5 w-5 mr-2" />
              {isLoading ? 'Processing...' : 'Self Optimize content'}
            </button>
          </div>
        </form>

        {/* Debug Info */}
        <div className="mt-8 bg-white rounded-lg shadow-md border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold">Current Form Data (Debug)</h3>
          </div>
          <div className="p-6">
            <pre className="text-xs bg-gray-900 text-gray-100 p-4 rounded-lg overflow-auto max-h-96">
              {JSON.stringify(formData, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}