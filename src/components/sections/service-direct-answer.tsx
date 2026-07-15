import React from "react";
import { HelpCircle, User, ShieldAlert, Award, Clock, DollarSign, ShieldCheck, Zap } from "lucide-react";

interface DirectAnswerProps {
  problemSolved: string;
  whoIsItFor: string;
  whyCare: string;
  whatIGain: string;
  timeSaved: string;
  moneySaved: string;
  risksRemoved: string;
  whyContactNow: string;
}

export function ServiceDirectAnswer({
  problemSolved,
  whoIsItFor,
  whyCare,
  whatIGain,
  timeSaved,
  moneySaved,
  risksRemoved,
  whyContactNow
}: DirectAnswerProps) {
  return (
    <section className="mb-20 glass rounded-[2.5rem] p-8 md:p-12 border border-slate-200/60 shadow-xl bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-bold uppercase tracking-wider mb-8">
          <Zap className="w-3.5 h-3.5 text-amber-400" /> Răspunsuri Directe & Beneficii
        </div>
        
        <h3 className="text-2xl md:text-3xl font-bold font-heading text-slate-900 mb-8 tracking-tight">
          De ce ai nevoie de acest serviciu? Pe scurt.
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 1. Problem Solved */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center mb-4">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-800 text-sm mb-2">Ce problemă rezolvă?</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{problemSolved}</p>
            </div>
          </div>

          {/* 2. Who is it for */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                <User className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-800 text-sm mb-2">Pentru cine este?</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{whoIsItFor}</p>
            </div>
          </div>

          {/* 3. Why Care */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-4">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-800 text-sm mb-2">De ce ar trebui să-ți pese?</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{whyCare}</p>
            </div>
          </div>

          {/* 4. What you gain */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-800 text-sm mb-2">Ce câștigi direct?</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{whatIGain}</p>
            </div>
          </div>

          {/* 5. Time saved */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-800 text-sm mb-2">Cât timp economisești?</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{timeSaved}</p>
            </div>
          </div>

          {/* 6. Money saved */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-4">
                <DollarSign className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-800 text-sm mb-2">Câți bani salvezi?</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{moneySaved}</p>
            </div>
          </div>

          {/* 7. Risks disappeared */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-800 text-sm mb-2">Ce riscuri dispar complet?</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{risksRemoved}</p>
            </div>
          </div>

          {/* 8. Contact now */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between text-white">
            <div>
              <div className="w-10 h-10 bg-amber-500/20 text-amber-400 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-100 text-sm mb-2">De ce acum?</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{whyContactNow}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
