// src/components/RunningTracker.tsx
"use client";

import { useState, useEffect } from "react";
import { Play, Pause, Square, MapPin } from "lucide-react";
import { RunningData } from "../types";

interface RunningTrackerProps {
  onDataUpdate?: (data: RunningData) => void;
}

export default function RunningTracker({ onDataUpdate }: RunningTrackerProps) {
  const [runningData, setRunningData] = useState<RunningData>({
    isRunning: false,
    distance: 0,
    time: 0,
    pace: 0,
    calories: 0,
  });

  // Timer untuk running
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (runningData.isRunning) {
      interval = setInterval(() => {
        setRunningData((prev) => {
          const newTime = prev.time + 1;
          const newDistance = prev.distance + (Math.random() * 2 + 1); // simulate GPS movement
          const newPace =
            newTime > 0 && newDistance > 0
              ? newTime / 60 / (newDistance / 1000)
              : 0;
          const newCalories = Math.floor(newDistance * 0.0007 * 70); // rough calculation

          const updatedData = {
            ...prev,
            time: newTime,
            distance: newDistance,
            pace: newPace,
            calories: newCalories,
          };

          // Call callback if provided
          if (onDataUpdate) {
            onDataUpdate(updatedData);
          }

          return updatedData;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [runningData.isRunning, onDataUpdate]);

  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hrs > 0) {
      return `${hrs.toString().padStart(2, "0")}:${mins
        .toString()
        .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const formatDistance = (meters: number): string => {
    return (meters / 1000).toFixed(2);
  };

  const formatPace = (pace: number): string => {
    if (pace === 0 || !isFinite(pace)) return "0:00";

    const minutes = Math.floor(pace);
    const seconds = Math.floor((pace - minutes) * 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const toggleRunning = () => {
    setRunningData((prev) => ({
      ...prev,
      isRunning: !prev.isRunning,
    }));
  };

  const resetRunning = () => {
    const resetData: RunningData = {
      isRunning: false,
      distance: 0,
      time: 0,
      pace: 0,
      calories: 0,
    };

    setRunningData(resetData);

    if (onDataUpdate) {
      onDataUpdate(resetData);
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Stats Display */}
      <div className="bg-gradient-to-br from-green-500 to-blue-600 text-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Tracker Larian</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">
              {formatDistance(runningData.distance)}
            </div>
            <div className="text-sm opacity-90">KILOMETER</div>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold mb-1">
              {formatTime(runningData.time)}
            </div>
            <div className="text-sm opacity-90">MASA</div>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold mb-1">
              {formatPace(runningData.pace)}
            </div>
            <div className="text-sm opacity-90">PACE /KM</div>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold mb-1">
              {runningData.calories}
            </div>
            <div className="text-sm opacity-90">KALORI</div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={toggleRunning}
            className={`flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 ${
              runningData.isRunning
                ? "bg-red-500 hover:bg-red-600 shadow-lg"
                : "bg-white text-green-600 hover:bg-gray-100 shadow-lg"
            }`}
          >
            {runningData.isRunning ? (
              <>
                <Pause className="w-6 h-6" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-6 h-6" />
                {runningData.time > 0 ? "Resume" : "Mula"}
              </>
            )}
          </button>

          <button
            onClick={resetRunning}
            disabled={runningData.time === 0}
            className="flex items-center gap-2 px-8 py-4 bg-gray-600 text-white rounded-full font-semibold text-lg hover:bg-gray-700 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <Square className="w-6 h-6" />
            Reset
          </button>
        </div>

        {/* Running Status */}
        <div className="text-center mt-4">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
              runningData.isRunning
                ? "bg-green-500 text-white"
                : "bg-white/20 text-white"
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                runningData.isRunning ? "bg-white animate-pulse" : "bg-gray-300"
              }`}
            />
            {runningData.isRunning ? "Sedang Berlari" : "Berhenti"}
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-500" />
          Lokasi & Route
        </h3>

        <div className="bg-gradient-to-br from-blue-50 to-green-50 h-64 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-200">
          <div className="text-center text-gray-600">
            <MapPin className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <div className="font-medium text-lg mb-2">
              Peta Akan Dipaparkan Di Sini
            </div>
            <div className="text-sm text-gray-500 max-w-sm mx-auto">
              Aplikasi akan menggunakan GPS untuk track lokasi semasa dan route
              yang dilalui
            </div>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors">
              Enable Location
            </button>
          </div>
        </div>
      </div>

      {/* Recent Runs */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">Rekod Larian Terkini</h3>
        <div className="text-center text-gray-500 py-8">
          <div className="text-sm">Belum ada rekod larian.</div>
          <div className="text-sm">Mulakan larian pertama awak!</div>
        </div>
      </div>
    </div>
  );
}
