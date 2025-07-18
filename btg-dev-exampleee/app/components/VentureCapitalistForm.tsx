"use client";
import { useState } from "react";

interface InvestorData {
  roleType: string;
  sectors: string[];
  investmentStages: string[];
  openToActivities: string[];
  connectionInterests: string[];
  platformGoals: string;
}

interface VentureCapitalistFormProps {
  investorData: InvestorData;
  setInvestorData: React.Dispatch<React.SetStateAction<InvestorData>>;
  onSubmit: (e: React.FormEvent) => void;
}

export default function VentureCapitalistForm({ investorData, setInvestorData, onSubmit }: VentureCapitalistFormProps) {
  const handleInvestorInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setInvestorData(prev => ({
        ...prev,
        [name]: checked 
          ? [...prev[name as keyof typeof prev] as string[], value]
          : (prev[name as keyof typeof prev] as string[]).filter(item => item !== value)
      }));
    } else {
      setInvestorData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Tell us about your investment interests</h1>
        
        <form onSubmit={onSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
          <div>
            <label htmlFor="investorRoleType" className="block text-sm font-medium text-gray-700 mb-1">
              Primary Role Type: *
            </label>
            <select
              id="investorRoleType"
              name="roleType"
              value={investorData.roleType}
              onChange={handleInvestorInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select role type</option>
              <option value="Investor">Investor</option>
              <option value="VC">VC</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              What sectors are you interested in investing in? *
            </label>
            <div className="space-y-4">
              <div>
                <label className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    name="sectors"
                    value="Sports & Entertainment"
                    checked={investorData.sectors.includes("Sports & Entertainment")}
                    onChange={handleInvestorInputChange}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="font-medium text-gray-800">Sports & Entertainment</span>
                </label>
                <p className="text-xs text-gray-600 ml-7 mb-2">Athlete-led ventures, sports tech, media rights, teams, fan engagement platforms</p>
              </div>

              <div>
                <label className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    name="sectors"
                    value="Tech / SaaS"
                    checked={investorData.sectors.includes("Tech / SaaS")}
                    onChange={handleInvestorInputChange}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="font-medium text-gray-800">Tech / SaaS</span>
                </label>
                <p className="text-xs text-gray-600 ml-7 mb-2">B2B or B2C platforms, CRM tools, mobile apps, AI, data platforms</p>
              </div>

              <div>
                <label className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    name="sectors"
                    value="Real Estate & Property"
                    checked={investorData.sectors.includes("Real Estate & Property")}
                    onChange={handleInvestorInputChange}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="font-medium text-gray-800">Real Estate & Property</span>
                </label>
                <p className="text-xs text-gray-600 ml-7 mb-2">Short-term rentals, commercial/residential development, venue properties</p>
              </div>

              <div>
                <label className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    name="sectors"
                    value="Consumer Products & Lifestyle Brands"
                    checked={investorData.sectors.includes("Consumer Products & Lifestyle Brands")}
                    onChange={handleInvestorInputChange}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="font-medium text-gray-800">Consumer Products & Lifestyle Brands</span>
                </label>
                <p className="text-xs text-gray-600 ml-7 mb-2">Apparel, wellness goods, sports nutrition, personal products, DTC brands</p>
              </div>

              <div>
                <label className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    name="sectors"
                    value="Health & Wellness"
                    checked={investorData.sectors.includes("Health & Wellness")}
                    onChange={handleInvestorInputChange}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="font-medium text-gray-800">Health & Wellness</span>
                </label>
                <p className="text-xs text-gray-600 ml-7 mb-2">Fitness platforms, recovery tech, mental health services, performance tracking</p>
              </div>

              <div>
                <label className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    name="sectors"
                    value="Media & Content Creation"
                    checked={investorData.sectors.includes("Media & Content Creation")}
                    onChange={handleInvestorInputChange}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="font-medium text-gray-800">Media & Content Creation</span>
                </label>
                <p className="text-xs text-gray-600 ml-7 mb-2">Docuseries, production studios, athlete-owned media, creator platforms</p>
              </div>

              <div>
                <label className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    name="sectors"
                    value="Education & Career Development"
                    checked={investorData.sectors.includes("Education & Career Development")}
                    onChange={handleInvestorInputChange}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="font-medium text-gray-800">Education & Career Development</span>
                </label>
                <p className="text-xs text-gray-600 ml-7 mb-2">Financial literacy, athlete transition programs, upskilling tools</p>
              </div>

              <div>
                <label className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    name="sectors"
                    value="Philanthropic & Social Impact Ventures"
                    checked={investorData.sectors.includes("Philanthropic & Social Impact Ventures")}
                    onChange={handleInvestorInputChange}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="font-medium text-gray-800">Philanthropic & Social Impact Ventures</span>
                </label>
                <p className="text-xs text-gray-600 ml-7 mb-2">Nonprofits, cause-based startups, athlete foundations, ESG-aligned businesses</p>
              </div>

              <div>
                <label className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    name="sectors"
                    value="Legal, Finance & Advisory Services"
                    checked={investorData.sectors.includes("Legal, Finance & Advisory Services")}
                    onChange={handleInvestorInputChange}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="font-medium text-gray-800">Legal, Finance & Advisory Services</span>
                </label>
                <p className="text-xs text-gray-600 ml-7 mb-2">Tools or services that support founders, athletes, or nonprofits</p>
              </div>

              <div>
                <label className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    name="sectors"
                    value="Events & Experiences"
                    checked={investorData.sectors.includes("Events & Experiences")}
                    onChange={handleInvestorInputChange}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="font-medium text-gray-800">Events & Experiences</span>
                </label>
                <p className="text-xs text-gray-600 ml-7 mb-2">Live experiences, sports watch parties, retreats, destination events</p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              What stage(s) do you invest in? *
            </label>
            <div className="space-y-2">
              {["Pre-seed", "Seed", "Series A", "Growth / Expansion", "Late-stage / Private Equity"].map(stage => (
                <label key={stage} className="flex items-center">
                  <input
                    type="checkbox"
                    name="investmentStages"
                    value={stage}
                    checked={investorData.investmentStages.includes(stage)}
                    onChange={handleInvestorInputChange}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">{stage}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Are you open to... *
            </label>
            <div className="space-y-2">
              {[
                "Reviewing new business pitches",
                "Mentoring or advising athlete founders",
                "Donating to charitable initiatives",
                "Joining nonprofit boards",
                "Strategic partnerships"
              ].map(activity => (
                <label key={activity} className="flex items-center">
                  <input
                    type="checkbox"
                    name="openToActivities"
                    value={activity}
                    checked={investorData.openToActivities.includes(activity)}
                    onChange={handleInvestorInputChange}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">{activity}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Who are you most interested in connecting with? *
            </label>
            <div className="space-y-2">
              {["Athletes", "Founders", "Nonprofits", "Legal professionals", "Advisors / Consultants"].map(connection => (
                <label key={connection} className="flex items-center">
                  <input
                    type="checkbox"
                    name="connectionInterests"
                    value={connection}
                    checked={investorData.connectionInterests.includes(connection)}
                    onChange={handleInvestorInputChange}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">{connection}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="platformGoals" className="block text-sm font-medium text-gray-700 mb-1">
              What are you hoping to get out of this platform? *
            </label>
            <textarea
              id="platformGoals"
              name="platformGoals"
              value={investorData.platformGoals}
              onChange={handleInvestorInputChange}
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