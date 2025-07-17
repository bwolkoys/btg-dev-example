"use client";
import { useState } from "react";

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
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Tell us about your athletic background</h1>
            
            <form onSubmit={handleAthleteSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
      )}

      {currentStep === "investor-questionnaire" && (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Tell us about your investment interests</h1>
            
            <form onSubmit={handleInvestorSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
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
      )}

      {currentStep === "entrepreneur-questionnaire" && (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Tell us about your business</h1>
            
            <form onSubmit={handleEntrepreneurSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
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
      )}

      {currentStep === "philanthropic-questionnaire" && (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Tell us about your philanthropic work</h1>
            
            <form onSubmit={handlePhilanthropicSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
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
      )}

      {currentStep === "coach-questionnaire" && (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Tell us about your coaching background</h1>
            
            <form onSubmit={handleCoachSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
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