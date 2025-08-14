// src/components/ProfileSection.jsx
import React, { useState } from "react";

const ProfileSection = () => {
  // Form state for each profile field
  const [name, setName] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [fitnessGoal, setFitnessGoal] = useState("");
  const [medical, setMedical] = useState("");

  // Handles profile form submission
  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    // Ensure user is logged in before saving
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("You must be logged in to save your profile.");
      return;
    }

    // Prepare payload for backend
    const formData = {
      userId,           // ✅ Backend expects this for linking profile to user
      name,
      height,
      weight,
      goal: fitnessGoal, // ✅ Matches backend's expected field name
      notes: medical     // ✅ Matches backend's expected field name
    };

    try {
      // Send profile data to backend
      const response = await fetch("http://localhost:5000/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      // Success → alert + clear form
      if (response.ok) {
        alert("Profile saved!");
        setName("");
        setHeight("");
        setWeight("");
        setFitnessGoal("");
        setMedical("");
      } 
      // Server returned an error message
      else {
        alert(data.message || "Failed to save profile.");
      }
    } catch (error) {
      // Network or unexpected errors
      console.error("Error saving profile:", error);
      alert("Server error");
    }
  };

  return (
    // Profile card container
    <section className="bg-slate-800 p-6 rounded-xl shadow mb-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-cyan-400 mb-4">Your Profile</h2>
      
      {/* Profile form */}
      <form onSubmit={handleProfileSubmit} className="space-y-4">
        {/* Name */}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 bg-slate-700 border border-slate-500 rounded text-white"
          required
        />

        {/* Height */}
        <input
          type="number"
          placeholder="Height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="w-full p-2 bg-slate-700 border border-slate-500 rounded text-white"
          required
        />

        {/* Weight */}
        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="w-full p-2 bg-slate-700 border border-slate-500 rounded text-white"
          required
        />

        {/* Fitness Goal */}
        <input
          type="text"
          placeholder="Fitness Goal"
          value={fitnessGoal}
          onChange={(e) => setFitnessGoal(e.target.value)}
          className="w-full p-2 bg-slate-700 border border-slate-500 rounded text-white"
          required
        />

        {/* Medical Conditions */}
        <textarea
          placeholder="Medical Conditions"
          value={medical}
          onChange={(e) => setMedical(e.target.value)}
          className="w-full p-2 bg-slate-700 border border-slate-500 rounded text-white"
        />

        {/* Save Button */}
        <button
          type="submit"
          className="bg-cyan-600 text-white px-4 py-2 rounded shadow hover:bg-cyan-700"
        >
          Save
        </button>
      </form>
    </section>
  );
};

export default ProfileSection;
