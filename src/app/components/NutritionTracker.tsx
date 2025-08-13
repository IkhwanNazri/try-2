// src/components/NutritionTracker.tsx
"use client";

import { useState } from "react";
import { Plus, Trash2, Utensils } from "lucide-react";
import { Food, MealEntry } from "../types";
import { malayFood, mealSuggestions } from "../lib/data";

interface NutritionTrackerProps {
  onCalorieUpdate?: (calories: number) => void;
}

export default function NutritionTracker({
  onCalorieUpdate,
}: NutritionTrackerProps) {
  const [dailyCalories, setDailyCalories] = useState<number>(0);
  const [targetCalories] = useState<number>(2000);
  const [meals, setMeals] = useState<MealEntry[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const addFood = (food: Food) => {
    const newMeal: MealEntry = {
      food,
      timestamp: new Date(),
      quantity: 1,
    };

    const newMeals = [...meals, newMeal];
    const newCalories = dailyCalories + food.calories;

    setMeals(newMeals);
    setDailyCalories(newCalories);

    if (onCalorieUpdate) {
      onCalorieUpdate(newCalories);
    }
  };

  const removeFood = (index: number) => {
    const removedMeal = meals[index];
    const newMeals = meals.filter((_, i) => i !== index);
    const newCalories = dailyCalories - removedMeal.food.calories;

    setMeals(newMeals);
    setDailyCalories(newCalories);

    if (onCalorieUpdate) {
      onCalorieUpdate(newCalories);
    }
  };

  const resetDay = () => {
    setMeals([]);
    setDailyCalories(0);

    if (onCalorieUpdate) {
      onCalorieUpdate(0);
    }
  };

  const filteredFoods =
    selectedCategory === "all"
      ? malayFood
      : malayFood.filter((food) => food.category === selectedCategory);

  const remainingCalories = Math.max(targetCalories - dailyCalories, 0);
  const progressPercentage = Math.min(
    (dailyCalories / targetCalories) * 100,
    100
  );

  return (
    <div className="space-y-6">
      {/* Calorie Progress */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Utensils className="w-6 h-6 text-blue-500" />
            Tracker Kalori
          </h2>
          <button
            onClick={resetDay}
            className="px-3 py-1 text-sm bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Reset Hari
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {dailyCalories}
            </div>
            <div className="text-sm text-blue-700">Kalori Dimakan</div>
          </div>

          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600 mb-1">
              {remainingCalories}
            </div>
            <div className="text-sm text-green-700">Baki Kalori</div>
          </div>

          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-3xl font-bold text-purple-600 mb-1">
              {targetCalories}
            </div>
            <div className="text-sm text-purple-700">Target Harian</div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress Hari Ini</span>
            <span>{progressPercentage.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className={`h-4 rounded-full transition-all duration-500 ${
                progressPercentage > 100
                  ? "bg-red-500"
                  : "bg-gradient-to-r from-blue-500 to-green-500"
              }`}
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>
          {progressPercentage > 100 && (
            <div className="text-red-600 text-sm mt-1 text-center">
              Melebihi target sebanyak {dailyCalories - targetCalories} kalori
            </div>
          )}
        </div>
      </div>

      {/* Today's Meals */}
      {meals.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Makanan Hari Ini</h3>
          <div className="space-y-3">
            {meals.map((meal, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <div className="font-medium text-gray-800">
                    {meal.food.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {meal.food.serving} • {meal.food.calories} kalori
                  </div>
                  <div className="text-xs text-gray-500">
                    {meal.timestamp.toLocaleTimeString("ms-MY", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
                <button
                  onClick={() => removeFood(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Food Categories Filter */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">Tambah Makanan</h3>

        <div className="flex flex-wrap gap-2 mb-4">
          {[
            { key: "all", label: "Semua" },
            { key: "breakfast", label: "Sarapan" },
            { key: "lunch", label: "Makan Tengah Hari" },
            { key: "dinner", label: "Makan Malam" },
            { key: "snack", label: "Snek" },
          ].map((category) => (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.key
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
