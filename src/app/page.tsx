'use client';

import { useState, FormEvent } from 'react';
import { Plus, Trash2, Send, Sparkles, Target, Users, Zap, Copy, Check } from 'lucide-react';

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
  const [copied, setCopied] = useState(false);

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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formData.optimizer);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('Form Data:', formData);
    
    setTimeout(() => {
      setIsLoading(false);
      setShowFeedback(true);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4 animate-in zoom-in duration-300">
            <div className="text-center">
              <div className="mb-6 relative">
                <div className="inline-flex items-center justify-center">
                  <Sparkles className="absolute w-12 h-12 text-purple-600 animate-pulse" />
                  <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">AI is Optimizing Your Content</h3>
              <p className="text-gray-600 mb-4">
                Analyzing engagement patterns and crafting the perfect message...
              </p>
              <div className="flex justify-center gap-1.5">
                <span className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-in slide-in-from-top duration-700">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4 shadow-lg">
            <Sparkles className="w-4 h-4" />
            AI-Powered Social Media Optimizer
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Optimize Your Content
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Leverage AI agents to create engaging social media posts that drive clicks, comments, and conversions
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Content Input Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow duration-300 animate-in slide-in-from-bottom duration-700">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Your Content</h3>
                  <p className="text-purple-100 text-sm">Paste your social media post draft</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="relative">
                <textarea
                  value={formData.optimizer}
                  onChange={(e) => setFormData(prev => ({ ...prev, optimizer: e.target.value }))}
                  placeholder="En cualquier momento y a cualquier hora, cotiza y recibe una oferta en 2 minutos 🚗"
                  className="w-full text-lg py-4 px-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 resize-none transition-all duration-200 placeholder:text-gray-400"
                  rows={5}
                  required
                />
                {formData.optimizer && (
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="absolute top-3 right-3 p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                    title="Copy to clipboard"
                  >
                    {copied ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <Copy className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                )}
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                <span>{formData.optimizer.length} characters</span>
                <span>•</span>
                <span>{formData.optimizer.split(/\s+/).filter(word => word.length > 0).length} words</span>
              </div>
            </div>
          </div>

          {/* Goals Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow duration-300 animate-in slide-in-from-bottom duration-700 animation-delay-150">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Campaign Goals</h3>
                  <p className="text-emerald-100 text-sm">Define what you want to achieve</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                    placeholder="e.g., Increase click-through rate..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addGoal();
                      }
                    }}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200"
                  />
                  <select
                    value={newGoalType}
                    onChange={(e) => setNewGoalType(e.target.value as 'Growth' | 'Produce')}
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white transition-all duration-200 font-medium"
                  >
                    <option value="Growth">📈 Growth</option>
                    <option value="Produce">🎯 Produce</option>
                  </select>
                  <button
                    type="button"
                    onClick={addGoal}
                    disabled={!newGoal.trim()}
                    className="flex-shrink-0 px-5 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
                {formData.goals.length > 0 && (
                  <div className="space-y-3 mt-4">
                    {formData.goals.map((goal, index) => (
                      <div
                        key={goal.id}
                        className="group flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border-2 border-emerald-200 hover:border-emerald-300 transition-all duration-200 animate-in slide-in-from-left"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                            {index + 1}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-emerald-900">{goal.prompt}</span>
                            <span className="text-xs text-emerald-600 mt-0.5 font-medium">
                              {goal.type === 'Growth' ? '📈 Growth Focus' : '🎯 Production Focus'}
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeGoal(goal.id)}
                          className="flex-shrink-0 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
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

          {/* AI Agents Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow duration-300 animate-in slide-in-from-bottom duration-700 animation-delay-300">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">AI Agent Personas</h3>
                  <p className="text-blue-100 text-sm">Add expert agents to analyze your content</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newAgentDesc}
                    onChange={(e) => setNewAgentDesc(e.target.value)}
                    placeholder="Describe your AI agent's expertise..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addAgentDesc();
                      }
                    }}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={addAgentDesc}
                    disabled={!newAgentDesc.trim()}
                    className="flex-shrink-0 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
                {formData.agentDescriptions.length > 0 && (
                  <div className="space-y-3 mt-4">
                    {formData.agentDescriptions.map((agent, index) => (
                      <div
                        key={agent.id}
                        className="group flex items-start justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 hover:border-blue-300 transition-all duration-200 animate-in slide-in-from-right"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="flex gap-3 flex-1">
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                            {index + 1}
                          </div>
                          <p className="text-sm text-blue-900 leading-relaxed">{agent.prompt}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeAgentDesc(agent.id)}
                          className="flex-shrink-0 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
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
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-in slide-in-from-bottom duration-700">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">AI Analysis & Insights</h3>
                    <p className="text-purple-100 text-sm">Expert feedback on your content</p>
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-6">
                {/* Strengths */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-5 hover:shadow-lg transition-shadow duration-200">
                  <h4 className="text-lg font-bold text-green-800 mb-4 flex items-center gap-2">
                    <span className="text-2xl">✅</span>
                    What's Working Well
                  </h4>
                  <ul className="space-y-2.5">
                    <li className="flex gap-2 text-sm text-green-700 leading-relaxed">
                      <span className="text-green-500 font-bold">•</span>
                      <span>The promise of speed — "recibe una oferta en 2 minutos" — is clear and motivating.</span>
                    </li>
                    <li className="flex gap-2 text-sm text-green-700 leading-relaxed">
                      <span className="text-green-500 font-bold">•</span>
                      <span>The car emoji 🚗 visually cues relevance and helps capture attention.</span>
                    </li>
                    <li className="flex gap-2 text-sm text-green-700 leading-relaxed">
                      <span className="text-green-500 font-bold">•</span>
                      <span>The simplicity and brevity make it ideal for Twitter's fast-scrolling environment.</span>
                    </li>
                  </ul>
                </div>

                {/* Friction Points */}
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-xl p-5 hover:shadow-lg transition-shadow duration-200">
                  <h4 className="text-lg font-bold text-orange-800 mb-4 flex items-center gap-2">
                    <span className="text-2xl">⚠️</span>
                    Areas for Improvement
                  </h4>
                  <ul className="space-y-2.5">
                    <li className="flex gap-2 text-sm text-orange-700 leading-relaxed">
                      <span className="text-orange-500 font-bold">•</span>
                      <span>Lacks a direct CTA prompting users to click (e.g., "haz clic aquí" or "cotiza ahora").</span>
                    </li>
                    <li className="flex gap-2 text-sm text-orange-700 leading-relaxed">
                      <span className="text-orange-500 font-bold">•</span>
                      <span>Doesn't specify why the user should want a quote beyond speed (no clear benefit beyond quickness).</span>
                    </li>
                    <li className="flex gap-2 text-sm text-orange-700 leading-relaxed">
                      <span className="text-orange-500 font-bold">•</span>
                      <span>"En cualquier momento y a cualquier hora" could sound generic and lacks urgency.</span>
                    </li>
                  </ul>
                </div>

                {/* Optimizations */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-5 hover:shadow-lg transition-shadow duration-200">
                  <h4 className="text-lg font-bold text-blue-800 mb-4 flex items-center gap-2">
                    <span className="text-2xl">🚀</span>
                    Recommended Optimizations
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex gap-2 text-sm text-blue-700 leading-relaxed">
                      <span className="text-blue-500 font-bold">1.</span>
                      <div>
                        <strong className="text-blue-900">Add a benefit-forward hook:</strong> briefly mention what users gain by getting a quote (e.g., "ahorra dinero," "descubre cuánto vale tu auto").
                      </div>
                    </li>
                    <li className="flex gap-2 text-sm text-blue-700 leading-relaxed">
                      <span className="text-blue-500 font-bold">2.</span>
                      <div>
                        <strong className="text-blue-900">Insert a strong CTA:</strong> invite immediate action with phrases like "Cotiza ahora" or "Descubre tu oferta aquí👇."
                      </div>
                    </li>
                    <li className="flex gap-2 text-sm text-blue-700 leading-relaxed">
                      <span className="text-blue-500 font-bold">3.</span>
                      <div>
                        <strong className="text-blue-900">Create curiosity:</strong> imply there's something surprising (e.g., "Te sorprenderá lo rápido que puedes ahorrar").
                      </div>
                    </li>
                    <li className="flex gap-2 text-sm text-blue-700 leading-relaxed">
                      <span className="text-blue-500 font-bold">4.</span>
                      <div>
                        <strong className="text-blue-900">Use urgency cues:</strong> light pressure can increase clicks — e.g., "No esperes para saberlo."
                      </div>
                    </li>
                    <li className="flex gap-2 text-sm text-blue-700 leading-relaxed">
                      <span className="text-blue-500 font-bold">5.</span>
                      <div>
                        <strong className="text-blue-900">Visual enhancement:</strong> pair with a countdown animation or before/after comparison.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-4 space-y-3 animate-in slide-in-from-bottom duration-700 animation-delay-450">
            <button
              type="button"
              onClick={handlePrefill}
              disabled={isLoading}
              className="w-full text-lg py-4 px-6 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700 font-semibold rounded-xl flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <Zap className="h-5 w-5 mr-2" />
              Quick Fill Example
            </button>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full text-xl py-6 px-8 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-bold rounded-xl flex items-center justify-center transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="h-6 w-6 mr-3" />
              {isLoading ? 'Optimizing...' : 'Optimize My Content'}
              <Send className="h-5 w-5 ml-3" />
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animation-delay-150 {
          animation-delay: 150ms;
        }
        .animation-delay-300 {
          animation-delay: 300ms;
        }
        .animation-delay-450 {
          animation-delay: 450ms;
        }
      `}</style>
    </div>
  );
}
