// src/lib/data.ts
import { Workout, Food } from "../types";

export const workoutPlan: Workout[] = [
  {
    day: 1,
    workout: "Full Body Cardio",
    duration: "30 min",
    calories: 300,
    exercises: [
      { name: "Jumping Jacks", sets: 3, reps: 20 },
      { name: "Burpees", sets: 3, reps: 10 },
      { name: "Mountain Climbers", duration: "30s" },
      { name: "High Knees", duration: "30s" },
    ],
  },
  {
    day: 2,
    workout: "Upper Body Strength",
    duration: "25 min",
    calories: 200,
    exercises: [
      { name: "Push-ups", sets: 3, reps: 12 },
      { name: "Tricep Dips", sets: 3, reps: 10 },
      { name: "Plank", duration: "45s" },
      { name: "Arm Circles", sets: 2, reps: 15 },
    ],
  },
  {
    day: 3,
    workout: "Running",
    duration: "20 min",
    calories: 250,
    exercises: [
      { name: "Warm-up Walk", duration: "5 min" },
      { name: "Steady Run", duration: "10 min" },
      { name: "Cool-down Walk", duration: "5 min" },
    ],
  },
  {
    day: 4,
    workout: "Core & Flexibility",
    duration: "35 min",
    calories: 180,
    exercises: [
      { name: "Crunches", sets: 3, reps: 15 },
      { name: "Russian Twists", sets: 3, reps: 20 },
      { name: "Leg Raises", sets: 3, reps: 12 },
      { name: "Yoga Stretches", duration: "15 min" },
    ],
  },
  {
    day: 5,
    workout: "HIIT Training",
    duration: "30 min",
    calories: 350,
    exercises: [
      { name: "Sprint Intervals", duration: "20 min" },
      { name: "Rest & Recovery", duration: "10 min" },
    ],
  },
  {
    day: 6,
    workout: "Lower Body Focus",
    duration: "40 min",
    calories: 280,
    exercises: [
      { name: "Squats", sets: 4, reps: 15 },
      { name: "Lunges", sets: 3, reps: 12 },
      { name: "Calf Raises", sets: 3, reps: 20 },
      { name: "Wall Sit", duration: "60s" },
    ],
  },
  {
    day: 7,
    workout: "Active Recovery",
    duration: "15 min",
    calories: 100,
    exercises: [
      { name: "Light Stretching", duration: "10 min" },
      { name: "Walking", duration: "5 min" },
    ],
  },
];

export const malayFood: Food[] = [
  {
    name: "Nasi Putih",
    calories: 150,
    serving: "1 mangkuk",
    category: "lunch",
  },
  { name: "Ayam Bakar", calories: 200, serving: "1 ketul", category: "lunch" },
  { name: "Ikan Bakar", calories: 180, serving: "1 ketul", category: "dinner" },
  {
    name: "Sayur Campur",
    calories: 50,
    serving: "1 pinggan",
    category: "lunch",
  },
  { name: "Teh O", calories: 5, serving: "1 gelas", category: "breakfast" },
  { name: "Kopi O", calories: 10, serving: "1 gelas", category: "breakfast" },
  { name: "Pisang", calories: 90, serving: "1 biji", category: "snack" },
  { name: "Epal", calories: 80, serving: "1 biji", category: "snack" },
  {
    name: "Roti Wholemeal",
    calories: 80,
    serving: "1 keping",
    category: "breakfast",
  },
  {
    name: "Telur Rebus",
    calories: 70,
    serving: "1 biji",
    category: "breakfast",
  },
  {
    name: "Susu Low Fat",
    calories: 120,
    serving: "1 gelas",
    category: "breakfast",
  },
  {
    name: "Tempe Goreng",
    calories: 160,
    serving: "2 ketul",
    category: "lunch",
  },
  { name: "Tahu Goreng", calories: 140, serving: "3 ketul", category: "lunch" },
  { name: "Sup Sayur", calories: 60, serving: "1 mangkuk", category: "dinner" },
  {
    name: "Mee Goreng",
    calories: 300,
    serving: "1 pinggan",
    category: "lunch",
  },
  {
    name: "Nasi Lemak",
    calories: 400,
    serving: "1 bungkus",
    category: "breakfast",
  },
];

export const mealSuggestions = {
  breakfast: [
    {
      name: "Sarapan Sihat",
      calories: 400,
      items: ["2 keping roti wholemeal", "1 biji telur", "1 gelas susu"],
    },
    {
      name: "Sarapan Tradisional",
      calories: 350,
      items: ["Nasi lemak kecil", "Air kosong"],
    },
  ],
  lunch: [
    {
      name: "Makan Tengah Hari",
      calories: 600,
      items: ["Nasi putih", "Ayam bakar", "Sayur campur", "Buah"],
    },
    {
      name: "Vegetarian",
      calories: 500,
      items: ["Nasi", "Tempe goreng", "Sayur", "Tahu"],
    },
  ],
  dinner: [
    {
      name: "Makan Malam",
      calories: 500,
      items: ["Sup sayur", "Ikan bakar", "Sayur", "Sedikit nasi"],
    },
    {
      name: "Light Dinner",
      calories: 400,
      items: ["Salad", "Ayam rebus", "Buah"],
    },
  ],
};
