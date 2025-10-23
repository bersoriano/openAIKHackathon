'use client';

import { useState, FormEvent } from 'react';
// Using standard HTML elements with Tailwind classes
import { Plus, Trash2, Send } from 'lucide-react';

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
  const [showFeedback, setShowFeedback] = useState(false);

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
      setShowFeedback(true);
      // Update the optimizer field with optimized content
      setFormData(prev => ({
        ...prev,
        optimizer: "Descubre en 2 minutos cuánto vale tu auto 🚗\nCotiza ahora y sorpréndete con tu oferta 👇\n#CotizaFácil #AhorraTiempo"
      }));
    }, 5000);
  };


  const handlePrefill = () => {
    const prefillData = {
      optimizer: 'En cualquier momento y a cualquier hora, cotiza y recibe una oferta en 2 minutos 🚗',
      goals: [
        { id: 1, prompt: 'I want users to use our quote tool.', type: 'Produce' as const }
      ],
      agentDescriptions: [
        { id: 1, prompt: 'You are a senior Twitter growth expert famed for crafting posts that drive exceptional link click-through rates. Examine the draft post below and share specialist feedback on how to position it so readers feel compelled to click. Deliver pointed, actionable advice covering: - Snapshot of what already supports strong click intent. - The biggest friction points that could slow clicks. - 3-5 precise optimizations (e.g., curiosity gaps, benefit-forward framing, urgency cues, CTA placement, preview asset guidance) that increase click-through likelihood while keeping the core message intact. Do not rewrite the post word for word. Provide coaching the author can implement.' },
        { id: 2, prompt: 'You are an experienced community-building strategist for Twitter known for sparking lively comment threads. Review the draft post below and advise how to reshape it so followers feel eager to reply and keep the conversation going. Provide clear, expert guidance that includes: - Brief diagnostic of elements that already invite discussion. - Key obstacles that might suppress comments or replies. - 3-5 targeted adjustments (e.g., question hooks, controversy calibration, participation prompts, timing, reply incentives) that encourage meaningful responses. Avoid rewriting the entire post. Share coaching the author can act on.' }
      ]
    };
    
    setFormData(prefillData);
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
              <textarea
                value={formData.optimizer}
                onChange={(e) => setFormData(prev => ({ ...prev, optimizer: e.target.value }))}
                placeholder="Enter your optimizer configuration..."
                className="w-full text-lg py-6 px-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                rows={4}
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

          {/* Feedback Section */}
          {showFeedback && (
            <div className="bg-white rounded-lg shadow-md border">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold flex items-center gap-2 text-purple-600">
                  📊 Content Optimization Feedback
                </h3>
              </div>
              <div className="p-6 space-y-6">
                {/* Snapshot of Strengths */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="text-md font-semibold text-green-800 mb-3 flex items-center gap-2">
                    ✅ Snapshot of Strengths (What Drives Click Intent)
                  </h4>
                  <ul className="text-sm text-green-700 space-y-2">
                    <li>• The post's promise of speed — "recibe una oferta en 2 minutos" — is clear and motivating.</li>
                    <li>• The car emoji 🚗 visually cues relevance and helps capture attention.</li>
                    <li>• The simplicity and brevity make it ideal for Twitter's fast-scrolling environment.</li>
                  </ul>
                </div>

                {/* Friction Points */}
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h4 className="text-md font-semibold text-orange-800 mb-3 flex items-center gap-2">
                    ⚠️ Friction Points (What Might Reduce Clicks)
                  </h4>
                  <ul className="text-sm text-orange-700 space-y-2">
                    <li>• Lacks a direct CTA prompting users to click (e.g., "haz clic aquí" or "cotiza ahora").</li>
                    <li>• Doesn't specify why the user should want a quote beyond speed (no clear benefit beyond quickness).</li>
                    <li>• "En cualquier momento y a cualquier hora" is a nice convenience cue but could sound generic; it doesn't build urgency or emotional pull.</li>
                  </ul>
                </div>

                {/* Optimizations */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="text-md font-semibold text-blue-800 mb-3 flex items-center gap-2">
                    🚀 3–5 Optimizations to Improve CTR
                  </h4>
                  <ul className="text-sm text-blue-700 space-y-2">
                    <li>• <strong>Add a benefit-forward hook:</strong> briefly mention what users gain by getting a quote (e.g., "ahorra dinero," "descubre cuánto vale tu auto," etc.).</li>
                    <li>• <strong>Insert a strong CTA at the end:</strong> invite immediate action with phrases like "Cotiza ahora" or "Descubre tu oferta aquí👇."</li>
                    <li>• <strong>Create a micro-curiosity gap:</strong> imply there's something surprising or worth discovering in the quote result (e.g., "Te sorprenderá lo rápido que puedes ahorrar").</li>
                    <li>• <strong>Use an urgency cue:</strong> light pressure can increase clicks — e.g., "No esperes para saberlo."</li>
                    <li>• <strong>Preview asset guidance:</strong> pair the tweet with a dynamic visual (like a 2-minute countdown animation or a before/after quote comparison) to strengthen the promise of speed.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-6 space-y-4">
            <button
              type="button"
              onClick={handlePrefill}
              disabled={isLoading}
              className="w-full text-lg py-4 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-semibold rounded-lg flex items-center justify-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              Prefill
            </button>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full text-lg py-8 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-semibold rounded-lg flex items-center justify-center"
            >
              <Send className="h-5 w-5 mr-2" />
              {isLoading ? 'Processing...' : 'Optimize content'}
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