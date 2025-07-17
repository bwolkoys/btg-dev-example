"use client";
import { useState } from "react";

interface PhilanthropicData {
  roleType: string;
  organizationCauses: string[];
  involvementMethods: string[];
  connectionTargets: string[];
  collaborationInterest: string;
  platformGoals: string;
}

interface PhilanthropicLeaderFormProps {
  philanthropicData: PhilanthropicData;
  setPhilanthropicData: React.Dispatch<React.SetStateAction<PhilanthropicData>>;
  onSubmit: (e: React.FormEvent) => void;
}

export default function PhilanthropicLeaderForm({ philanthropicData, setPhilanthropicData, onSubmit }: PhilanthropicLeaderFormProps) {
  const handlePhilanthropicInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setPhilanthropicData(prev => ({
        ...prev,
        [name]: checked 
          ? [...prev[name as keyof typeof prev] as string[], value]
          : (prev[name as keyof typeof prev] as string[]).filter(item => item !== value)
      }));
    } else {
      setPhilanthropicData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Tell us about your philanthropic work</h1>
        
        <form onSubmit={onSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
          <div>
            <label htmlFor="philanthropicRoleType" className="block text-sm font-medium text-gray-700 mb-1">
              Primary Role Type: *
            </label>
            <select
              id="philanthropicRoleType"
              name="roleType"
              value={philanthropicData.roleType}
              onChange={handlePhilanthropicInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select role type</option>
              <option value="Executive">Executive</option>
              <option value="Program Lead">Program Lead</option>
              <option value="Founder">Founder</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              What causes does your organization focus on? *
            </label>
            <div className="space-y-2">
              {[
                { name: "Youth Empowerment", description: "Leadership development, access to opportunity, mentorship programs" },
                { name: "Mental Health & Wellness", description: "Access to care, athlete mental health, community well-being" },
                { name: "Education & Financial Literacy", description: "School programs, scholarships, life skills, entrepreneurship training" },
                { name: "Sports Access & Equity", description: "Affordable leagues, equipment donations, inclusion initiatives" },
                { name: "Environment & Sustainability", description: "Climate action, green tech, eco-education, community cleanups" },
                { name: "Athlete Transition & Career Support", description: "Programs to support life after sports, skills development, reinvention" },
                { name: "Health & Physical Fitness", description: "Access to healthcare, fitness programs, nutrition, injury recovery" },
                { name: "Arts, Media & Creative Expression", description: "Storytelling, youth media, creative access, athlete-driven media" }
              ].map(cause => (
                <label key={cause.name} className="flex items-start">
                  <input
                    type="checkbox"
                    name="organizationCauses"
                    value={cause.name}
                    checked={philanthropicData.organizationCauses.includes(cause.name)}
                    onChange={handlePhilanthropicInputChange}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-800">{cause.name}</span>
                    <span className="text-xs text-gray-600">{cause.description}</span>
                  </div>
                </label>
              ))}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="organizationCauses"
                  value="Other"
                  checked={philanthropicData.organizationCauses.includes("Other")}
                  onChange={handlePhilanthropicInputChange}
                  className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">Other: </span>
                <input
                  type="text"
                  placeholder="Let us know if your cause isn't listed above"
                  className="ml-2 px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 flex-1"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              How can others get involved? *
            </label>
            <div className="space-y-2">
              {[
                "Fundraising / Donations",
                "Athlete Ambassadors",
                "Volunteer Opportunities",
                "Strategic Partnerships",
                "Board Membership"
              ].map(method => (
                <label key={method} className="flex items-center">
                  <input
                    type="checkbox"
                    name="involvementMethods"
                    value={method}
                    checked={philanthropicData.involvementMethods.includes(method)}
                    onChange={handlePhilanthropicInputChange}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">{method}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Who are you looking to connect with? *
            </label>
            <div className="space-y-2">
              {[
                "Athletes",
                "Athlete Managers / Agents",
                "Coaches / Trainers",
                "Investors",
                "Founders",
                "Brand Partners",
                "Advisors",
                "Other Philanthropic Leaders / Nonprofit Executives"
              ].map(target => (
                <label key={target} className="flex items-center">
                  <input
                    type="checkbox"
                    name="connectionTargets"
                    value={target}
                    checked={philanthropicData.connectionTargets.includes(target)}
                    onChange={handlePhilanthropicInputChange}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">{target}</span>
                </label>
              ))}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="connectionTargets"
                  value="Other"
                  checked={philanthropicData.connectionTargets.includes("Other")}
                  onChange={handlePhilanthropicInputChange}
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
            <label htmlFor="collaborationInterest" className="block text-sm font-medium text-gray-700 mb-1">
              Would you like to collaborate on campaigns, events, or media? *
            </label>
            <select
              id="collaborationInterest"
              name="collaborationInterest"
              value={philanthropicData.collaborationInterest}
              onChange={handlePhilanthropicInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select an option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div>
            <label htmlFor="philanthropicPlatformGoals" className="block text-sm font-medium text-gray-700 mb-1">
              What are you hoping to get out of this platform? *
            </label>
            <textarea
              id="philanthropicPlatformGoals"
              name="platformGoals"
              value={philanthropicData.platformGoals}
              onChange={handlePhilanthropicInputChange}
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