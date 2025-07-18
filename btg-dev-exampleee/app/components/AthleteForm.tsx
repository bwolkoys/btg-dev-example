"use client";
import { useState } from "react";

interface AthleteData {
  roleType: string;
  sports: string[];
  competitionLevel: string;
  currentGoals: string[];
  connectionPreferences: string[];
  platformExpectations: string;
}

interface AthleteFormProps {
  athleteData: AthleteData;
  setAthleteData: React.Dispatch<React.SetStateAction<AthleteData>>;
  onSubmit: (e: React.FormEvent) => void;
}

export default function AthleteForm({ athleteData, setAthleteData, onSubmit }: AthleteFormProps) {
  const handleAthleteInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setAthleteData(prev => ({
        ...prev,
        [name]: checked 
          ? [...prev[name as keyof typeof prev] as string[], value]
          : (prev[name as keyof typeof prev] as string[]).filter(item => item !== value)
      }));
    } else {
      setAthleteData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Tell us about your athletic background</h1>
        
        <form onSubmit={onSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
          <div>
            <label htmlFor="athleteRoleType" className="block text-sm font-medium text-gray-700 mb-1">
              Primary Role Type: *
            </label>
            <select
              id="athleteRoleType"
              name="roleType"
              value={athleteData.roleType}
              onChange={handleAthleteInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select role type</option>
              <option value="Current">Current</option>
              <option value="Former">Former</option>
              <option value="Both">Both</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              What sport(s) did you play? *
            </label>
            <div className="space-y-4">
              <div>
                <label className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    name="sports"
                    value="Team Ball Sports"
                    checked={athleteData.sports.includes("Team Ball Sports")}
                    onChange={handleAthleteInputChange}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="font-medium text-gray-800">Team Ball Sports</span>
                </label>
                <p className="text-xs text-gray-600 ml-7 mb-2">Soccer, Football, Basketball, Baseball/Softball, Hockey, Rugby, Lacrosse, Handball, Water Polo, Cricket</p>
              </div>

              <div>
                <label className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    name="sports"
                    value="Track, Field & Endurance Sport"
                    checked={athleteData.sports.includes("Track, Field & Endurance Sport")}
                    onChange={handleAthleteInputChange}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="font-medium text-gray-800">Track, Field & Endurance Sport</span>
                </label>
                <p className="text-xs text-gray-600 ml-7 mb-2">Track & Field, Cross Country, Marathon Running, Triathlon, Swimming, Rowing, Cycling, Speed Skating, Nordic Skiing</p>
              </div>

              <div>
                <label className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    name="sports"
                    value="Combat & Strength Sports"
                    checked={athleteData.sports.includes("Combat & Strength Sports")}
                    onChange={handleAthleteInputChange}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="font-medium text-gray-800">Combat & Strength Sports</span>
                </label>
                <p className="text-xs text-gray-600 ml-7 mb-2">Wrestling, Boxing, MMA/UFC, Martial Arts (Judo, Karate, Taekwondo), Powerlifting, Weightlifting, Bodybuilding, Fencing</p>
              </div>

              <div>
                <label className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    name="sports"
                    value="Precision & Racket Sports"
                    checked={athleteData.sports.includes("Precision & Racket Sports")}
                    onChange={handleAthleteInputChange}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="font-medium text-gray-800">Precision & Racket Sports</span>
                </label>
                <p className="text-xs text-gray-600 ml-7 mb-2">Tennis, Golf, Pickleball, Table Tennis, Badminton, Squash, Archery, Shooting Sports</p>
              </div>

              <div>
                <label className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    name="sports"
                    value="Extreme & Action Sports"
                    checked={athleteData.sports.includes("Extreme & Action Sports")}
                    onChange={handleAthleteInputChange}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="font-medium text-gray-800">Extreme & Action Sports</span>
                </label>
                <p className="text-xs text-gray-600 ml-7 mb-2">Skateboarding, BMX, Snowboarding, Alpine/Freestyle Skiing, Surfing, Motocross, Rock Climbing, Parkour</p>
              </div>

              <div>
                <label className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    name="sports"
                    value="Gymnastics & Artistic Sports"
                    checked={athleteData.sports.includes("Gymnastics & Artistic Sports")}
                    onChange={handleAthleteInputChange}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="font-medium text-gray-800">Gymnastics & Artistic Sports</span>
                </label>
                <p className="text-xs text-gray-600 ml-7 mb-2">Gymnastics, Cheerleading, Competitive Dance, Figure Skating, Synchronized Swimming, Baton Twirling, Acrobatics</p>
              </div>

              <div>
                <label className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    name="sports"
                    value="Adaptive & Paralympic Sports"
                    checked={athleteData.sports.includes("Adaptive & Paralympic Sports")}
                    onChange={handleAthleteInputChange}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="font-medium text-gray-800">Adaptive & Paralympic Sports</span>
                </label>
                <p className="text-xs text-gray-600 ml-7 mb-2">Wheelchair Basketball, Para Track & Field, Sitting Volleyball, Blind Soccer, Paralympic Swimming, Adaptive Skiing</p>
              </div>

              <div>
                <label className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    name="sports"
                    value="Other / Niche Sports"
                    checked={athleteData.sports.includes("Other / Niche Sports")}
                    onChange={handleAthleteInputChange}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="font-medium text-gray-800">Other / Niche Sports</span>
                </label>
                <p className="text-xs text-gray-600 ml-7 mb-2">Equestrian, Sailing, Bowling, Billiards, Darts, Chess, Esports, Ultimate Frisbee, Disc Golf</p>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="competitionLevel" className="block text-sm font-medium text-gray-700 mb-1">
              What level did you compete at? *
            </label>
            <select
              id="competitionLevel"
              name="competitionLevel"
              value={athleteData.competitionLevel}
              onChange={handleAthleteInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select competition level</option>
              <option value="High School">High School</option>
              <option value="Collegiate">Collegiate</option>
              <option value="Professional">Professional</option>
              <option value="Olympic / National Team">Olympic / National Team</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              What are your current goals? *
            </label>
            <div className="space-y-2">
              {["Launch or grow a business", "Explore investment opportunities", "Support or partner with charities", "Join a nonprofit board", "Mentor younger athletes", "Career transition resources", "Learn from other athletes' post-career experiences"].map(goal => (
                <label key={goal} className="flex items-center">
                  <input
                    type="checkbox"
                    name="currentGoals"
                    value={goal}
                    checked={athleteData.currentGoals.includes(goal)}
                    onChange={handleAthleteInputChange}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">{goal}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Who would you like to connect with? *
            </label>
            <div className="space-y-2">
              {["Founders / Entrepreneurs", "Investors / VCs", "Charities / Philanthropic organizations", "Athlete managers / Agents", "Legal or financial advisors", "Media / Brand consultants"].map(connection => (
                <label key={connection} className="flex items-center">
                  <input
                    type="checkbox"
                    name="connectionPreferences"
                    value={connection}
                    checked={athleteData.connectionPreferences.includes(connection)}
                    onChange={handleAthleteInputChange}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">{connection}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="platformExpectations" className="block text-sm font-medium text-gray-700 mb-1">
              What are you hoping to get out of this platform? *
            </label>
            <textarea
              id="platformExpectations"
              name="platformExpectations"
              value={athleteData.platformExpectations}
              onChange={handleAthleteInputChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition-colors duration-200"
          >
            Continue to Profile Setup
          </button>
        </form>
      </div>
    </div>
  );
}