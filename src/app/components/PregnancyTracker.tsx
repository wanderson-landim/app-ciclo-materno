'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Baby, Heart, Calendar, AlertCircle, Apple, Pill, Activity } from 'lucide-react';
import { PregnancyData } from '@/lib/types';
import { calculatePregnancyWeek, getBabySize, formatDate } from '@/lib/calculations';
import { addDays, differenceInDays, format } from 'date-fns';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function PregnancyTracker() {
  const [pregnancyData, setPregnancyData] = useState<PregnancyData>({
    dueDate: addDays(new Date(), 200),
    currentWeek: 0,
  });

  const [showSetup, setShowSetup] = useState(true);

  const currentWeek = calculatePregnancyWeek(pregnancyData.dueDate);
  const babySize = getBabySize(currentWeek);
  const daysUntilDue = differenceInDays(pregnancyData.dueDate, new Date());
  const progressPercentage = ((40 - currentWeek) / 40) * 100;

  const weeklyInfo = getWeeklyInfo(currentWeek);

  if (showSetup) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-pink-100">
        <CardHeader>
          <CardTitle className="text-pink-600 flex items-center gap-2">
            <Baby className="w-6 h-6" />
            Bem-vinda à Jornada da Maternidade!
          </CardTitle>
          <CardDescription>
            Vamos acompanhar cada momento especial da sua gravidez
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="dueDate">Data prevista do parto (DPP)</Label>
            <Input
              id="dueDate"
              type="date"
              value={format(pregnancyData.dueDate, 'yyyy-MM-dd')}
              onChange={(e) =>
                setPregnancyData({ ...pregnancyData, dueDate: new Date(e.target.value) })
              }
              className="border-pink-200 focus:border-pink-400"
            />
            <p className="text-xs text-gray-500">
              Se não souber, seu médico calculará na primeira consulta
            </p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg space-y-3">
            <h4 className="font-semibold text-purple-800 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Primeiros Passos Importantes
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-1">✓</span>
                <span>
                  <strong>Exame Beta hCG:</strong> Confirma gravidez através do sangue
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-1">✓</span>
                <span>
                  <strong>Primeira consulta:</strong> Agende com obstetra até 8 semanas
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-1">✓</span>
                <span>
                  <strong>Ácido fólico:</strong> Comece a tomar imediatamente (400-800mcg/dia)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-1">✓</span>
                <span>
                  <strong>Ultrassom:</strong> Primeiro entre 6-8 semanas para ver batimentos
                </span>
              </li>
            </ul>
          </div>

          <Button
            onClick={() => setShowSetup(false)}
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
      {/* Main Pregnancy Card */}
      <Card className="border-2 border-pink-200 bg-gradient-to-br from-pink-50 to-purple-50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-3xl text-pink-600">
                {currentWeek} semanas
              </CardTitle>
              <CardDescription className="text-lg mt-1">
                Faltam {daysUntilDue} dias para conhecer seu bebê
              </CardDescription>
            </div>
            <div className="text-6xl">{weeklyInfo.emoji}</div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Progresso da gestação</span>
              <span className="font-semibold text-pink-600">{currentWeek}/40 semanas</span>
            </div>
            <Progress value={(currentWeek / 40) * 100} className="h-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/70 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Baby className="w-5 h-5 text-pink-500" />
                <h4 className="font-semibold text-gray-800">Tamanho do bebê</h4>
              </div>
              <p className="text-2xl font-bold text-pink-600">{babySize.fruit}</p>
              <p className="text-sm text-gray-600 mt-1">Aproximadamente {babySize.size}</p>
            </div>

            <div className="bg-white/70 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-purple-500" />
                <h4 className="font-semibold text-gray-800">Data prevista</h4>
              </div>
              <p className="text-lg font-bold text-purple-600">
                {formatDate(pregnancyData.dueDate)}
              </p>
              <p className="text-sm text-gray-600 mt-1">Trimestre {Math.ceil(currentWeek / 13)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Development Tabs */}
      <Card className="bg-white/80 backdrop-blur-sm border-pink-100">
        <CardHeader>
          <CardTitle className="text-pink-600">Desenvolvimento Semanal</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="baby" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="baby">Bebê</TabsTrigger>
              <TabsTrigger value="mom">Mamãe</TabsTrigger>
              <TabsTrigger value="alerts">Alertas</TabsTrigger>
            </TabsList>

            <TabsContent value="baby" className="space-y-4 mt-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-3">
                  Desenvolvimento do bebê esta semana:
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  {weeklyInfo.babyDevelopment.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="mom" className="space-y-4 mt-4">
              <div className="bg-pink-50 p-4 rounded-lg">
                <h4 className="font-semibold text-pink-800 mb-3">Sintomas comuns:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  {weeklyInfo.momSymptoms.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="alerts" className="space-y-4 mt-4">
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-800 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Quando procurar ajuda médica:
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">⚠️</span>
                    <span>Sangramento vaginal intenso</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">⚠️</span>
                    <span>Dor abdominal forte e persistente</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">⚠️</span>
                    <span>Febre acima de 38°C</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">⚠️</span>
                    <span>Diminuição ou ausência de movimentos fetais (após 20 semanas)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">⚠️</span>
                    <span>Perda de líquido vaginal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">⚠️</span>
                    <span>Inchaço súbito de mãos, rosto ou pés</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">⚠️</span>
                    <span>Dor de cabeça intensa que não passa</span>
                  </li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Nutrition Card */}
      <Card className="bg-white/80 backdrop-blur-sm border-pink-100">
        <CardHeader>
          <CardTitle className="text-pink-600 flex items-center gap-2">
            <Apple className="w-6 h-6" />
            Nutrição na Gravidez
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="recommended" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="recommended">Recomendados</TabsTrigger>
              <TabsTrigger value="avoid">Evitar</TabsTrigger>
            </TabsList>

            <TabsContent value="recommended" className="space-y-4 mt-4">
              <div className="space-y-3">
                <div className="bg-green-50 p-3 rounded-lg">
                  <h5 className="font-semibold text-green-800 mb-2">🥬 Folhas verdes</h5>
                  <p className="text-sm text-gray-700">
                    Ricas em ácido fólico, essencial para formação do tubo neural do bebê
                  </p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <h5 className="font-semibold text-green-800 mb-2">🥚 Ovos</h5>
                  <p className="text-sm text-gray-700">
                    Proteína de alta qualidade e colina para desenvolvimento cerebral
                  </p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <h5 className="font-semibold text-green-800 mb-2">🐟 Peixes (salmão, sardinha)</h5>
                  <p className="text-sm text-gray-700">
                    Ômega-3 para desenvolvimento cerebral e visual do bebê
                  </p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <h5 className="font-semibold text-green-800 mb-2">🥛 Laticínios</h5>
                  <p className="text-sm text-gray-700">
                    Cálcio para formação óssea e proteínas para crescimento
                  </p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <h5 className="font-semibold text-green-800 mb-2">🍊 Frutas cítricas</h5>
                  <p className="text-sm text-gray-700">
                    Vitamina C ajuda na absorção de ferro e fortalece imunidade
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="avoid" className="space-y-4 mt-4">
              <div className="space-y-3">
                <div className="bg-red-50 p-3 rounded-lg">
                  <h5 className="font-semibold text-red-800 mb-2">🍣 Peixes crus e frutos do mar crus</h5>
                  <p className="text-sm text-gray-700">
                    Risco de contaminação por bactérias e parasitas
                  </p>
                </div>
                <div className="bg-red-50 p-3 rounded-lg">
                  <h5 className="font-semibold text-red-800 mb-2">🧀 Queijos não pasteurizados</h5>
                  <p className="text-sm text-gray-700">
                    Risco de listeriose (brie, camembert, queijo fresco)
                  </p>
                </div>
                <div className="bg-red-50 p-3 rounded-lg">
                  <h5 className="font-semibold text-red-800 mb-2">🥩 Carnes mal passadas</h5>
                  <p className="text-sm text-gray-700">
                    Risco de toxoplasmose e outras infecções
                  </p>
                </div>
                <div className="bg-red-50 p-3 rounded-lg">
                  <h5 className="font-semibold text-red-800 mb-2">☕ Cafeína em excesso</h5>
                  <p className="text-sm text-gray-700">
                    Limite de 200mg/dia (1-2 xícaras de café)
                  </p>
                </div>
                <div className="bg-red-50 p-3 rounded-lg">
                  <h5 className="font-semibold text-red-800 mb-2">🍷 Álcool</h5>
                  <p className="text-sm text-gray-700">
                    Nenhuma quantidade é segura durante a gravidez
                  </p>
                </div>
                <div className="bg-red-50 p-3 rounded-lg">
                  <h5 className="font-semibold text-red-800 mb-2">🐟 Peixes com alto teor de mercúrio</h5>
                  <p className="text-sm text-gray-700">
                    Evite tubarão, peixe-espada, cavala (mercúrio prejudica desenvolvimento)
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Vaccines Card */}
      <Card className="bg-white/80 backdrop-blur-sm border-pink-100">
        <CardHeader>
          <CardTitle className="text-pink-600 flex items-center gap-2">
            <Pill className="w-6 h-6" />
            Vacinas Necessárias
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <input type="checkbox" className="mt-1" />
              <div>
                <h5 className="font-semibold text-blue-800">dTpa (Tríplice bacteriana)</h5>
                <p className="text-sm text-gray-700">Entre 20-36 semanas - Protege contra coqueluche</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <input type="checkbox" className="mt-1" />
              <div>
                <h5 className="font-semibold text-blue-800">Influenza (Gripe)</h5>
                <p className="text-sm text-gray-700">Qualquer trimestre - Proteção contra gripe</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <input type="checkbox" className="mt-1" />
              <div>
                <h5 className="font-semibold text-blue-800">Hepatite B</h5>
                <p className="text-sm text-gray-700">Se não vacinada anteriormente</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button
        variant="outline"
        onClick={() => setShowSetup(true)}
        className="w-full border-pink-200 text-pink-600 hover:bg-pink-50"
      >
        Editar Dados da Gravidez
      </Button>
    </div>
  );
}

function getWeeklyInfo(week: number) {
  // Informações simplificadas por trimestre
  if (week <= 13) {
    return {
      emoji: '🌱',
      babyDevelopment: [
        'Órgãos principais começando a se formar',
        'Coração começando a bater (a partir da 6ª semana)',
        'Braços e pernas se desenvolvendo',
        'Características faciais se formando',
      ],
      momSymptoms: [
        'Náuseas e enjoos matinais',
        'Cansaço e sonolência',
        'Sensibilidade nos seios',
        'Vontade frequente de urinar',
        'Alterações de humor',
      ],
    };
  } else if (week <= 27) {
    return {
      emoji: '👶',
      babyDevelopment: [
        'Bebê começa a se mexer (você pode sentir!)',
        'Desenvolvimento dos sentidos (audição, paladar)',
        'Formação de impressões digitais',
        'Bebê começa a sugar o polegar',
        'Pulmões em desenvolvimento',
      ],
      momSymptoms: [
        'Barriga crescendo visivelmente',
        'Movimentos fetais perceptíveis',
        'Possível azia e indigestão',
        'Dores nas costas',
        'Mais energia que no 1º trimestre',
      ],
    };
  } else {
    return {
      emoji: '🤰',
      babyDevelopment: [
        'Bebê ganhando peso rapidamente',
        'Pulmões amadurecendo',
        'Posicionando-se para o parto',
        'Desenvolvendo sistema imunológico',
        'Abrindo e fechando os olhos',
      ],
      momSymptoms: [
        'Contrações de Braxton Hicks (treino)',
        'Falta de ar (bebê pressiona diafragma)',
        'Inchaço nos pés e tornozelos',
        'Dificuldade para dormir',
        'Ansiedade e expectativa para o parto',
      ],
    };
  }
}
