'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calendar, Heart, AlertCircle, TrendingUp } from 'lucide-react';
import { CycleData, Symptom } from '@/lib/types';
import { calculateCycleInfo, formatDate, formatDateShort } from '@/lib/calculations';
import { format } from 'date-fns';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function CycleTracker() {
  const [cycleData, setCycleData] = useState<CycleData>({
    lastPeriodDate: new Date(),
    cycleLength: 28,
    periodLength: 5,
  });

  const [showSetup, setShowSetup] = useState(true);
  const [todaySymptoms, setTodaySymptoms] = useState<Partial<Symptom>>({
    mood: [],
    cramps: 0,
    flow: 'none',
    breastPain: 0,
    libido: 0,
  });

  const cycleInfo = calculateCycleInfo(cycleData);

  const handleSetupComplete = () => {
    setShowSetup(false);
  };

  const getPhaseInfo = () => {
    switch (cycleInfo.currentPhase) {
      case 'menstruation':
        return {
          title: 'Menstruação',
          color: 'bg-red-100 text-red-700 border-red-200',
          icon: '🩸',
          description: 'Período menstrual em andamento',
        };
      case 'follicular':
        return {
          title: 'Fase Folicular',
          color: 'bg-blue-100 text-blue-700 border-blue-200',
          icon: '🌱',
          description: 'Corpo se preparando para ovulação',
        };
      case 'ovulation':
        return {
          title: 'Ovulação',
          color: 'bg-green-100 text-green-700 border-green-200',
          icon: '🌸',
          description: 'Período fértil - maior chance de gravidez',
        };
      case 'luteal':
        return {
          title: 'Fase Lútea',
          color: 'bg-purple-100 text-purple-700 border-purple-200',
          icon: '🌙',
          description: 'Corpo se preparando para próxima menstruação',
        };
      case 'late':
        return {
          title: 'Atraso Menstrual',
          color: 'bg-orange-100 text-orange-700 border-orange-200',
          icon: '⚠️',
          description: 'Menstruação atrasada',
        };
    }
  };

  const phaseInfo = getPhaseInfo();

  if (showSetup) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-pink-100">
        <CardHeader>
          <CardTitle className="text-pink-600 flex items-center gap-2">
            <Calendar className="w-6 h-6" />
            Configure seu Ciclo
          </CardTitle>
          <CardDescription>
            Vamos começar! Informe os dados do seu último período menstrual
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="lastPeriod">Data do primeiro dia da última menstruação</Label>
            <Input
              id="lastPeriod"
              type="date"
              value={format(cycleData.lastPeriodDate, 'yyyy-MM-dd')}
              onChange={(e) =>
                setCycleData({ ...cycleData, lastPeriodDate: new Date(e.target.value) })
              }
              className="border-pink-200 focus:border-pink-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cycleLength">Duração do ciclo (dias)</Label>
            <div className="flex items-center gap-4">
              <Slider
                id="cycleLength"
                min={21}
                max={35}
                step={1}
                value={[cycleData.cycleLength]}
                onValueChange={(value) =>
                  setCycleData({ ...cycleData, cycleLength: value[0] })
                }
                className="flex-1"
              />
              <span className="text-2xl font-bold text-pink-600 w-12 text-center">
                {cycleData.cycleLength}
              </span>
            </div>
            <p className="text-xs text-gray-500">Média: 28 dias</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="periodLength">Duração da menstruação (dias)</Label>
            <div className="flex items-center gap-4">
              <Slider
                id="periodLength"
                min={3}
                max={7}
                step={1}
                value={[cycleData.periodLength]}
                onValueChange={(value) =>
                  setCycleData({ ...cycleData, periodLength: value[0] })
                }
                className="flex-1"
              />
              <span className="text-2xl font-bold text-pink-600 w-12 text-center">
                {cycleData.periodLength}
              </span>
            </div>
            <p className="text-xs text-gray-500">Média: 5 dias</p>
          </div>

          <Button
            onClick={handleSetupComplete}
            className="w-full bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500"
          >
            Começar Acompanhamento
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Current Phase Card */}
      <Card className={`border-2 ${phaseInfo.color} bg-white/90 backdrop-blur-sm`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{phaseInfo.icon}</span>
              <div>
                <CardTitle className="text-2xl">{phaseInfo.title}</CardTitle>
                <CardDescription className="text-base mt-1">
                  {phaseInfo.description}
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Próxima menstruação</p>
              <p className="text-lg font-bold text-pink-600">
                {cycleInfo.daysUntilPeriod > 0
                  ? `${cycleInfo.daysUntilPeriod} dias`
                  : 'Hoje ou atrasada'}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {formatDate(cycleInfo.nextPeriodDate)}
              </p>
            </div>

            <div className="text-center p-4 bg-white/50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Ovulação</p>
              <p className="text-lg font-bold text-green-600">
                {formatDateShort(cycleInfo.ovulationDate)}
              </p>
              {cycleInfo.isFertileWindow && (
                <Badge className="mt-2 bg-green-500">Período fértil</Badge>
              )}
            </div>

            <div className="text-center p-4 bg-white/50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Janela fértil</p>
              <p className="text-sm font-semibold text-gray-700">
                {formatDateShort(cycleInfo.fertileWindowStart)} até{' '}
                {formatDateShort(cycleInfo.fertileWindowEnd)}
              </p>
            </div>

            <div className="text-center p-4 bg-white/50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Duração do ciclo</p>
              <p className="text-lg font-bold text-purple-600">{cycleData.cycleLength} dias</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Late Period Alert */}
      {cycleInfo.isLate && (
        <Card className="border-2 border-orange-300 bg-orange-50/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-orange-700 flex items-center gap-2">
              <AlertCircle className="w-6 h-6" />
              Atraso Menstrual Detectado
            </CardTitle>
            <CardDescription className="text-orange-600">
              Sua menstruação está {cycleInfo.daysLate} dias atrasada
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white/70 p-4 rounded-lg space-y-3">
              <h4 className="font-semibold text-orange-800">📋 O que fazer agora:</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>
                    <strong>Teste de farmácia:</strong> Faça um teste de gravidez de farmácia pela
                    manhã (primeira urina do dia)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>
                    <strong>Se positivo:</strong> Agende consulta com ginecologista/obstetra para
                    confirmar e iniciar pré-natal
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>
                    <strong>Se negativo:</strong> Aguarde mais alguns dias e repita o teste. Se
                    continuar atrasada, consulte seu médico
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white/70 p-4 rounded-lg space-y-2">
              <h4 className="font-semibold text-orange-800">👀 Sinais para observar:</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Náuseas ou enjoos matinais</li>
                <li>• Sensibilidade nos seios</li>
                <li>• Cansaço excessivo</li>
                <li>• Alterações no olfato ou paladar</li>
                <li>• Pequeno sangramento de implantação</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Daily Symptoms Tracker */}
      <Card className="bg-white/80 backdrop-blur-sm border-pink-100">
        <CardHeader>
          <CardTitle className="text-pink-600">Registrar Sintomas de Hoje</CardTitle>
          <CardDescription>
            Acompanhe como você está se sentindo para entender melhor seu ciclo
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Intensidade das cólicas</Label>
            <div className="flex items-center gap-4">
              <Slider
                min={0}
                max={5}
                step={1}
                value={[todaySymptoms.cramps || 0]}
                onValueChange={(value) =>
                  setTodaySymptoms({ ...todaySymptoms, cramps: value[0] })
                }
                className="flex-1"
              />
              <span className="text-xl font-bold text-pink-600 w-12 text-center">
                {todaySymptoms.cramps}/5
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Intensidade do fluxo</Label>
            <Select
              value={todaySymptoms.flow}
              onValueChange={(value: any) => setTodaySymptoms({ ...todaySymptoms, flow: value })}
            >
              <SelectTrigger className="border-pink-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Sem fluxo</SelectItem>
                <SelectItem value="light">Leve</SelectItem>
                <SelectItem value="medium">Moderado</SelectItem>
                <SelectItem value="heavy">Intenso</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Dor nos seios</Label>
            <div className="flex items-center gap-4">
              <Slider
                min={0}
                max={5}
                step={1}
                value={[todaySymptoms.breastPain || 0]}
                onValueChange={(value) =>
                  setTodaySymptoms({ ...todaySymptoms, breastPain: value[0] })
                }
                className="flex-1"
              />
              <span className="text-xl font-bold text-pink-600 w-12 text-center">
                {todaySymptoms.breastPain}/5
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Libido</Label>
            <div className="flex items-center gap-4">
              <Slider
                min={0}
                max={5}
                step={1}
                value={[todaySymptoms.libido || 0]}
                onValueChange={(value) =>
                  setTodaySymptoms({ ...todaySymptoms, libido: value[0] })
                }
                className="flex-1"
              />
              <span className="text-xl font-bold text-pink-600 w-12 text-center">
                {todaySymptoms.libido}/5
              </span>
            </div>
          </div>

          <Button className="w-full bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500">
            Salvar Sintomas do Dia
          </Button>
        </CardContent>
      </Card>

      {/* Edit Cycle Button */}
      <Button
        variant="outline"
        onClick={() => setShowSetup(true)}
        className="w-full border-pink-200 text-pink-600 hover:bg-pink-50"
      >
        Editar Dados do Ciclo
      </Button>
    </div>
  );
}
