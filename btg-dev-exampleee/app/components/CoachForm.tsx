"use client";
import { useState } from "react";

interface CoachData {
  roleType: string;
  coachingLevels: string[];
  sports: string[];
  interests: string[];
  privateTrainingInterest: string;
  platformGoals: string;
}

interface CoachFormProps {
  coachData: CoachData;
  setCoachData: React.Dispatch<React.SetStateAction<CoachData>>;
  onSubmit: (e: React.FormEvent) => void;
}

export default function CoachForm({ coachData, setCoachData, onSubmit }: CoachFormProps) {
  const handleCoachInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setCoachData(prev => ({
        ...prev,
        [name]: checked 
          ? [...prev[name as keyof typeof prev] as string[], value]
          : (prev[name as keyof typeof prev] as string[]).filter(item => item !== value)
      }));
    } else {
      setCoachData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Tell us about your coaching background</h1>
        
        <form onSubmit={onSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
          <div>
            <label htmlFor="coachRoleType" className="block text-sm font-medium text-gray-700 mb-1">
              Primary Role Type: *
            </label>
            <select
              id="coachRoleType"
              name="roleType"
              value={coachData.roleType}
              onChange={handleCoachInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select role type</option>
              <option value="Coach">Coach</option>
              <option value="Trainer">Trainer</option>
              <option value="Specialist">Specialist</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              What level(s) do you coach/train at? *
            </label>
            <div className="space-y-2">
              {[
                "Youth",
                "Collegiate", 
                "Professional",
                "Olympic / National",
                "Private / 1:1",
                "Team / Club / Franchise"
              ].map(level => (
                <label key={level} className="flex items-center">
                  <input
                    type="checkbox"
                    name="coachingLevels"
                    value={level}
                    checked={coachData.coachingLevels.includes(level)}
                    onChange={handleCoachInputChange}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">{level}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              What sports do you coach/train in? *
            </label>
            <div className="space-y-4">
              <div>
                <label className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    name="sports"
                    value="Team Ball Sports"
                    checked={coachData.sports.includes("Team Ball Sports")}
                    onChange={handleCoachInputChange}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="font-medium text-gray-800">Team Ball Sports</span>
                </label>
                <p className="text-xs text-gray-600 ml-7 mb-2">Soccer, Football, Basketball, Baseball/Softball, Hockey (Ice, Field, Roller), Rugby, Lacrosse, Handball, Water Polo, Cricket</p>
              </div>

              <div>
                <label className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    name="sports"
                    value="Track, Field & Endurance Sports"
                    checked={coachData.sports.includes("Track, Field & Endurance Sports")}
                    onChange={handleCoachInputChange}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="font-medium text-gray-800">Track, Field & Endurance Sports</span>
                </label>
                <p className="text-xs text-gray-600 ml-7 mb-2">Track & Field, Cross Country, Road Running/Marathons, Triathlon/Ironman, Swimming, Rowing/Crew, Cycling, Speed Skating, Nordic Skiing/Biathlon</p>
              </div>

              <div>
                <label className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    name="sports"
                    value="Combat & Strength Sports"
                    checked={coachData.sports.includes("Combat & Strength Sports")}
                    onChange={handleCoachInputChange}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="font-medium text-gray-800">Combat & Strength Sports</span>
                </label>
                <p className="text-xs text-gray-600 ml-7 mb-2">Wrestling, Boxing, MMA/UFC, Judo/Karate/Taekwondo, Powerlifting/Weightlifting, Bodybuilding, Fencing</p>
              </div>

              <div>
                <label className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    name="sports"
                    value="Precision & Racket Sports"
                    checked={coachData.sports.includes("Precision & Racket Sports")}
                    onChange={handleCoachInputChange}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="font-medium text-gray-800">Precision & Racket Sports</span>
                </label>
                <p className="text-xs text-gray-600 ml-7 mb-2">Tennis, Golf, Pickleball, Table Tennis, Badminton, Archery, Shooting Sports</p>
              </div>

              <div>
                <label className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    name="sports"
                    value="Extreme & Action Sports"
                    checked={coachData.sports.includes("Extreme & Action Sports")}
                    onChange={handleCoachInputChange}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="font-medium text-gray-800">Extreme & Action Sports</span>
                </label>
                <p className="text-xs text-gray-600 ml-7 mb-2">Skateboarding, BMX, Snowboarding, Skiing (Alpine/Freestyle), Surfing, Motocross, Rock Climbing</p>
              </div>

              <div>
                <label className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    name="sports"
                    value="Gymnastics & Artistic Sports"
                    checked={coachData.sports.includes("Gymnastics & Artistic Sports")}
                    onChange={handleCoachInputChange}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="font-medium text-gray-800">Gymnastics & Artistic Sports</span>
                </label>
                <p className="text-xs text-gray-600 ml-7 mb-2">Gymnastics, Cheerleading, Dance (Competitive), Figure Skating, Synchronized Swimming, Baton Twirling</p>
              </div>

              <div>
                <label className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    name="sports"
                    value="Adaptive & Paralympic Sports"
                    checked={coachData.sports.includes("Adaptive & Paralympic Sports")}
                    onChange={handleCoachInputChange}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="font-medium text-gray-800">Adaptive & Paralympic Sports</span>
                </label>
                <p className="text-xs text-gray-600 ml-7 mb-2">Wheelchair Basketball, Para Track & Field, Sitting Volleyball, Blind Soccer, Other</p>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="sports"
                  value="Other"
                  checked={coachData.sports.includes("Other")}
                  onChange={handleCoachInputChange}
                  className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">Other / Niche Sports: </span>
                <input
                  type="text"
                  placeholder="Please specify"
                  className="ml-2 px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              What are you interested in? *
            </label>
            <div className="space-y-2">
              {[
                "Collaborating with athlete foundations",
                "Finding sponsorships",
                "Coaching post-retirement athletes",
                "Hosting or attending training events",
                "Mentoring up-and-coming coaches"
              ].map(interest => (
                <label key={interest} className="flex items-center">
                  <input
                    type="checkbox"
                    name="interests"
                    value={interest}
                    checked={coachData.interests.includes(interest)}
                    onChange={handleCoachInputChange}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">{interest}</span>
                </label>
              ))}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="interests"
                  value="Other"
                  checked={coachData.interests.includes("Other")}
                  onChange={handleCoachInputChange}
                  className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">Other: </span>
                <input
                  type="text"
                  placeholder="Please specify"
                  className="ml-2 px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="privateTrainingInterest" className="block text-sm font-medium text-gray-700 mb-1">
              Would you like to be featured for private training opportunities? *
            </label>
            <select
              id="privateTrainingInterest"
              name="privateTrainingInterest"
              value={coachData.privateTrainingInterest}
              onChange={handleCoachInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select an option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div>
            <label htmlFor="coachPlatformGoals" className="block text-sm font-medium text-gray-700 mb-1">
              What are you hoping to get out of this platform? *
            </label>
            <textarea
              id="coachPlatformGoals"
              name="platformGoals"
              value={coachData.platformGoals}
              onChange={handleCoachInputChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
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