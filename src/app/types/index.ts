// src/types/index.ts
export interface RunningData {
  isRunning: boolean;
  distance: number; // in meters
  time: number; // in seconds
  pace: number; // min/km
  calories: number;
}

export interface Workout {
  day: number;
  workout: string;
  duration: string;
  calories: number;
  exercises?: Exercise[];
}

export interface Exercise {
  name: string;
  sets?: number;
  reps?: number;
  duration?: string;
}

export interface Food {
  name: string;
  calories: number;
  serving: string;
  category?: "breakfast" | "lunch" | "dinner" | "snack";
}

export interface NutritionData {
  dailyCalories: number;
  targetCalories: number;
  meals: MealEntry[];
}

export interface MealEntry {
  food: Food;
  timestamp: Date;
  quantity: number;
}

export interface UserProgress {
  currentDay: number;
  completedWorkouts: number[];
  totalCaloriesBurned: number;
  totalDistance: number; // in km
  weight?: number;
}

export interface DashboardStats {
  dailyCalories: number;
  dailyDistance: number;
  activeTime: number;
  caloriesBurned: number;
}
