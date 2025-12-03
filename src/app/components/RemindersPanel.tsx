'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Bell, Plus, Trash2, Clock } from 'lucide-react';
import { AppMode, Reminder } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

interface RemindersPanelProps {
  mode: AppMode;
}

export default function RemindersPanel({ mode }: RemindersPanelProps) {
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      type: 'water',
      time: '09:00',
      days: [1, 2, 3, 4, 5, 6, 0],
      message: 'Hora de beber água! 💧',
      enabled: true,
    },
    {
      id: '2',
      type: 'water',
      time: '12:00',
      days: [1, 2, 3, 4, 5, 6, 0],
      message: 'Lembre-se de se hidratar! 💧',
      enabled: true,
    },
    {
      id: '3',
      type: 'water',
      time: '15:00',
      days: [1, 2, 3, 4, 5, 6, 0],
      message: 'Beba água agora! 💧',
      enabled: true,
    },
    {
      id: '4',
      type: 'water',
      time: '18:00',
      days: [1, 2, 3, 4, 5, 6, 0],
      message: 'Hora da hidratação! 💧',
      enabled: true,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newReminder, setNewReminder] = useState<Partial<Reminder>>({
    type: 'custom',
    time: '09:00',
    days: [1, 2, 3, 4, 5, 6, 0],
    message: '',
    enabled: true,
  });

  const toggleReminder = (id: string) => {
    setReminders(
      reminders.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    );
  };

  const deleteReminder = (id: string) => {
    setReminders(reminders.filter((r) => r.id !== id));
  };

  const addReminder = () => {
    if (!newReminder.message || !newReminder.time) return;

    const reminder: Reminder = {
      id: Date.now().toString(),
      type: newReminder.type || 'custom',
      time: newReminder.time,
      days: newReminder.days || [1, 2, 3, 4, 5, 6, 0],
      message: newReminder.message,
      enabled: true,
    };

    setReminders([...reminders, reminder]);
    setNewReminder({
      type: 'custom',
      time: '09:00',
      days: [1, 2, 3, 4, 5, 6, 0],
      message: '',
      enabled: true,
    });
    setShowAddForm(false);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'water':
        return 'bg-blue-100 text-blue-700';
      case 'vitamin':
        return 'bg-orange-100 text-orange-700';
      case 'appointment':
        return 'bg-purple-100 text-purple-700';
      case 'movement':
        return 'bg-pink-100 text-pink-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'water':
        return '💧 Água';
      case 'vitamin':
        return '💊 Vitamina';
      case 'appointment':
        return '📅 Consulta';
      case 'movement':
        return '👶 Movimento fetal';
      default:
        return '🔔 Personalizado';
    }
  };

  // Add pregnancy-specific reminders
  const pregnancyReminders: Reminder[] = mode === 'pregnancy' ? [
    {
      id: 'preg-1',
      type: 'vitamin',
      time: '08:00',
      days: [1, 2, 3, 4, 5, 6, 0],
      message: 'Tomar ácido fólico e vitaminas pré-natais 💊',
      enabled: true,
    },
    {
      id: 'preg-2',
      type: 'movement',
      time: '20:00',
      days: [1, 2, 3, 4, 5, 6, 0],
      message: 'Verificar movimentos do bebê 👶',
      enabled: true,
    },
  ] : [];

  const allReminders = [...reminders, ...pregnancyReminders];

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-pink-100">
      <CardHeader>
        <CardTitle className="text-pink-600 flex items-center gap-2">
          <Bell className="w-6 h-6" />
          Lembretes Inteligentes
        </CardTitle>
        <CardDescription>
          Configure alertas personalizados para cuidar de você
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Active Reminders List */}
        <div className="space-y-3">
          {allReminders.map((reminder) => (
            <div
              key={reminder.id}
              className={`p-4 rounded-lg border-2 transition-all ${
                reminder.enabled
                  ? 'bg-white border-pink-200'
                  : 'bg-gray-50 border-gray-200 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={getTypeColor(reminder.type)}>
                      {getTypeLabel(reminder.type)}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      {reminder.time}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{reminder.message}</p>
                  <div className="flex gap-1 mt-2">
                    {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, index) => (
                      <div
                        key={index}
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                          reminder.days.includes(index)
                            ? 'bg-pink-500 text-white'
                            : 'bg-gray-200 text-gray-400'
                        }`}
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Switch
                    checked={reminder.enabled}
                    onCheckedChange={() => toggleReminder(reminder.id)}
                  />
                  {!reminder.id.startsWith('preg-') && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteReminder(reminder.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Reminder Button */}
        {!showAddForm && (
          <Button
            onClick={() => setShowAddForm(true)}
            className="w-full bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Novo Lembrete
          </Button>
        )}

        {/* Add Reminder Form */}
        {showAddForm && (
          <div className="space-y-4 p-4 bg-pink-50 rounded-lg border-2 border-pink-200">
            <h4 className="font-semibold text-pink-800">Novo Lembrete</h4>

            <div className="space-y-2">
              <Label htmlFor="reminderTime">Horário</Label>
              <Input
                id="reminderTime"
                type="time"
                value={newReminder.time}
                onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
                className="border-pink-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reminderMessage">Mensagem</Label>
              <Input
                id="reminderMessage"
                type="text"
                placeholder="Ex: Tomar vitamina, Beber água..."
                value={newReminder.message}
                onChange={(e) => setNewReminder({ ...newReminder, message: e.target.value })}
                className="border-pink-200"
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={addReminder}
                className="flex-1 bg-gradient-to-r from-pink-400 to-purple-400"
              >
                Salvar
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowAddForm(false)}
                className="flex-1 border-pink-200"
              >
                Cancelar
              </Button>
            </div>
          </div>
        )}

        {/* Info Box */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
          <h4 className="font-semibold text-purple-800 mb-2">💡 Dica</h4>
          <p className="text-sm text-gray-700">
            Os lembretes ajudam você a manter uma rotina saudável. Ative notificações no navegador
            para receber alertas mesmo quando não estiver com o app aberto.
          </p>
        </div>

        {/* Pregnancy-specific reminders info */}
        {mode === 'pregnancy' && (
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">🤰 Lembretes da Gestação</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Vitaminas pré-natais: melhor absorção pela manhã</li>
              <li>• Movimentos fetais: conte 10 movimentos em 2 horas</li>
              <li>• Hidratação: essencial para o líquido amniótico</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
