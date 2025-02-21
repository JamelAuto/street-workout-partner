import { addDays, addMonths, format } from 'date-fns';

const generateDayWorkout = (userProgress, dayOfWeek) => {
  const workoutTypes = {
    1: 'Push Focus', // Monday
    2: 'Pull Focus', // Tuesday
    3: 'Full Body',  // Wednesday
    4: 'Push Focus', // Thursday
    5: 'Pull Focus', // Friday
    6: 'Full Body'   // Saturday
  };

  const calculateSets = (baseReps) => {
    return Math.max(3, Math.floor(baseReps / 5));
  };

  const type = workoutTypes[dayOfWeek];
  let exercises = [];

  switch (type) {
    case 'Push Focus':
      exercises = [
        {
          name: 'Push Ups',
          sets: calculateSets(userProgress.pushUps),
          progression: [userProgress.pushUps + 2],
          restTime: 120
        },
        {
          name: 'Dips',
          sets: calculateSets(userProgress.dips),
          progression: [userProgress.dips + 1],
          restTime: 150
        }
      ];
      break;
    
    case 'Pull Focus':
      exercises = [
        {
          name: 'Pull Ups',
          sets: calculateSets(userProgress.pullUps),
          progression: [userProgress.pullUps + 1],
          restTime: 180
        }
      ];
      break;
    
    case 'Full Body':
      exercises = [
        {
          name: 'Push Ups',
          sets: calculateSets(userProgress.pushUps),
          progression: [userProgress.pushUps + 1],
          restTime: 120
        },
        {
          name: 'Pull Ups',
          sets: calculateSets(userProgress.pullUps),
          progression: [userProgress.pullUps + 1],
          restTime: 180
        },
        {
          name: 'Dips',
          sets: calculateSets(userProgress.dips),
          progression: [userProgress.dips + 1],
          restTime: 150
        }
      ];
      break;
  }

  return {
    type,
    exercises
  };
};

export const generateWorkoutProgram = (durationMonths, userProgress) => {
  const startDate = new Date();
  const endDate = addMonths(startDate, durationMonths);
  const program = {
    startDate,
    endDate,
    duration: durationMonths,
    days: {}
  };

  let currentDate = startDate;
  while (currentDate <= endDate) {
    const dateStr = format(currentDate, 'yyyy-MM-dd');
    const dayOfWeek = currentDate.getDay();

    // Skip Sundays (rest days)
    if (dayOfWeek !== 0) {
      program.days[dateStr] = generateDayWorkout(userProgress, dayOfWeek);
    }

    currentDate = addDays(currentDate, 1);
  }

  return program;
};