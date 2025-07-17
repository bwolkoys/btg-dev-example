"use client";
import { useState } from "react";
import AthleteForm from "./components/AthleteForm";
import VentureCapitalistForm from "./components/VentureCapitalistForm";
import EntrepreneurForm from "./components/EntrepreneurForm";
import PhilanthropicLeaderForm from "./components/PhilanthropicLeaderForm";
import CoachForm from "./components/CoachForm";

export default function Home() {
  const [currentStep, setCurrentStep] = useState("welcome");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    linkedinOrWebsite: "",
    inviteCode: "",
    userType: "",
    description: ""
  });
  const [profileData, setProfileData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    profilePhoto: null,
    isDiscoverable: false
  });
  const [athleteData, setAthleteData] = useState({
    roleType: "",
    sports: [],
    competitionLevel: "",
    currentGoals: [],
    connectionPreferences: [],
    platformExpectations: ""
  });
  const [investorData, setInvestorData] = useState({
    roleType: "",
    sectors: [],
    investmentStages: [],
    openToActivities: [],
    connectionInterests: [],
    platformGoals: ""
  });
  const [entrepreneurData, setEntrepreneurData] = useState({
    roleType: "",
    hasBusinessOrIdea: "",
    businessSectors: [],
    elevatorPitch: "",
    supportNeeds: [],
    platformGoals: ""
  });
  const [philanthropicData, setPhilanthropicData] = useState({
    roleType: "",
    organizationCauses: [],
    involvementMethods: [],
    connectionTargets: [],
    collaborationInterest: "",
    platformGoals: ""
  });
  const [coachData, setCoachData] = useState({
    roleType: "",
    coachingLevels: [],
    sports: [],
    interests: [],
    privateTrainingInterest: "",
    platformGoals: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked, files } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "file" ? files?.[0] || null : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    if (formData.userType === "athlete") {
      setCurrentStep("athlete-questionnaire");
    } else if (formData.userType === "venture-capitalist") {
      setCurrentStep("investor-questionnaire");
    } else if (formData.userType === "business-owner") {
      setCurrentStep("entrepreneur-questionnaire");
    } else if (formData.userType === "philanthropic-leader") {
      setCurrentStep("philanthropic-questionnaire");
    } else if (formData.userType === "coach") {
      setCurrentStep("coach-questionnaire");
    } else {
      setCurrentStep("profile");
    }
  };

  const handleAthleteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Athlete questionnaire submitted:", athleteData);
    setCurrentStep("profile");
  };

  const handleInvestorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Investor questionnaire submitted:", investorData);
    setCurrentStep("profile");
  };

  const handleEntrepreneurSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Entrepreneur questionnaire submitted:", entrepreneurData);
    setCurrentStep("profile");
  };

  const handlePhilanthropicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Philanthropic questionnaire submitted:", philanthropicData);
    setCurrentStep("profile");
  };

  const handleCoachSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Coach questionnaire submitted:", coachData);
    setCurrentStep("profile");
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (profileData.password !== profileData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log("Profile submitted:", { 
      ...formData, 
      ...profileData, 
      ...(formData.userType === "athlete" ? athleteData : {}),
      ...(formData.userType === "venture-capitalist" ? investorData : {}),
      ...(formData.userType === "business-owner" ? entrepreneurData : {}),
      ...(formData.userType === "philanthropic-leader" ? philanthropicData : {}),
      ...(formData.userType === "coach" ? coachData : {})
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {currentStep === "welcome" && (
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Welcome</h1>
        <button
          onClick={() => setCurrentStep("signup")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
        >
          Signup
        </button>
        </div>
      )}

      {currentStep === "signup" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Sign Up</h2>
              <button
                onClick={() => setCurrentStep("welcome")}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="linkedinOrWebsite" className="block text-sm font-medium text-gray-700 mb-1">
                  LinkedIn or Website (optional)
                </label>
                <input
                  type="url"
                  id="linkedinOrWebsite"
                  name="linkedinOrWebsite"
                  value={formData.linkedinOrWebsite}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="inviteCode" className="block text-sm font-medium text-gray-700 mb-1">
                  Invite Code
                </label>
                <input
                  type="text"
                  id="inviteCode"
                  name="inviteCode"
                  value={formData.inviteCode}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="userType" className="block text-sm font-medium text-gray-700 mb-1">
                  Which of the following best describes you? *
                </label>
                <select
                  id="userType"
                  name="userType"
                  value={formData.userType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select an option</option>
                  <option value="athlete">Athlete (current or former)</option>
                  <option value="venture-capitalist">Venture Capitalist / Investor</option>
                  <option value="business-owner">Business Owner</option>
                  <option value="philanthropic-leader">Philanthropic Leader / Nonprofit Executive</option>
                  <option value="coach">Coach / Trainer</option>
                </select>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Tell us a bit about who you are and what you'd like to achieve on this platform: *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition-colors duration-200"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {currentStep === "athlete-questionnaire" && (
        <AthleteForm
          athleteData={athleteData}
          setAthleteData={setAthleteData}
          onSubmit={handleAthleteSubmit}
        />
      )}

      {currentStep === "investor-questionnaire" && (
        <VentureCapitalistForm
          investorData={investorData}
          setInvestorData={setInvestorData}
          onSubmit={handleInvestorSubmit}
        />
      )}

      {currentStep === "entrepreneur-questionnaire" && (
        <EntrepreneurForm
          entrepreneurData={entrepreneurData}
          setEntrepreneurData={setEntrepreneurData}
          onSubmit={handleEntrepreneurSubmit}
        />
      )}

      {currentStep === "philanthropic-questionnaire" && (
        <PhilanthropicLeaderForm
          philanthropicData={philanthropicData}
          setPhilanthropicData={setPhilanthropicData}
          onSubmit={handlePhilanthropicSubmit}
        />
      )}

      {currentStep === "coach-questionnaire" && (
        <CoachForm
          coachData={coachData}
          setCoachData={setCoachData}
          onSubmit={handleCoachSubmit}
        />
      )}

      {currentStep === "profile" && (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Create Your Profile</h1>
            
            <form onSubmit={handleProfileSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Username *
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={profileData.username}
                  onChange={handleProfileInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password *
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={profileData.password}
                  onChange={handleProfileInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={profileData.confirmPassword}
                  onChange={handleProfileInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="profilePhoto" className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Profile Photo
                </label>
                <input
                  type="file"
                  id="profilePhoto"
                  name="profilePhoto"
                  accept="image/*"
                  onChange={handleProfileInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-700">Visibility Settings</p>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="isDiscoverable"
                      checked={profileData.isDiscoverable}
                      onChange={handleProfileInputChange}
                      className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">
                      Be discoverable (opt in to allow others to request connection)
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="isDiscoverable"
                      checked={!profileData.isDiscoverable}
                      onChange={(e) => setProfileData(prev => ({ ...prev, isDiscoverable: !e.target.checked }))}
                      className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">
                      Remain private (only visible in curated suggestions)
                    </span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition-colors duration-200"
              >
                Confirm Profile Details
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}