'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Baby, Moon, Utensils, AlertCircle, BookOpen } from 'lucide-react';
import { BabyData } from '@/lib/types';
import { differenceInDays, format } from 'date-fns';

export default function PostpartumTracker() {
  const [babyData, setBabyData] = useState<BabyData>({
    birthDate: new Date(),
    name: '',
  });

  const [showSetup, setShowSetup] = useState(true);

  const babyAgeInDays = differenceInDays(new Date(), babyData.birthDate);
  const babyAgeInWeeks = Math.floor(babyAgeInDays / 7);
  const babyAgeInMonths = Math.floor(babyAgeInDays / 30);

  if (showSetup) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-pink-100">
        <CardHeader>
          <CardTitle className="text-pink-600 flex items-center gap-2">
            <Baby className="w-6 h-6" />
            Bem-vinda ao Pós-Parto!
          </CardTitle>
          <CardDescription>
            Vamos acompanhar sua recuperação e o desenvolvimento do seu bebê
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="babyName">Nome do bebê (opcional)</Label>
            <Input
              id="babyName"
              type="text"
              placeholder="Digite o nome do bebê"
              value={babyData.name}
              onChange={(e) => setBabyData({ ...babyData, name: e.target.value })}
              className="border-pink-200 focus:border-pink-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="birthDate">Data de nascimento</Label>
            <Input
              id="birthDate"
              type="date"
              value={format(babyData.birthDate, 'yyyy-MM-dd')}
              onChange={(e) =>
                setBabyData({ ...babyData, birthDate: new Date(e.target.value) })
              }
              className="border-pink-200 focus:border-pink-400"
            />
          </div>

          <div className="bg-purple-50 p-4 rounded-lg space-y-3">
            <h4 className="font-semibold text-purple-800 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Primeiros Cuidados Pós-Parto
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-1">✓</span>
                <span>
                  <strong>Descanso:</strong> Durma quando o bebê dormir, não se preocupe com tarefas
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-1">✓</span>
                <span>
                  <strong>Amamentação:</strong> Ofereça o peito em livre demanda (sempre que bebê
                  quiser)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-1">✓</span>
                <span>
                  <strong>Hidratação:</strong> Beba muita água (3L/dia) para produção de leite
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-1">✓</span>
                <span>
                  <strong>Cuidados com cicatriz:</strong> Mantenha limpa e seca, observe sinais de
                  infecção
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
      {/* Baby Age Card */}
      <Card className="border-2 border-pink-200 bg-gradient-to-br from-pink-50 to-purple-50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-3xl text-pink-600">
                {babyData.name || 'Seu bebê'}
              </CardTitle>
              <CardDescription className="text-lg mt-1">
                {babyAgeInMonths > 0
                  ? `${babyAgeInMonths} ${babyAgeInMonths === 1 ? 'mês' : 'meses'}`
                  : `${babyAgeInWeeks} ${babyAgeInWeeks === 1 ? 'semana' : 'semanas'}`}
              </CardDescription>
            </div>
            <div className="text-6xl">👶</div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/70 p-3 rounded-lg text-center">
              <p className="text-sm text-gray-600">Dias de vida</p>
              <p className="text-2xl font-bold text-pink-600">{babyAgeInDays}</p>
            </div>
            <div className="bg-white/70 p-3 rounded-lg text-center">
              <p className="text-sm text-gray-600">Semanas</p>
              <p className="text-2xl font-bold text-purple-600">{babyAgeInWeeks}</p>
            </div>
            <div className="bg-white/70 p-3 rounded-lg text-center">
              <p className="text-sm text-gray-600">Meses</p>
              <p className="text-2xl font-bold text-blue-600">{babyAgeInMonths}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Card className="bg-white/80 backdrop-blur-sm border-pink-100">
        <CardHeader>
          <CardTitle className="text-pink-600">Acompanhamento Completo</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="mom" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="mom">Mamãe</TabsTrigger>
              <TabsTrigger value="baby">Bebê</TabsTrigger>
              <TabsTrigger value="feeding">Alimentação</TabsTrigger>
            </TabsList>

            <TabsContent value="mom" className="space-y-4 mt-4">
              <div className="space-y-4">
                <div className="bg-pink-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-pink-800 mb-3 flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    Rotina Ideal para a Mãe
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">💤</span>
                      <span>
                        <strong>Sono:</strong> Durma 7-8 horas (divididas). Cochile quando bebê
                        dormir durante o dia
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">🤱</span>
                      <span>
                        <strong>Amamentação:</strong> Livre demanda. Posição correta evita dor e
                        rachaduras
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">💧</span>
                      <span>
                        <strong>Hidratação:</strong> 3L de água por dia para boa produção de leite
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">🍽️</span>
                      <span>
                        <strong>Alimentação:</strong> Dieta balanceada, rica em proteínas, ferro e
                        cálcio
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-3">Cuidados Pós-Parto</h4>
                  <div className="space-y-3">
                    <div>
                      <h5 className="font-semibold text-sm text-blue-700 mb-1">
                        Parto Normal (Episiotomia)
                      </h5>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>• Lave com água morna após ir ao banheiro</li>
                        <li>• Seque com leve toque (não esfregue)</li>
                        <li>• Recuperação: 2-4 semanas</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-sm text-blue-700 mb-1">Cesárea</h5>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>• Mantenha cicatriz limpa e seca</li>
                        <li>• Evite esforço físico por 40 dias</li>
                        <li>• Recuperação completa: 6-8 semanas</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Saúde Emocional
                  </h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>
                      <strong>Baby Blues (primeiros 15 dias):</strong> Choro fácil, ansiedade,
                      oscilações de humor. É normal e passa.
                    </p>
                    <p className="text-orange-700 font-semibold">
                      ⚠️ Se sintomas persistirem por mais de 2 semanas, procure ajuda médica. Pode
                      ser depressão pós-parto.
                    </p>
                    <p className="mt-3">
                      <strong>Sinais de alerta:</strong>
                    </p>
                    <ul className="space-y-1">
                      <li>• Tristeza profunda que não passa</li>
                      <li>• Dificuldade de criar vínculo com bebê</li>
                      <li>• Pensamentos negativos persistentes</li>
                      <li>• Falta de interesse em atividades</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="baby" className="space-y-4 mt-4">
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                    <Moon className="w-5 h-5" />
                    Rotina de Sono por Idade
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-white/70 p-3 rounded-lg">
                      <h5 className="font-semibold text-sm text-blue-700 mb-2">0-3 meses</h5>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>• Total: 14-17 horas por dia</li>
                        <li>• Sonecas: 4-5 por dia (curtas e frequentes)</li>
                        <li>• Noite: acorda a cada 2-3 horas para mamar</li>
                      </ul>
                    </div>
                    <div className="bg-white/70 p-3 rounded-lg">
                      <h5 className="font-semibold text-sm text-blue-700 mb-2">4-6 meses</h5>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>• Total: 12-15 horas por dia</li>
                        <li>• Sonecas: 3 por dia (manhã, tarde, fim de tarde)</li>
                        <li>• Noite: pode dormir 6-8 horas seguidas</li>
                      </ul>
                    </div>
                    <div className="bg-white/70 p-3 rounded-lg">
                      <h5 className="font-semibold text-sm text-blue-700 mb-2">7-12 meses</h5>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>• Total: 12-14 horas por dia</li>
                        <li>• Sonecas: 2 por dia (manhã e tarde)</li>
                        <li>• Noite: 10-12 horas (pode dormir a noite toda)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-3">Volume de Leite por Idade</h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex justify-between p-2 bg-white/70 rounded">
                      <span>0-1 mês:</span>
                      <span className="font-semibold">60-90ml por mamada</span>
                    </div>
                    <div className="flex justify-between p-2 bg-white/70 rounded">
                      <span>1-2 meses:</span>
                      <span className="font-semibold">90-120ml por mamada</span>
                    </div>
                    <div className="flex justify-between p-2 bg-white/70 rounded">
                      <span>2-4 meses:</span>
                      <span className="font-semibold">120-150ml por mamada</span>
                    </div>
                    <div className="flex justify-between p-2 bg-white/70 rounded">
                      <span>4-6 meses:</span>
                      <span className="font-semibold">150-180ml por mamada</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      * Valores para fórmula. Amamentação é em livre demanda.
                    </p>
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-3">Marcos do Desenvolvimento</h4>
                  <div className="space-y-3">
                    <div>
                      <h5 className="font-semibold text-sm text-purple-700 mb-1">1 mês</h5>
                      <p className="text-sm text-gray-700">
                        Levanta cabeça brevemente, foca em rostos, reage a sons
                      </p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-sm text-purple-700 mb-1">2 meses</h5>
                      <p className="text-sm text-gray-700">
                        Sorri socialmente, segue objetos com olhar, emite sons
                      </p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-sm text-purple-700 mb-1">3 meses</h5>
                      <p className="text-sm text-gray-700">
                        Sustenta cabeça, abre e fecha mãos, reconhece rostos familiares
                      </p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-sm text-purple-700 mb-1">4-6 meses</h5>
                      <p className="text-sm text-gray-700">
                        Rola, senta com apoio, pega objetos, balbucia
                      </p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-sm text-purple-700 mb-1">7-9 meses</h5>
                      <p className="text-sm text-gray-700">
                        Senta sem apoio, engatinha, transfere objetos entre mãos
                      </p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-sm text-purple-700 mb-1">10-12 meses</h5>
                      <p className="text-sm text-gray-700">
                        Fica em pé com apoio, primeiros passos, fala "mamã" e "papá"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="feeding" className="space-y-4 mt-4">
              <div className="space-y-4">
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-3 flex items-center gap-2">
                    <Utensils className="w-5 h-5" />
                    Introdução Alimentar (4-12 meses)
                  </h4>
                  <p className="text-sm text-gray-700 mb-3">
                    Inicie entre 4-6 meses, quando bebê sustenta cabeça e mostra interesse pela
                    comida.
                  </p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-3">Alimentos por Mês</h4>
                  <div className="space-y-3">
                    <div className="bg-white/70 p-3 rounded-lg">
                      <h5 className="font-semibold text-sm text-green-700 mb-2">4-6 meses</h5>
                      <p className="text-sm text-gray-700">
                        <strong>Início:</strong> Papas de frutas amassadas (banana, mamão, pera,
                        maçã cozida)
                      </p>
                      <p className="text-sm text-gray-700 mt-1">
                        <strong>Consistência:</strong> Bem amassado, quase purê
                      </p>
                    </div>
                    <div className="bg-white/70 p-3 rounded-lg">
                      <h5 className="font-semibold text-sm text-green-700 mb-2">6-7 meses</h5>
                      <p className="text-sm text-gray-700">
                        <strong>Adicionar:</strong> Legumes cozidos (batata, cenoura, abóbora),
                        carnes bem cozidas
                      </p>
                      <p className="text-sm text-gray-700 mt-1">
                        <strong>Consistência:</strong> Amassado com garfo
                      </p>
                    </div>
                    <div className="bg-white/70 p-3 rounded-lg">
                      <h5 className="font-semibold text-sm text-green-700 mb-2">8-9 meses</h5>
                      <p className="text-sm text-gray-700">
                        <strong>Adicionar:</strong> Grãos (arroz, feijão), massas, ovos
                      </p>
                      <p className="text-sm text-gray-700 mt-1">
                        <strong>Consistência:</strong> Pedaços pequenos e macios
                      </p>
                    </div>
                    <div className="bg-white/70 p-3 rounded-lg">
                      <h5 className="font-semibold text-sm text-green-700 mb-2">10-12 meses</h5>
                      <p className="text-sm text-gray-700">
                        <strong>Transição:</strong> Comida da família (sem sal/açúcar/temperos
                        fortes)
                      </p>
                      <p className="text-sm text-gray-700 mt-1">
                        <strong>Consistência:</strong> Pedaços maiores, estimula mastigação
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Proibido Antes de 1 Ano
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">❌</span>
                      <span>
                        <strong>Mel:</strong> Risco de botulismo infantil
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">❌</span>
                      <span>
                        <strong>Sal:</strong> Sobrecarrega rins imaturos
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">❌</span>
                      <span>
                        <strong>Açúcar:</strong> Prejudica paladar e saúde bucal
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">❌</span>
                      <span>
                        <strong>Leite de vaca:</strong> Pode causar alergias e anemia
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">❌</span>
                      <span>
                        <strong>Alimentos duros/redondos:</strong> Risco de engasgo (uva inteira,
                        pipoca, amendoim)
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-amber-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-amber-800 mb-3">
                    Engasgo x Gag Reflex (Reflexo de Vômito)
                  </h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="bg-white/70 p-3 rounded-lg">
                      <h5 className="font-semibold text-amber-700 mb-1">
                        ✅ Gag Reflex (Normal)
                      </h5>
                      <ul className="space-y-1">
                        <li>• Bebê tosse, faz ânsia, mas continua respirando</li>
                        <li>• Rosto fica vermelho, mas não roxo</li>
                        <li>• Bebê expele o alimento sozinho</li>
                        <li>• É um mecanismo de proteção natural</li>
                      </ul>
                    </div>
                    <div className="bg-white/70 p-3 rounded-lg border border-red-300">
                      <h5 className="font-semibold text-red-700 mb-1">⚠️ Engasgo (Emergência)</h5>
                      <ul className="space-y-1">
                        <li>• Bebê não consegue tossir ou chorar</li>
                        <li>• Rosto fica roxo/azulado</li>
                        <li>• Não emite sons</li>
                        <li>• Precisa de intervenção imediata (Manobra de Heimlich)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Button
        variant="outline"
        onClick={() => setShowSetup(true)}
        className="w-full border-pink-200 text-pink-600 hover:bg-pink-50"
      >
        Editar Dados do Bebê
      </Button>
    </div>
  );
}
