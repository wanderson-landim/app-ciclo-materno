import { CycleData } from './types';
import { addDays, differenceInDays, format } from 'date-fns';

export function calculateCycleInfo(cycleData: CycleData) {
  const { lastPeriodDate, cycleLength, periodLength } = cycleData;
  
  // Próxima menstruação
  const nextPeriodDate = addDays(lastPeriodDate, cycleLength);
  
  // Período fértil (geralmente 5 dias antes da ovulação + dia da ovulação)
  const ovulationDay = cycleLength - 14; // Ovulação ocorre ~14 dias antes da próxima menstruação
  const ovulationDate = addDays(lastPeriodDate, ovulationDay);
  const fertileWindowStart = addDays(ovulationDate, -5);
  const fertileWindowEnd = addDays(ovulationDate, 1);
  
  // Dias até próxima menstruação
  const today = new Date();
  const daysUntilPeriod = differenceInDays(nextPeriodDate, today);
  
  // Status atual
  let currentPhase: 'menstruation' | 'follicular' | 'ovulation' | 'luteal' | 'late';
  const daysSinceLastPeriod = differenceInDays(today, lastPeriodDate);
  
  if (daysSinceLastPeriod < periodLength) {
    currentPhase = 'menstruation';
  } else if (daysSinceLastPeriod < ovulationDay - 2) {
    currentPhase = 'follicular';
  } else if (daysSinceLastPeriod >= ovulationDay - 2 && daysSinceLastPeriod <= ovulationDay + 1) {
    currentPhase = 'ovulation';
  } else if (daysUntilPeriod > 0) {
    currentPhase = 'luteal';
  } else {
    currentPhase = 'late';
  }
  
  // Verificar atraso
  const isLate = daysUntilPeriod < -3; // Considera atraso após 3 dias
  const daysLate = isLate ? Math.abs(daysUntilPeriod) : 0;
  
  return {
    nextPeriodDate,
    ovulationDate,
    fertileWindowStart,
    fertileWindowEnd,
    daysUntilPeriod,
    currentPhase,
    isLate,
    daysLate,
    isFertileWindow: today >= fertileWindowStart && today <= fertileWindowEnd,
  };
}

export function calculatePregnancyWeek(dueDate: Date): number {
  const today = new Date();
  const conceptionDate = addDays(dueDate, -280); // 40 semanas = 280 dias
  const daysSinceConception = differenceInDays(today, conceptionDate);
  return Math.floor(daysSinceConception / 7);
}

export function getBabySize(week: number): { size: string; fruit: string } {
  const sizes: { [key: number]: { size: string; fruit: string } } = {
    4: { size: '2mm', fruit: 'Semente de papoula' },
    5: { size: '3mm', fruit: 'Semente de gergelim' },
    6: { size: '5mm', fruit: 'Lentilha' },
    7: { size: '1cm', fruit: 'Mirtilo' },
    8: { size: '1.6cm', fruit: 'Framboesa' },
    9: { size: '2.3cm', fruit: 'Cereja' },
    10: { size: '3.1cm', fruit: 'Morango' },
    11: { size: '4.1cm', fruit: 'Figo' },
    12: { size: '5.4cm', fruit: 'Ameixa' },
    13: { size: '7.4cm', fruit: 'Limão' },
    14: { size: '8.7cm', fruit: 'Pêssego' },
    15: { size: '10.1cm', fruit: 'Maçã' },
    16: { size: '11.6cm', fruit: 'Abacate' },
    17: { size: '13cm', fruit: 'Pera' },
    18: { size: '14.2cm', fruit: 'Pimentão' },
    19: { size: '15.3cm', fruit: 'Tomate grande' },
    20: { size: '16.4cm', fruit: 'Banana' },
    21: { size: '26.7cm', fruit: 'Cenoura' },
    22: { size: '27.8cm', fruit: 'Mamão papaia' },
    23: { size: '28.9cm', fruit: 'Manga' },
    24: { size: '30cm', fruit: 'Espiga de milho' },
    25: { size: '34.6cm', fruit: 'Couve-flor' },
    26: { size: '35.6cm', fruit: 'Alface' },
    27: { size: '36.6cm', fruit: 'Brócolis' },
    28: { size: '37.6cm', fruit: 'Berinjela' },
    29: { size: '38.6cm', fruit: 'Abóbora' },
    30: { size: '39.9cm', fruit: 'Repolho' },
    31: { size: '41.1cm', fruit: 'Coco' },
    32: { size: '42.4cm', fruit: 'Jaca' },
    33: { size: '43.7cm', fruit: 'Abacaxi' },
    34: { size: '45cm', fruit: 'Melão cantalupo' },
    35: { size: '46.2cm', fruit: 'Melão' },
    36: { size: '47.4cm', fruit: 'Alface romana' },
    37: { size: '48.6cm', fruit: 'Acelga' },
    38: { size: '49.8cm', fruit: 'Alho-poró' },
    39: { size: '50.7cm', fruit: 'Melancia pequena' },
    40: { size: '51.2cm', fruit: 'Abóbora' },
  };
  
  return sizes[week] || { size: '51cm', fruit: 'Abóbora' };
}

export function calculateWaterIntake(mode: 'normal' | 'pregnancy' | 'breastfeeding'): number {
  // Retorna em ml
  switch (mode) {
    case 'pregnancy':
      return 2500; // 2.5L
    case 'breastfeeding':
      return 3000; // 3L
    default:
      return 2000; // 2L
  }
}

const monthNames = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
];

export function formatDate(date: Date): string {
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  return `${day} de ${month}`;
}

export function formatDateShort(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${day}/${month}`;
}
