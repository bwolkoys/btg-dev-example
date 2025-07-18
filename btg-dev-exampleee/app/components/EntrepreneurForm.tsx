"use client";
import { useState } from "react";

interface EntrepreneurData {
  roleType: string;
  hasBusinessOrIdea: string;
  businessSectors: string[];
  elevatorPitch: string;
  supportNeeds: string[];
  platformGoals: string;
}

interface EntrepreneurFormProps {
  entrepreneurData: EntrepreneurData;
  setEntrepreneurData: React.Dispatch<React.SetStateAction<EntrepreneurData>>;
  onSubmit: (e: React.FormEvent) => void;
}

export default function EntrepreneurForm({ entrepreneurData, setEntrepreneurData, onSubmit }: EntrepreneurFormProps) {
  const handleEntrepreneurInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setEntrepreneurData(prev => ({
        ...prev,
        [name]: checked 
          ? [...prev[name as keyof typeof prev] as string[], value]
          : (prev[name as keyof typeof prev] as string[]).filter(item => item !== value)
      }));
    } else {
      setEntrepreneurData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Tell us about your business</h1>
        
        <form onSubmit={onSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
          <div>
            <label htmlFor="roleType" className="block text-sm font-medium text-gray-700 mb-1">
              Primary Role Type: *
            </label>
            <select
              id="roleType"
              name="roleType"
              value={entrepreneurData.roleType}
              onChange={handleEntrepreneurInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select role type</option>
              <option value="Current Owner">Current Owner</option>
              <option value="Early-Stage">Early-Stage</option>
            </select>
          </div>

          <div>
            <label htmlFor="hasBusinessOrIdea" className="block text-sm font-medium text-gray-700 mb-1">
              Do you currently have a company or business idea? *
            </label>
            <select
              id="hasBusinessOrIdea"
              name="hasBusinessOrIdea"
              value={entrepreneurData.hasBusinessOrIdea}
              onChange={handleEntrepreneurInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select an option</option>
              <option value="Yes – I have a business">Yes – I have a business</option>
              <option value="Yes – I have an idea">Yes – I have an idea</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              What sector is your business or idea in? *
            </label>
            <div className="space-y-2">
              {[
                "Sports & Entertainment",
                "Tech / SaaS", 
                "Real Estate & Property",
                "Consumer Products & Lifestyle Brands",
                "Health & Wellness",
                "Media & Content Creation",
                "Education & Career Development",
                "Philanthropic & Social Impact Ventures",
                "Legal, Finance & Advisory Services",
                "Events & Experiences"
              ].map(sector => (
                <label key={sector} className="flex items-center">
                  <input
                    type="checkbox"
                    name="businessSectors"
                    value={sector}
                    checked={entrepreneurData.businessSectors.includes(sector)}
                    onChange={handleEntrepreneurInputChange}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">{sector}</span>
                </label>
              ))}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="businessSectors"
                  value="Other"
                  checked={entrepreneurData.businessSectors.includes("Other")}
                  onChange={handleEntrepreneurInputChange}
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

          {entrepreneurData.hasBusinessOrIdea === "Yes – I have an idea" && (
            <div>
              <label htmlFor="elevatorPitch" className="block text-sm font-medium text-gray-700 mb-1">
                What is your 1–2 sentence elevator pitch? *
              </label>
              <textarea
                id="elevatorPitch"
                name="elevatorPitch"
                value={entrepreneurData.elevatorPitch}
                onChange={handleEntrepreneurInputChange}
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              What kind of support are you looking for? *
            </label>
            <div className="space-y-2">
              {[
                "Athlete Endorsements",
                "Social Media Promotion from Athletes",
                "Product Placement with Athletes", 
                "Athlete Brand Ambassadors",
                "Athlete Event Appearances",
                "Co-branded Campaigns with Athletes",
                "Testimonials or Reviews from Athletes",
                "Partnerships with Athlete-Run Foundations"
              ].map(support => (
                <label key={support} className="flex items-center">
                  <input
                    type="checkbox"
                    name="supportNeeds"
                    value={support}
                    checked={entrepreneurData.supportNeeds.includes(support)}
                    onChange={handleEntrepreneurInputChange}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">{support}</span>
                </label>
              ))}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="supportNeeds"
                  value="Other"
                  checked={entrepreneurData.supportNeeds.includes("Other")}
                  onChange={handleEntrepreneurInputChange}
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
            <label htmlFor="platformGoals" className="block text-sm font-medium text-gray-700 mb-1">
              What are you hoping to get out of this platform? *
            </label>
            <textarea
              id="platformGoals"
              name="platformGoals"
              value={entrepreneurData.platformGoals}
              onChange={handleEntrepreneurInputChange}
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