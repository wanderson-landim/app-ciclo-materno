'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Droplets, Plus, Minus } from 'lucide-react';
import { AppMode } from '@/lib/types';
import { calculateWaterIntake } from '@/lib/calculations';

interface HydrationTrackerProps {
  mode: AppMode;
}

export default function HydrationTracker({ mode }: HydrationTrackerProps) {
  const [waterIntake, setWaterIntake] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(2000);

  useEffect(() => {
    const goal =
      mode === 'pregnancy'
        ? calculateWaterIntake('pregnancy')
        : mode === 'postpartum'
        ? calculateWaterIntake('breastfeeding')
        : calculateWaterIntake('normal');
    setDailyGoal(goal);
  }, [mode]);

  const addWater = (amount: number) => {
    setWaterIntake((prev) => Math.min(prev + amount, dailyGoal + 1000));
  };

  const removeWater = (amount: number) => {
    setWaterIntake((prev) => Math.max(prev - amount, 0));
  };

  const percentage = Math.min((waterIntake / dailyGoal) * 100, 100);
  const cupsCount = Math.floor(waterIntake / 250);

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-pink-100">
      <CardHeader>
        <CardTitle className="text-pink-600 flex items-center gap-2">
          <Droplets className="w-6 h-6" />
          Controle de Hidratação
        </CardTitle>
        <CardDescription>
          {mode === 'pregnancy' && 'Meta diária para gestantes: 2,5L'}
          {mode === 'postpartum' && 'Meta diária para lactantes: 3L'}
          {mode === 'cycle' && 'Meta diária recomendada: 2L'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Visual Water Display */}
        <div className="flex justify-center">
          <div className="relative w-32 h-48 bg-gradient-to-b from-blue-100 to-blue-50 rounded-full border-4 border-blue-300 overflow-hidden">
            <div
              className="absolute bottom-0 w-full bg-gradient-to-t from-blue-400 to-blue-300 transition-all duration-500"
              style={{ height: `${percentage}%` }}
            >
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-16 bg-white rounded-full animate-pulse"></div>
                <div className="absolute top-8 left-1/4 w-8 h-8 bg-white rounded-full animate-pulse delay-100"></div>
                <div className="absolute top-12 right-1/4 w-6 h-6 bg-white rounded-full animate-pulse delay-200"></div>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Droplets className="w-12 h-12 text-blue-600 opacity-20" />
            </div>
          </div>
        </div>

        {/* Progress Info */}
        <div className="text-center space-y-2">
          <div className="text-4xl font-bold text-blue-600">
            {waterIntake}ml <span className="text-xl text-gray-500">/ {dailyGoal}ml</span>
          </div>
          <div className="text-sm text-gray-600">
            {cupsCount} {cupsCount === 1 ? 'copo' : 'copos'} de 250ml
          </div>
          <Progress value={percentage} className="h-3" />
          <p className="text-sm font-semibold text-blue-600">{Math.round(percentage)}% da meta</p>
        </div>

        {/* Quick Add Buttons */}
        <div className="grid grid-cols-3 gap-3">
          <Button
            onClick={() => addWater(250)}
            className="bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-blue-500 hover:to-cyan-500"
          >
            <Plus className="w-4 h-4 mr-2" />
            250ml
          </Button>
          <Button
            onClick={() => addWater(500)}
            className="bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-blue-500 hover:to-cyan-500"
          >
            <Plus className="w-4 h-4 mr-2" />
            500ml
          </Button>
          <Button
            onClick={() => addWater(1000)}
            className="bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-blue-500 hover:to-cyan-500"
          >
            <Plus className="w-4 h-4 mr-2" />
            1L
          </Button>
        </div>

        {/* Remove Button */}
        <Button
          variant="outline"
          onClick={() => removeWater(250)}
          className="w-full border-blue-200 text-blue-600 hover:bg-blue-50"
        >
          <Minus className="w-4 h-4 mr-2" />
          Remover 250ml
        </Button>

        {/* Motivational Messages */}
        {percentage >= 100 && (
          <div className="bg-green-50 p-4 rounded-lg text-center border border-green-200">
            <p className="text-green-800 font-semibold">🎉 Parabéns! Meta diária alcançada!</p>
            <p className="text-sm text-green-700 mt-1">
              Você está cuidando muito bem da sua hidratação!
            </p>
          </div>
        )}

        {percentage >= 50 && percentage < 100 && (
          <div className="bg-blue-50 p-4 rounded-lg text-center border border-blue-200">
            <p className="text-blue-800 font-semibold">💪 Você está no caminho certo!</p>
            <p className="text-sm text-blue-700 mt-1">
              Faltam apenas {dailyGoal - waterIntake}ml para sua meta
            </p>
          </div>
        )}

        {percentage < 50 && waterIntake > 0 && (
          <div className="bg-amber-50 p-4 rounded-lg text-center border border-amber-200">
            <p className="text-amber-800 font-semibold">💧 Continue bebendo água!</p>
            <p className="text-sm text-amber-700 mt-1">
              Lembre-se: hidratação é essencial para sua saúde
            </p>
          </div>
        )}

        {/* Benefits Info */}
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-4 rounded-lg space-y-2">
          <h4 className="font-semibold text-blue-800">💙 Benefícios da hidratação:</h4>
          <ul className="space-y-1 text-sm text-gray-700">
            {mode === 'pregnancy' && (
              <>
                <li>• Formação do líquido amniótico</li>
                <li>• Previne constipação e infecções urinárias</li>
                <li>• Reduz inchaço e melhora circulação</li>
              </>
            )}
            {mode === 'postpartum' && (
              <>
                <li>• Aumenta produção de leite materno</li>
                <li>• Acelera recuperação pós-parto</li>
                <li>• Previne desidratação durante amamentação</li>
              </>
            )}
            {mode === 'cycle' && (
              <>
                <li>• Reduz retenção de líquidos e inchaço</li>
                <li>• Alivia cólicas menstruais</li>
                <li>• Melhora disposição e concentração</li>
              </>
            )}
          </ul>
        </div>

        {/* Reset Button */}
        <Button
          variant="ghost"
          onClick={() => setWaterIntake(0)}
          className="w-full text-gray-500 hover:text-gray-700"
        >
          Resetar contador
        </Button>
      </CardContent>
    </Card>
  );
}
