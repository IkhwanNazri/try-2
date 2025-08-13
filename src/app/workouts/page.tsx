import { workoutPlan } from "../lib/data";

export default function WorkoutsPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-4">Plan Senaman 30 Hari</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {workoutPlan.map((workout) => (
            <div
              key={workout.day}
              className="p-4 rounded-lg border-2 border-gray-200 bg-gray-50"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold">Hari {workout.day}</div>
              </div>
              <div className="text-gray-800 font-medium">{workout.workout}</div>
              <div className="text-sm text-gray-600 mt-1">
                {workout.duration} • {workout.calories} kalori
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}


