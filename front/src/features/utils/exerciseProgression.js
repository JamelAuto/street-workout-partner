// Define exercise levels with numeric values for comparison
export const exerciseLevels = {
  newcomer: 0,
  beginner: 1,
  intermediate: 2,
  advanced: 3
};

export const exerciseProgressions = {
  pushUps: {
    newcomer: {
      exercise: 'Wall Push Ups → Incline Push Ups → Knee Push Ups',
      sets: '2-3',
      reps: '5-10',
      rest: '90-120 seconds',
      advice: 'Focus on proper form with wall push-ups before progressing. Keep your core tight and maintain a straight body line.'
    },
    beginner: {
      exercise: 'Full Push Ups',
      sets: '3-4',
      reps: '5-10',
      rest: '90 seconds',
      advice: 'Work on maintaining proper form throughout the full range of motion. Try to lower your chest close to the ground.'
    },
    intermediate: {
      exercise: 'Diamond Push Ups → Archer Push Ups',
      sets: '4-5',
      reps: '8-12',
      rest: '60-90 seconds',
      advice: 'Challenge yourself with diamond push-ups to target triceps more. Keep elbows close to body.'
    },
    advanced: {
      exercise: 'One Arm Push Ups Progression',
      sets: '4-5',
      reps: '5-8 per side',
      rest: '60 seconds',
      advice: 'Start with archer push-ups, then progress to partial one-arm push-ups before attempting full ones.'
    }
  },
  pullUps: {
    newcomer: {
      exercise: 'Dead Hangs → Australian Pull Ups → Negative Pull Ups',
      sets: '2-3',
      reps: '10s hold / 5-8 reps',
      rest: '120 seconds',
      criteria: 'Cannot do full pull ups',
      advice: 'Start with dead hangs to build grip strength. Progress to Australian pull-ups.'
    },
    beginner: {
      exercise: 'Full Pull Ups (assisted if needed)',
      sets: '3-4',
      reps: '3-5',
      rest: '120 seconds',
      criteria: '1-5 full pull ups',
      advice: 'Use assistance if needed. Focus on full range of motion.'
    },
    intermediate: {
      exercise: 'Full Pull Ups → L-Sit Pull Ups',
      sets: '4',
      reps: '6-10',
      rest: '90 seconds',
      criteria: '6-12 full pull ups',
      advice: 'Engage your core and maintain control throughout the movement.'
    },
    advanced: {
      exercise: 'Weighted Pull Ups → One Arm Pull Up Progression',
      sets: '4-5',
      reps: '8-12 / 3-5 per side',
      rest: '90 seconds',
      criteria: '12+ full pull ups',
      advice: 'Increase weight gradually. Focus on form and control.'
    }
  },
  dips: {
    newcomer: {
      exercise: 'Bench Dips → Straight Bar Dips Support Hold',
      sets: '2-3',
      reps: '5-10 / 20s hold',
      rest: '90 seconds',
      criteria: 'Cannot do full dips',
      advice: 'Start with bench dips to build basic strength. Progress to straight bar dips.'
    },
    beginner: {
      exercise: 'Assisted Dips → Full Dips',
      sets: '3',
      reps: '5-8',
      rest: '90 seconds',
      criteria: '1-8 full dips',
      advice: 'Use assistance if needed. Focus on full range of motion.'
    },
    intermediate: {
      exercise: 'Full Dips → L-Sit Dips',
      sets: '4',
      reps: '8-12',
      rest: '60-90 seconds',
      criteria: '8-15 full dips',
      advice: 'Engage your core and maintain control throughout the movement.'
    },
    advanced: {
      exercise: 'Weighted Dips → Russian Dips',
      sets: '4-5',
      reps: '8-12',
      rest: '60 seconds',
      criteria: '15+ full dips',
      advice: 'Increase weight gradually. Focus on form and control.'
    }
  }
};

export const determineLevel = (exercise, maxReps) => {
  switch (exercise) {
    case 'pushUps':
      if (maxReps < 5) return 'newcomer';
      if (maxReps < 15) return 'beginner';
      if (maxReps < 30) return 'intermediate';
      return 'advanced';
    
    case 'pullUps':
      if (maxReps < 1) return 'newcomer';
      if (maxReps < 6) return 'beginner';
      if (maxReps < 12) return 'intermediate';
      return 'advanced';
    
    case 'dips':
      if (maxReps < 1) return 'newcomer';
      if (maxReps < 8) return 'beginner';
      if (maxReps < 15) return 'intermediate';
      return 'advanced';
    
    default:
      return 'beginner';
  }
};