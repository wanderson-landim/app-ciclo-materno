'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Heart, Baby, Droplets, BookOpen, Bell, Home as HomeIcon } from 'lucide-react';
import CycleTracker from './components/CycleTracker';
import PregnancyTracker from './components/PregnancyTracker';
import TipsSection from './components/TipsSection';
import HydrationTracker from './components/HydrationTracker';
import RemindersPanel from './components/RemindersPanel';
import PostpartumTracker from './components/PostpartumTracker';
import { AppMode } from '@/lib/types';

export default function Home() {
  const [appMode, setAppMode] = useState<AppMode>('cycle');
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" fill="white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                  Luna Materna
                </h1>
                <p className="text-xs text-gray-500">Seu ciclo, sua jornada</p>
              </div>
            </div>
            
            {/* Mode Selector */}
            <div className="flex gap-2">
              <Button
                variant={appMode === 'cycle' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setAppMode('cycle')}
                className={appMode === 'cycle' ? 'bg-gradient-to-r from-pink-400 to-purple-400' : ''}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Ciclo
              </Button>
              <Button
                variant={appMode === 'pregnancy' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setAppMode('pregnancy')}
                className={appMode === 'pregnancy' ? 'bg-gradient-to-r from-pink-400 to-purple-400' : ''}
              >
                <Baby className="w-4 h-4 mr-2" />
                Grávida
              </Button>
              <Button
                variant={appMode === 'postpartum' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setAppMode('postpartum')}
                className={appMode === 'postpartum' ? 'bg-gradient-to-r from-pink-400 to-purple-400' : ''}
              >
                <Heart className="w-4 h-4 mr-2" />
                Pós-parto
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 pb-24">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="home" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-400 data-[state=active]:to-purple-400 data-[state=active]:text-white">
              <HomeIcon className="w-4 h-4 mr-2" />
              Início
            </TabsTrigger>
            <TabsTrigger value="tips" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-400 data-[state=active]:to-purple-400 data-[state=active]:text-white">
              <BookOpen className="w-4 h-4 mr-2" />
              Dicas
            </TabsTrigger>
            <TabsTrigger value="hydration" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-400 data-[state=active]:to-purple-400 data-[state=active]:text-white">
              <Droplets className="w-4 h-4 mr-2" />
              Água
            </TabsTrigger>
            <TabsTrigger value="reminders" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-400 data-[state=active]:to-purple-400 data-[state=active]:text-white">
              <Bell className="w-4 h-4 mr-2" />
              Lembretes
            </TabsTrigger>
            <TabsTrigger value="calendar" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-400 data-[state=active]:to-purple-400 data-[state=active]:text-white">
              <Calendar className="w-4 h-4 mr-2" />
              Agenda
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-6">
            {appMode === 'cycle' && <CycleTracker />}
            {appMode === 'pregnancy' && <PregnancyTracker />}
            {appMode === 'postpartum' && <PostpartumTracker />}
          </TabsContent>

          <TabsContent value="tips">
            <TipsSection mode={appMode} />
          </TabsContent>

          <TabsContent value="hydration">
            <HydrationTracker mode={appMode} />
          </TabsContent>

          <TabsContent value="reminders">
            <RemindersPanel mode={appMode} />
          </TabsContent>

          <TabsContent value="calendar">
            <Card className="bg-white/80 backdrop-blur-sm border-pink-100">
              <CardHeader>
                <CardTitle className="text-pink-600">Agenda de Consultas</CardTitle>
                <CardDescription>Gerencie suas consultas e compromissos</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 py-8">Em breve: calendário completo de consultas</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
