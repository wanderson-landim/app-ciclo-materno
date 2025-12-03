'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AppMode } from '@/lib/types';
import { Heart, Smile, Coffee, AlertCircle, Leaf } from 'lucide-react';

interface TipsSectionProps {
  mode: AppMode;
}

export default function TipsSection({ mode }: TipsSectionProps) {
  if (mode === 'cycle') {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-pink-100">
        <CardHeader>
          <CardTitle className="text-pink-600 flex items-center gap-2">
            <Heart className="w-6 h-6" />
            Dicas para TPM e Menstruação
          </CardTitle>
          <CardDescription>
            Cuide de você durante esse período com carinho e atenção
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="exercises" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="exercises">Exercícios</TabsTrigger>
              <TabsTrigger value="food">Alimentação</TabsTrigger>
              <TabsTrigger value="teas">Chás</TabsTrigger>
              <TabsTrigger value="selfcare">Autocuidado</TabsTrigger>
            </TabsList>

            <TabsContent value="exercises" className="space-y-4 mt-4">
              <div className="space-y-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-3">🧘‍♀️ Yoga e Alongamentos</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500 mt-1">•</span>
                      <span>
                        <strong>Posição da criança:</strong> Ajoelhe-se e estenda os braços para
                        frente, relaxando o abdômen. Alivia cólicas e tensão nas costas.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500 mt-1">•</span>
                      <span>
                        <strong>Gato-vaca:</strong> De quatro, alterne arqueando e curvando as
                        costas. Melhora circulação e alivia dores.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500 mt-1">•</span>
                      <span>
                        <strong>Borboleta:</strong> Sentada, junte as plantas dos pés e deixe os
                        joelhos caírem. Relaxa região pélvica.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-3">🚶‍♀️ Caminhadas Leves</h4>
                  <p className="text-sm text-gray-700">
                    Caminhar 20-30 minutos libera endorfinas (hormônios do bem-estar) e melhora
                    circulação, reduzindo inchaço e cólicas.
                  </p>
                </div>

                <div className="bg-pink-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-pink-800 mb-3">🔥 Compressa Quente</h4>
                  <p className="text-sm text-gray-700">
                    Aplique bolsa de água quente no abdômen por 15-20 minutos. O calor relaxa os
                    músculos uterinos e alivia cólicas.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="food" className="space-y-4 mt-4">
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-3">✅ Alimentos Recomendados</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">🥬</span>
                      <span>
                        <strong>Folhas verdes escuras:</strong> Ricas em magnésio, relaxam músculos
                        e reduzem cólicas
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">🍌</span>
                      <span>
                        <strong>Banana:</strong> Potássio ajuda a reduzir retenção de líquidos e
                        inchaço
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">🥜</span>
                      <span>
                        <strong>Oleaginosas:</strong> Ômega-3 tem ação anti-inflamatória natural
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">🍫</span>
                      <span>
                        <strong>Chocolate amargo (70%+):</strong> Magnésio melhora humor e reduz
                        ansiedade
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">🐟</span>
                      <span>
                        <strong>Peixes:</strong> Ômega-3 reduz inflamação e intensidade das cólicas
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">💧</span>
                      <span>
                        <strong>Água:</strong> Hidratação reduz retenção de líquidos (parece
                        contraditório, mas funciona!)
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-3">❌ Alimentos a Evitar</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">🧂</span>
                      <span>
                        <strong>Sal em excesso:</strong> Aumenta retenção de líquidos e inchaço
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">☕</span>
                      <span>
                        <strong>Cafeína:</strong> Pode intensificar cólicas e aumentar ansiedade
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">🍰</span>
                      <span>
                        <strong>Açúcar refinado:</strong> Causa picos de insulina e piora oscilações
                        de humor
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">🍔</span>
                      <span>
                        <strong>Alimentos processados:</strong> Gorduras trans aumentam inflamação
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">🥛</span>
                      <span>
                        <strong>Laticínios em excesso:</strong> Podem aumentar prostaglandinas
                        (causam cólicas)
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="teas" className="space-y-4 mt-4">
              <div className="space-y-3">
                <div className="bg-amber-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-amber-800 mb-2">🍵 Chá de Camomila</h4>
                  <p className="text-sm text-gray-700">
                    Propriedades relaxantes e anti-inflamatórias. Alivia cólicas e ajuda a dormir
                    melhor.
                  </p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-amber-800 mb-2">🌿 Chá de Gengibre</h4>
                  <p className="text-sm text-gray-700">
                    Anti-inflamatório natural. Reduz náuseas, cólicas e melhora circulação.
                  </p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-amber-800 mb-2">🍃 Chá de Hortelã</h4>
                  <p className="text-sm text-gray-700">
                    Relaxa músculos do útero e alivia desconfortos digestivos comuns na TPM.
                  </p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-amber-800 mb-2">🌸 Chá de Melissa</h4>
                  <p className="text-sm text-gray-700">
                    Calmante natural. Reduz ansiedade, irritabilidade e melhora qualidade do sono.
                  </p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <p className="text-sm text-orange-800">
                    <strong>⚠️ Atenção:</strong> Evite chás de canela, hibisco e cavalinha durante a
                    menstruação, pois podem aumentar o fluxo.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="selfcare" className="space-y-4 mt-4">
              <div className="space-y-4">
                <div className="bg-pink-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-pink-800 mb-3 flex items-center gap-2">
                    <Smile className="w-5 h-5" />
                    Saúde Mental e Emocional
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">💜</span>
                      <span>
                        <strong>Seja gentil consigo mesma:</strong> É normal sentir-se mais sensível
                        e emotiva
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">😴</span>
                      <span>
                        <strong>Priorize o descanso:</strong> Durma 7-9 horas por noite
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">🛁</span>
                      <span>
                        <strong>Banho relaxante:</strong> Água morna com sais ou óleos essenciais
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">📱</span>
                      <span>
                        <strong>Reduza estímulos:</strong> Menos redes sociais, mais momentos de paz
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">🎵</span>
                      <span>
                        <strong>Música relaxante:</strong> Sons da natureza ou músicas calmas
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">📖</span>
                      <span>
                        <strong>Leitura leve:</strong> Algo que te faça bem e relaxe
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-3">🌟 Dica Extra</h4>
                  <p className="text-sm text-gray-700">
                    Mantenha um diário dos seus sintomas. Com o tempo, você identificará padrões e
                    saberá exatamente o que funciona melhor para você em cada fase do ciclo.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    );
  }

  if (mode === 'pregnancy') {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-pink-100">
        <CardHeader>
          <CardTitle className="text-pink-600">Dicas para Gestantes</CardTitle>
          <CardDescription>Cuidados especiais durante a gravidez</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">💧 Hidratação</h4>
              <p className="text-sm text-gray-700">
                Beba pelo menos 2,5L de água por dia. Ajuda na formação do líquido amniótico e
                previne constipação.
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">🚶‍♀️ Exercícios</h4>
              <p className="text-sm text-gray-700">
                Caminhadas, yoga para gestantes e natação são ótimas opções. Sempre com liberação
                médica.
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">😴 Descanso</h4>
              <p className="text-sm text-gray-700">
                Durma de lado (preferencialmente esquerdo) com travesseiro entre as pernas para
                melhor circulação.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-pink-100">
      <CardHeader>
        <CardTitle className="text-pink-600">Dicas Pós-Parto</CardTitle>
        <CardDescription>Cuidados com você e seu bebê</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-pink-50 p-4 rounded-lg">
            <h4 className="font-semibold text-pink-800 mb-2">🤱 Amamentação</h4>
            <p className="text-sm text-gray-700">
              Posição correta: bebê de frente para você, barriga com barriga. Boca bem aberta
              abocanhando toda aréola.
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">💤 Sono</h4>
            <p className="text-sm text-gray-700">
              Durma quando o bebê dormir. Não se preocupe com tarefas domésticas, priorize seu
              descanso.
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-800 mb-2">💜 Saúde Emocional</h4>
            <p className="text-sm text-gray-700">
              Baby blues é normal nos primeiros dias. Se tristeza persistir por mais de 2 semanas,
              procure ajuda.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
