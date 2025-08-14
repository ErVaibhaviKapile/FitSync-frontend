import React, { useState, useEffect } from "react";
import ProfileSection from "../components/ProfileSection";
import { useNavigate } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { Menu, X } from "lucide-react";

const DashboardPage = () => {
  const navigate = useNavigate();

  // Track which tab is active, whether the mobile menu is open, user’s name, and their goal
  const [activeTab, setActiveTab] = useState("dashboard");
  const [menuOpen, setMenuOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [fitnessGoal, setFitnessGoal] = useState(localStorage.getItem("fitnessGoal") || "");

  // Load username from local storage when page first mounts
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    setUserName(storedName || "User");
  }, []);

  // Navigation handlers for logout and tab switching
  const handleLogout = () => navigate("/login");
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setMenuOpen(false); // close mobile menu after choosing
  };

  // A small reusable card component for showing meals and their items
  const MealCard = ({ title, items }) => (
    <div className="bg-gray-900 p-5 rounded-xl shadow border border-slate-700">
      <h3 className="text-xl font-semibold text-cyan-400 mb-4">{title}</h3>
      <ul className="space-y-2 text-slate-300 text-base">
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );

  // Sample weekly workout hours data for the bar chart
  const workoutData = [
    { day: "Mon", workout: 1.5 },
    { day: "Tue", workout: 1 },
    { day: "Wed", workout: 0.5 },
    { day: "Thu", workout: 2 },
    { day: "Fri", workout: 1.7 },
    { day: "Sat", workout: 1.2 },
    { day: "Sun", workout: 0 },
  ];

  // Calorie breakdown for pie chart
  const caloriesPieData = [
    { name: "Protein", value: 600 },
    { name: "Carbs", value: 1200 },
    { name: "Fats", value: 500 },
  ];
  const COLORS = ["#38bdf8", "#22c55e", "#f97316"];

  // Meal plan suggestions based on user’s fitness goal
  const getWeeklyDietPlan = () => {
    switch (fitnessGoal.toLowerCase()) {
      case "lose":
      case "weight loss":
        return [
          "🍳 Breakfast: Egg whites, oatmeal, berries",
          "🥗 Lunch: Grilled chicken, salad, quinoa",
          "🍎 Snack: Apple & almonds",
          "🥘 Dinner: Steamed fish, broccoli, sweet potato",
        ];
      case "gain":
      case "muscle gain":
        return [
          "🍳 Breakfast: Whole eggs, toast, banana",
          "🥗 Lunch: Beef steak, rice, avocado",
          "🥤 Snack: Peanut butter sandwich & shake",
          "🥘 Dinner: Chicken pasta, veggies, yogurt",
        ];
      default:
        return [
          "🍳 Breakfast: Balanced - eggs & toast",
          "🥗 Lunch: Chicken, rice, veggies",
          "🍎 Snack: Fruit & nuts",
          "🥘 Dinner: Fish or tofu, salad, potatoes",
        ];
    }
  };

  return (
    <div className="min-h-screen font-sans bg-gradient-to-tr from-slate-900 to-slate-800 text-white">

      {/* Top Navigation Bar — handles desktop and mobile menus */}
      <nav className="bg-white-900 text-white shadow px-6 py-4 sticky top-0 z-20">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-extrabold text-cyan-400">🏋️ FitSync</h1>
          <div className="hidden md:flex gap-2">
            {['dashboard', 'workout', 'meals', 'profile'].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`px-4 py-1 rounded-full transition font-medium ${
                  activeTab === tab ? 'bg-cyan-700 text-white' : 'text-cyan-300 hover:bg-cyan-800'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
            <button
              onClick={handleLogout}
              className="bg-rose-600 text-white px-4 py-1 rounded-full shadow hover:bg-rose-700"
            >
              Logout
            </button>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-cyan-300">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile dropdown menu */}
        <div
          className={`md:hidden flex flex-col gap-2 transition-all duration-300 ease-in-out overflow-hidden ${
            menuOpen ? "max-h-screen mt-3" : "max-h-0"
          }`}
        >
          {['dashboard', 'workout', 'meals', 'profile'].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`px-4 py-2 rounded transition font-medium text-left ${
                activeTab === tab ? 'bg-cyan-700 text-white' : 'text-cyan-300 hover:bg-cyan-800'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="bg-rose-600 text-white px-4 py-2 rounded shadow hover:bg-rose-700"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="p-6">

        {/* Dashboard Tab — shows charts and FAQ */}
        {activeTab === "dashboard" && (
          <>
            {/* Welcome message */}
            <section className="bg-slate-800 p-6 rounded-xl shadow mb-8">
              <h2 className="text-2xl font-bold text-cyan-500">Welcome, {userName}!</h2>
              <p className="text-gray-300 mt-2">Stay focused, stay fit. 🏃‍♂️</p>
            </section>

            {/* Workout and calorie breakdown charts */}
            <section className="grid gap-6 md:grid-cols-2 mb-8">
              <div className="bg-slate-700 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-cyan-400">Weekly Workouts</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={workoutData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="day" stroke="#cbd5e1" />
                    <YAxis stroke="#cbd5e1" />
                    <Tooltip contentStyle={{ backgroundColor: "#1e293b", color: "#fff" }} />
                    <Bar dataKey="workout" fill="#38bdf8" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-slate-700 p-6 rounded-2xl shadow">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">Calories Breakdown</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={caloriesPieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      outerRadius={80}
                      innerRadius={40}
                      cornerRadius={10}
                      dataKey="value"
                    >
                      {caloriesPieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                          stroke="#1e293b"
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: "#1e293b", color: "#fff" }} />
                    <Legend verticalAlign="bottom" iconType="circle" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </section>

            {/* FAQ Accordion Section */}
            <section className="bg-[#1e293b] p-6 rounded-xl shadow-md mb-12 w-full mt-8 text-white">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">❓ Frequently Asked Questions</h2>
              <div className="space-y-4">
                {[
                  { question: "How do I update my fitness goal?", answer: "Go to the Profile tab and enter your new goal, then save changes." },
                  { question: "Can I customize my workout plan?", answer: "Custom workout plans will be available in the upcoming version." },
                  { question: "How is my calorie breakdown calculated?", answer: "It’s based on your inputs and balanced macro guidelines." },
                  { question: "Is my data stored securely?", answer: "Yes, your data is saved locally on your device only." },
                ].map((item, idx) => (
                  <details
                    key={idx}
                    className="group bg-[#0f172a] p-4 rounded-lg hover:bg-[#1e293b] transition duration-200"
                  >
                    <summary className="font-semibold cursor-pointer text-cyan-300 group-open:text-cyan-200">
                      {item.question}
                    </summary>
                    <p className="mt-2 text-gray-300">{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          </>
        )}

        {/* Workout Tab — shows weekly workout plan cards */}
        {activeTab === "workout" && (
          <section className="bg-slate-800 p-6 rounded-xl shadow mb-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
              Weekly Workout Plan 💪
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[{ day: "Monday", emoji: "🏋️", title: "Upper Body", plan: "Bench Press, Pull-ups, Shoulder Press" },
                { day: "Tuesday", emoji: "🏃", title: "Cardio", plan: "Running (30 min), Jump Rope (15 min)" },
                { day: "Wednesday", emoji: "🦵", title: "Legs", plan: "Squats, Deadlifts, Lunges" },
                { day: "Thursday", emoji: "🧘", title: "Yoga", plan: "30 mins stretching & breathing" },
                { day: "Friday", emoji: "🔥", title: "HIIT", plan: "20-min HIIT + Cool down" },
                { day: "Weekend", emoji: "🚶", title: "Active Rest", plan: "Walking, light yoga or rest" }
              ].map((workout, idx) => (
                <div key={idx} className="bg-slate-700 p-5 rounded-xl shadow-md hover:scale-105 transition">
                  <h3 className="text-lg font-bold text-cyan-300 mb-1 flex items-center gap-2">
                    {workout.emoji} {workout.day}
                  </h3>
                  <p className="text-white font-medium">{workout.title}</p>
                  <p className="text-slate-300 text-sm mt-1">{workout.plan}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Meals Tab — uses MealCard component for pre/post workout and daily meals */}
        {activeTab === "meals" && (
          <section className="bg-slate-800 p-6 rounded-xl shadow mb-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6">Meals & Timings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MealCard title="Pre-Workout Meal" items={["🍌 Snack: Banana + Peanut Butter", "🥤 Drink: Black Coffee or Green Tea"]} />
              <MealCard title="Post-Workout Meal" items={["🥚 Protein: Whey shake + boiled eggs", "🍚 Carbs: Brown rice or sweet potato"]} />
              <MealCard title="Breakfast" items={["🍳 Egg whites", "🥣 Oatmeal", "🍓 Berries"]} />
              <MealCard title="Lunch" items={["🍗 Grilled chicken", "🥗 Salad", "🍚 Quinoa"]} />
              <MealCard title="Snack" items={["🍎 Apple", "🥜 Almonds"]} />
              <MealCard title="Dinner" items={["🐟 Steamed fish", "🥦 Broccoli", "🍠 Sweet potato"]} />
            </div>
          </section>
        )}

        {/* Profile Tab — shows profile editing section */}
        {activeTab === "profile" && <ProfileSection />}

        {/* Footer */}
        <footer className="text-center text-slate-400 text-sm mt-10">
          &copy; {new Date().getFullYear()} FitSync. All rights reserved.
        </footer>
      </main>
    </div>
  );
};

export default DashboardPage;
