import React, { useState, useEffect } from "react";
import { DEVELOPMENT_PHASES } from "../data";
import { DevelopmentPhase, DevelopmentPhaseId } from "../types";
import { 
  Search, ShieldCheck, Check, Code, Copy, Layers, 
  Database, RefreshCw, FileText, CheckCircle2, ArrowRight
} from "lucide-react";

export default function CodeRoadmap() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPhaseId, setSelectedPhaseId] = useState<DevelopmentPhaseId>(1);
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});
  const [copiedText, setCopiedText] = useState(false);

  // Load checklist progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("sayed_world_completed_tasks");
    if (saved) {
      try {
        setCompletedTasks(JSON.parse(saved));
      } catch (e) {
        // ignore
      }
    } else {
      // Default initial states
      const initial: Record<string, boolean> = {};
      DEVELOPMENT_PHASES.forEach(p => {
        initial[`p-${p.id}-setup`] = p.id <= 2; // Pre-mark Phase 1 & 2 as checked for demonstration
        p.features.forEach((f, idx) => {
          initial[`p-${p.id}-feat-${idx}`] = p.id <= 2;
        });
      });
      setCompletedTasks(initial);
    }
  }, []);

  const saveTasks = (newTasks: Record<string, boolean>) => {
    setCompletedTasks(newTasks);
    localStorage.setItem("sayed_world_completed_tasks", JSON.stringify(newTasks));
  };

  const toggleTask = (key: string) => {
    const updated = { ...completedTasks, [key]: !completedTasks[key] };
    saveTasks(updated);
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  // Calculate global completion percentage
  const totalTasks = DEVELOPMENT_PHASES.reduce((acc, p) => acc + p.features.length + 1, 0); // features + base setup mark
  const checkedTasksCount = Object.values(completedTasks).filter(Boolean).length;
  const completionPercentage = Math.round((checkedTasksCount / totalTasks) * 100);

  // Filter phases by query
  const filteredPhases = DEVELOPMENT_PHASES.filter(p => {
    const query = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(query) ||
      p.objective.toLowerCase().includes(query) ||
      p.databaseTables.some(t => t.toLowerCase().includes(query)) ||
      p.migrations.some(m => m.toLowerCase().includes(query)) ||
      p.controllers.some(c => c.toLowerCase().includes(query)) ||
      p.routes.some(r => r.toLowerCase().includes(query))
    );
  });

  const activePhase = DEVELOPMENT_PHASES.find(p => p.id === selectedPhaseId) || DEVELOPMENT_PHASES[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="roadmap-viewer">
      {/* LHS Section: Phase Navigation list */}
      <div className="lg:col-span-4 glass-panel rounded-2xl p-4 h-[calc(100vh-220px)] overflow-y-auto flex flex-col relative z-10">
        <div className="mb-4">
          <h3 className="font-display font-semibold text-lg text-slate-800 dark:text-slate-200 flex items-center gap-2 mb-1">
            <Layers className="w-5 h-5 text-emerald-500" />
            Roadmap Navigator
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
            Search 20 development phases and follow standard implementation steps.
          </p>
          
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search tables, routes, controllers..."
              className="w-full text-xs pl-9 pr-4 py-2 bg-white/40 dark:bg-slate-950/40 border border-slate-200/50 dark:border-white/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-650 dark:text-slate-300 placeholder-slate-400"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Dynamic Global Progress Tracker */}
        <div className="glass-card rounded-lg p-3 border border-slate-200/40 dark:border-white/5 mb-4">
          <div className="flex justify-between items-center text-xs mb-1">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Global Construction Progress</span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{completionPercentage}%</span>
          </div>
          <div className="w-full bg-slate-200/60 dark:bg-slate-850 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        <div className="flex-1 space-y-1">
          {filteredPhases.length === 0 ? (
            <div className="text-center py-6 text-slate-400 text-xs">
              No matching phases found.
            </div>
          ) : (
            filteredPhases.map(p => {
              const setupKey = `p-${p.id}-setup`;
              const completedFeats = p.features.filter((f, idx) => completedTasks[`p-${p.id}-feat-${idx}`]).length;
              const isFullyDone = completedTasks[setupKey] && completedFeats === p.features.length;

              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPhaseId(p.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-all flex items-start gap-3 ${
                    selectedPhaseId === p.id
                      ? "bg-emerald-500/10 dark:bg-emerald-500/10 border-emerald-500/40 text-slate-900 dark:text-slate-100 shadow-sm"
                      : "bg-transparent border-transparent dark:border-transparent glass-card-hover text-slate-600 dark:text-slate-400"
                  }`}
                >
                  <div className="mt-0.5">
                    {isFullyDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <div className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center text-[9px] font-bold ${
                        selectedPhaseId === p.id 
                          ? "border-emerald-500 text-emerald-500" 
                          : "border-slate-305 dark:border-slate-600 text-slate-400"
                      }`}>
                        {p.id}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-xs truncate">{p.title}</div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-550 truncate mt-0.5">
                      {p.objective}
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* RHS Section: Selected Phase Specifications */}
      <div className="lg:col-span-8 glass-panel rounded-2xl h-[calc(100vh-220px)] overflow-y-auto p-6 flex flex-col relative z-10">
        {/* Phase Header */}
        <div className="border-b border-slate-200/50 dark:border-white/10 pb-4 mb-4 flex justify-between items-start flex-wrap gap-4">
          <div className="max-w-xl">
            <span className="text-[10px] bg-slate-200/50 dark:bg-white/5 text-slate-600 dark:text-slate-400 px-2.5 py-1 rounded-full font-mono uppercase font-bold">
              Development Phase {activePhase.id} of 20
            </span>
            <h2 className="font-display font-bold text-xl text-slate-800 dark:text-slate-100 tracking-tight mt-2">
              {activePhase.title}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed mt-2 p-3 glass-card rounded-lg border border-slate-200/40 dark:border-white/5">
              <strong className="text-slate-800 dark:text-slate-200">Objective: </strong> 
              {activePhase.objective}
            </p>
          </div>
          <button
            onClick={() => toggleTask(`p-${activePhase.id}-setup`)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
              completedTasks[`p-${activePhase.id}-setup`]
                ? "bg-emerald-50/50 dark:bg-emerald-950/45 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60"
                : "glass-card text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-white/10 hover:bg-slate-200"
            }`}
          >
            {completedTasks[`p-${activePhase.id}-setup`] ? (
              <>
                <Check className="w-3.5 h-3.5" /> Checked Base Init
              </>
            ) : (
              "Mark Phase Started"
            )}
          </button>
        </div>

        {/* Phase Features & Interactive Task Checklist */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Progress Checklist
            </h4>
            <div className="space-y-2">
              {activePhase.features.map((feature, idx) => {
                const key = `p-${activePhase.id}-feat-${idx}`;
                const isDone = completedTasks[key];
                return (
                  <label
                    key={idx}
                    className={`flex items-start gap-2.5 p-2 rounded-lg border text-xs cursor-pointer select-none transition ${
                      isDone
                        ? "bg-emerald-50/40 dark:bg-emerald-950/15 border-emerald-100/60 dark:border-emerald-900/40 text-slate-700 dark:text-slate-305"
                        : "bg-transparent border-slate-200/30 dark:border-white/5 hover:bg-white/10 text-slate-600"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={!!isDone}
                      onChange={() => toggleTask(key)}
                      className="mt-0.5 rounded border-slate-300 dark:border-slate-700 text-emerald-500 focus:ring-emerald-500 animate-none"
                    />
                    <span>{feature}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <Database className="w-4 h-4 text-emerald-500" />
              Laravel Schematics
            </h4>
            <div className="space-y-3 glass-card border border-slate-200/40 dark:border-white/5 rounded-xl p-4 text-xs">
              <div>
                <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Database Tables Affected:</span>
                <div className="flex flex-wrap gap-1.5">
                  {activePhase.databaseTables.map((tbl, i) => (
                    <span key={i} className="bg-slate-200/50 dark:bg-[#060b13] px-2 py-0.5 rounded text-mono font-mono text-[10px] text-slate-600 dark:text-slate-400 border border-slate-300/30 dark:border-white/5">
                      {tbl}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Laravel Migrations:</span>
                <ul className="list-disc pl-4 space-y-0.5 font-mono text-[10px] text-slate-505">
                  {activePhase.migrations.map((m, i) => <li key={i}>{m}</li>)}
                </ul>
              </div>

              <div>
                <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Key Models:</span>
                <div className="flex flex-wrap gap-1.5 font-mono text-[10px] text-slate-600 dark:text-slate-400">
                  {activePhase.models.map((mod, i) => (
                    <span key={i} className="bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100/60 dark:border-emerald-900/30 px-2 py-0.5 rounded">{mod}</span>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-0.5">Assigned Endpoints / Routes:</span>
                <div className="bg-white/40 dark:bg-[#060b13]/55 p-2 rounded text-[10px] font-mono text-slate-505 border border-slate-200/40 dark:border-white/5">
                  {activePhase.routes.map((rt, i) => <div key={i}>{rt}</div>)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modular Controller Structure & Validation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="glass-card rounded-xl p-4 border border-slate-200/40 dark:border-white/5 text-xs">
            <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-emerald-500" />
              Validation & Form Constraints
            </h4>
            <div className="space-y-1.5">
              {Object.entries(activePhase.validationRules).map(([field, rule]) => (
                <div key={field} className="flex justify-between border-b border-dashed border-slate-200 dark:border-slate-800 pb-1 last:border-none">
                  <span className="font-mono text-slate-600 dark:text-slate-400 font-medium">{field}</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 text-right">{rule}</span>
                </div>
              ))}
              {Object.keys(activePhase.validationRules).length === 0 && (
                <div className="text-slate-400 italic">No custom inputs mapped. Common security filters apply.</div>
              )}
            </div>
          </div>

          <div className="glass-card rounded-xl p-4 border border-slate-200/40 dark:border-white/5 text-xs">
            <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              Security Considerations
            </h4>
            <ul className="space-y-1 text-slate-600 dark:text-slate-400">
              {activePhase.securityConsiderations.map((sc, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 shrink-0" />
                  <span>{sc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Phase Code Blocks Center */}
        <div className="flex-1 flex flex-col min-h-[300px]">
          <div className="bg-black/35 dark:bg-black/45 border border-slate-200/30 dark:border-white/5 rounded-xl overflow-hidden flex-1 flex flex-col">
            <div className="bg-slate-900/60 border-b border-slate-800/40 backdrop-blur-md px-4 py-2.5 flex justify-between items-center text-xs">
              <span className="text-slate-400 font-mono flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5 text-emerald-400" />
                {activePhase.codeSnippet.title}
              </span>
              <button
                onClick={() => copyCode(activePhase.codeSnippet.code)}
                className="bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 px-3 py-1 rounded transition flex items-center gap-1 text-[11px] border border-white/5"
              >
                {copiedText ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" /> Copy Code
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 overflow-x-auto font-mono text-[11.5px] text-slate-200 leading-relaxed max-h-[350px] overflow-y-auto flex-1 bg-black/10">
              <code>{activePhase.codeSnippet.code}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
