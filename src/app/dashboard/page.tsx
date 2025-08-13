"use client";

import React, { useState, useEffect } from "react";
import {
  Activity,
  Calendar,
  MapPin,
  Target,
  Utensils,
  Play,
  Pause,
  Square,
  TrendingUp,
  Clock,
  Flame,
  Heart,
} from "lucide-react";

const FitnessApp = () => {
  type ActiveTab = "dashboard" | "workouts" | "running" | "nutrition";
  type RunningData = {
    isRunning: boolean;
    distance: number;
    time: number;
    pace: number;
    calories: number;
  };
  type Workout = {
    day: number;
    workout: string;
    duration: string;
    calories: number;
  };
  type FoodItem = {
    name: string;
    calories: number;
    serving: string;
  };

  const [activeTab, setActiveTab] = useState<ActiveTab>("dashboard");
  const [runningData, setRunningData] = useState<RunningData>({
    isRunning: false,
    distance: 0,
    time: 0,
    pace: 0,
    calories: 0,
  });
  const [dailyCalories, setDailyCalories] = useState(0);
  const [targetCalories] = useState(2000);
  const [currentDay, setCurrentDay] = useState(1);

  // Timer untuk running
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;
    if (runningData.isRunning) {
      intervalId = setInterval(() => {
        setRunningData((prev) => {
          const newTime = prev.time + 1;
          const newDistance = prev.distance + 0.05; // simulate movement
          const newPace = newTime > 0 ? newTime / 60 / (newDistance / 1000) : 0;
          const newCalories = Math.floor(newDistance * 0.75);

          return {
            ...prev,
            time: newTime,
            distance: newDistance,
            pace: newPace,
            calories: newCalories,
          };
        });
      }, 1000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [runningData.isRunning]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const workoutPlan: Workout[] = [
    { day: 1, workout: "Full Body Cardio", duration: "30 min", calories: 300 },
    {
      day: 2,
      workout: "Upper Body Strength",
      duration: "25 min",
      calories: 200,
    },
    { day: 3, workout: "Running", duration: "20 min", calories: 250 },
    {
      day: 4,
      workout: "Core & Flexibility",
      duration: "35 min",
      calories: 180,
    },
    { day: 5, workout: "HIIT Training", duration: "30 min", calories: 350 },
    { day: 6, workout: "Lower Body Focus", duration: "40 min", calories: 280 },
    { day: 7, workout: "Active Recovery", duration: "15 min", calories: 100 },
  ];

  const foodItems: FoodItem[] = [
    { name: "Nasi Putih", calories: 150, serving: "1 mangkuk" },
    { name: "Ayam Bakar", calories: 200, serving: "1 ketul" },
    { name: "Sayur Campur", calories: 50, serving: "1 pinggan" },
    { name: "Teh O", calories: 5, serving: "1 gelas" },
    { name: "Pisang", calories: 90, serving: "1 biji" },
    { name: "Roti Wholemeal", calories: 80, serving: "1 keping" },
  ];

  const addFood = (food: FoodItem) => {
    setDailyCalories((prev) => prev + food.calories);
  };

  const toggleRunning = () => {
    setRunningData((prev) => ({ ...prev, isRunning: !prev.isRunning }));
  };

  const stopRunning = () => {
    setRunningData((prev) => ({ ...prev, isRunning: false }));
  };

  const resetRunning = () => {
    setRunningData({
      isRunning: false,
      distance: 0,
      time: 0,
      pace: 0,
      calories: 0,
    });
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-2">30 Days Challenge</h2>
        <div className="flex items-center gap-4">
          <div className="text-3xl font-bold">Hari {currentDay}</div>
          <div className="flex-1 bg-white/20 rounded-full h-2">
            <div
              className="bg-white h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentDay / 30) * 100}%` }}
            />
          </div>
          <div className="text-sm opacity-80">{currentDay}/30</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <Flame className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Kalori Hari Ini</div>
              <div className="text-xl font-bold">{dailyCalories}</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Activity className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Jarak Lari</div>
              <div className="text-xl font-bold">
                {(runningData.distance / 1000).toFixed(2)} km
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Clock className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Masa Aktif</div>
              <div className="text-xl font-bold">
                {formatTime(runningData.time)}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Target className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Target Kalori</div>
              <div className="text-xl font-bold">{targetCalories}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">Senaman Hari Ini</h3>
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
          <div>
            <div className="font-semibold text-gray-800">
              {workoutPlan[(currentDay - 1) % 7].workout}
            </div>
            <div className="text-sm text-gray-600">
              {workoutPlan[(currentDay - 1) % 7].duration} •{" "}
              {workoutPlan[(currentDay - 1) % 7].calories} kalori
            </div>
          </div>
          <button className="px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors">
            Mula
          </button>
        </div>
      </div>
    </div>
  );

  const renderRunning = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-green-500 to-blue-500 text-white p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-4">Tracker Larian</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold">
              {(runningData.distance / 1000).toFixed(2)}
            </div>
            <div className="text-sm opacity-80">KM</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">
              {formatTime(runningData.time)}
            </div>
            <div className="text-sm opacity-80">MASA</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">
              {runningData.pace > 0 ? runningData.pace.toFixed(1) : "0.0"}
            </div>
            <div className="text-sm opacity-80">PACE (min/km)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{runningData.calories}</div>
            <div className="text-sm opacity-80">KALORI</div>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={toggleRunning}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-colors ${
              runningData.isRunning
                ? "bg-red-500 hover:bg-red-600"
                : "bg-white text-green-600 hover:bg-gray-100"
            }`}
          >
            {runningData.isRunning ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5" />
            )}
            {runningData.isRunning ? "Pause" : "Mula"}
          </button>

          <button
            onClick={stopRunning}
            disabled={!runningData.isRunning}
            className="flex items-center gap-2 px-6 py-3 bg-yellow-500 text-white rounded-full font-medium hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Pause className="w-5 h-5" />
            Berhenti
          </button>

          <button
            onClick={resetRunning}
            className="flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-full font-medium hover:bg-gray-600 transition-colors"
          >
            <Square className="w-5 h-5" />
            Reset
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Lokasi Semasa
        </h3>
        <div className="bg-gray-100 h-48 rounded-lg flex items-center justify-center">
          <div className="text-center text-gray-600">
            <MapPin className="w-8 h-8 mx-auto mb-2" />
            <div>Peta akan dipaparkan di sini</div>
            <div className="text-sm">(Memerlukan kebenaran lokasi)</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNutrition = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-4">Tracker Kalori</h2>

        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-2xl font-bold text-blue-600">
              {dailyCalories}
            </div>
            <div className="text-sm text-gray-600">
              daripada {targetCalories} kalori
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold text-green-600">
              {targetCalories - dailyCalories > 0
                ? targetCalories - dailyCalories
                : 0}
            </div>
            <div className="text-sm text-gray-600">baki kalori</div>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
          <div
            className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
            style={{
              width: `${Math.min(
                (dailyCalories / targetCalories) * 100,
                100
              )}%`,
            }}
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">Tambah Makanan</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {foodItems.map((food, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
            >
              <div>
                <div className="font-medium">{food.name}</div>
                <div className="text-sm text-gray-600">
                  {food.serving} • {food.calories} kalori
                </div>
              </div>
              <button
                onClick={() => addFood(food)}
                className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition-colors"
              >
                Tambah
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">Cadangan Pemakanan</h3>
        <div className="space-y-3">
          <div className="p-3 bg-green-50 rounded-lg">
            <div className="font-medium text-green-800">
              Sarapan (400 kalori)
            </div>
            <div className="text-sm text-green-700">
              2 keping roti wholemeal + 1 biji telur + 1 gelas susu
            </div>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="font-medium text-blue-800">
              Makan Tengah Hari (600 kalori)
            </div>
            <div className="text-sm text-blue-700">
              Nasi + ayam bakar + sayur campur + buah
            </div>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <div className="font-medium text-purple-800">
              Makan Malam (500 kalori)
            </div>
            <div className="text-sm text-purple-700">
              Sup + ikan + sayur + sedikit nasi
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderWorkouts = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-4">Plan Senaman 30 Hari</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {workoutPlan.map((workout, index) => (
            <div
              key={workout.day}
              className={`p-4 rounded-lg border-2 transition-colors ${
                currentDay === workout.day
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold">Hari {workout.day}</div>
                {currentDay === workout.day && (
                  <div className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
                    Hari Ini
                  </div>
                )}
              </div>
              <div className="text-gray-800 font-medium">{workout.workout}</div>
              <div className="text-sm text-gray-600 mt-1">
                {workout.duration} • {workout.calories} kalori
              </div>
              <button
                className={`mt-3 w-full py-2 rounded-md font-medium transition-colors ${
                  currentDay === workout.day
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-300 text-gray-600"
                }`}
                disabled={currentDay !== workout.day}
              >
                {currentDay === workout.day ? "Mula Senaman" : "Locked"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">FitTracker</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                Progress: {Math.round((currentDay / 30) * 100)}%
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64">
            <nav className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="space-y-2">
                {(
                  [
                    { id: "dashboard", label: "Dashboard", icon: TrendingUp },
                    { id: "workouts", label: "Senaman", icon: Activity },
                    { id: "running", label: "Larian", icon: MapPin },
                    { id: "nutrition", label: "Pemakanan", icon: Utensils },
                  ] as const
                ).map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === id
                        ? "bg-blue-500 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {label}
                  </button>
                ))}
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "dashboard" && renderDashboard()}
            {activeTab === "workouts" && renderWorkouts()}
            {activeTab === "running" && renderRunning()}
            {activeTab === "nutrition" && renderNutrition()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FitnessApp;
