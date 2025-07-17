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
    roleType: [],
    sports: [],
    competitionLevel: "",
    currentGoals: [],
    connectionPreferences: [],
    platformExpectations: ""
  });
  const [investorData, setInvestorData] = useState({
    sectors: [],
    investmentStages: [],
    openToActivities: [],
    connectionInterests: [],
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    if (formData.userType === "athlete") {
      setCurrentStep("athlete-questionnaire");
    } else if (formData.userType === "venture-capitalist") {
      setCurrentStep("investor-questionnaire");
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
      ...(formData.userType === "venture-capitalist" ? investorData : {})
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
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Primary Role Type: *
                </label>
                <div className="space-y-2">
                  {["Current", "Former", "Both"].map(role => (
                    <label key={role} className="flex items-center">
                      <input
                        type="checkbox"
                        name="roleType"
                        value={role}
                        checked={athleteData.roleType.includes(role)}
                        onChange={handleAthleteInputChange}
                        className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">{role}</span>
                    </label>
                  ))}
                </div>
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