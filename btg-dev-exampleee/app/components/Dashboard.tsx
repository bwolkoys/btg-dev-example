"use client";
import { useState } from "react";

interface DashboardProps {
  userProfile: {
    firstName: string;
    lastName: string;
    profilePhoto?: File | null;
    userType: string;
  };
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    linkedinOrWebsite: string;
    inviteCode: string;
    userType: string;
    description: string;
  };
  profileData: {
    username: string;
    password: string;
    confirmPassword: string;
    profilePhoto: File | null;
    isDiscoverable: boolean;
  };
  specificData: any;
}

export default function Dashboard({ userProfile, formData, profileData, specificData }: DashboardProps) {
  const [activeTab, setActiveTab] = useState("home");

  const examplePosts = [
    {
      id: 1,
      author: "Jake Smith",
      title: "CEO at TechCorp",
      timeAgo: "2h",
      content: "Excited to announce our new partnership with SportsTech Inc. Looking forward to revolutionizing athletic performance analytics!",
      likes: 42,
      comments: 8,
      shares: 3,
      profileImage: "/api/placeholder/40/40"
    },
    {
      id: 2,
      author: "Sarah Johnson",
      title: "Olympic Gold Medalist",
      timeAgo: "4h",
      content: "Just finished an incredible training session. Remember, champions are made in the off-season. What's driving your motivation today?",
      likes: 156,
      comments: 23,
      shares: 12,
      profileImage: "/api/placeholder/40/40"
    },
    {
      id: 3,
      author: "Mike Chen",
      title: "Venture Partner at Innovation Ventures",
      timeAgo: "6h",
      content: "Looking for promising startups in the sports tech space. If you're building something innovative, I'd love to connect and learn more about your vision.",
      likes: 89,
      comments: 15,
      shares: 7,
      profileImage: "/api/placeholder/40/40"
    }
  ];

  const navItems = [
    { id: "home", label: "Home", active: activeTab === "home" },
    { id: "network", label: "My Network", active: activeTab === "network" },
    { id: "messages", label: "Messages", active: activeTab === "messages" },
    { id: "notifications", label: "Notifications", active: activeTab === "notifications" },
    { id: "profile", label: "Profile", active: activeTab === "profile" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-600">Beyond The Game Network</h1>
            </div>

            {/* Navigation Items */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      item.active
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* User Profile Section */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {userProfile.firstName.charAt(0)}{userProfile.lastName.charAt(0)}
                  </span>
                </div>
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {userProfile.firstName} {userProfile.lastName}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {userProfile.userType.replace("-", " ")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors duration-200 ${
                  item.active
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {activeTab === "home" && (
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Welcome back, {userProfile.firstName}!
              </h2>
              <p className="text-gray-600">
                Connect with athletes, entrepreneurs, and industry leaders in your network.
              </p>
            </div>

            {/* Posts Feed */}
            <div className="space-y-4">
              {examplePosts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-sm p-6">
                  {/* Post Header */}
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 text-sm font-medium">
                        {post.author.split(" ").map(n => n.charAt(0)).join("")}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-gray-900">{post.author}</h3>
                      <p className="text-xs text-gray-500">{post.title}</p>
                      <p className="text-xs text-gray-400">{post.timeAgo}</p>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="mb-4">
                    <p className="text-gray-800 leading-relaxed">{post.content}</p>
                  </div>

                  {/* Post Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-6">
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors duration-200">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span className="text-sm">{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors duration-200">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span className="text-sm">{post.comments}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors duration-200">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                        </svg>
                        <span className="text-sm">{post.shares}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="space-y-6">
            {/* Basic Profile Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Profile Information</h2>
              
              {/* Personal Details */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <p className="mt-1 text-sm text-gray-900">{formData.firstName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <p className="mt-1 text-sm text-gray-900">{formData.lastName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 text-sm text-gray-900">{formData.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <p className="mt-1 text-sm text-gray-900">{profileData.username}</p>
                  </div>
                  {formData.linkedinOrWebsite && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">LinkedIn/Website</label>
                      <p className="mt-1 text-sm text-blue-600 hover:text-blue-800">
                        <a href={formData.linkedinOrWebsite} target="_blank" rel="noopener noreferrer">
                          {formData.linkedinOrWebsite}
                        </a>
                      </p>
                    </div>
                  )}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">User Type</label>
                    <p className="mt-1 text-sm text-gray-900 capitalize">
                      {formData.userType.replace("-", " ")}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <p className="mt-1 text-sm text-gray-900">{formData.description}</p>
                  </div>
                </div>
              </div>

              {/* Account Settings */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Account Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Profile Visibility</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {profileData.isDiscoverable ? "Discoverable (Public)" : "Private (Curated suggestions only)"}
                    </p>
                  </div>
                  {formData.inviteCode && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Invite Code Used</label>
                      <p className="mt-1 text-sm text-gray-900">{formData.inviteCode}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Type-Specific Information */}
              {specificData && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    {formData.userType === "athlete" && "Athletic Profile"}
                    {formData.userType === "venture-capitalist" && "Investment Profile"}
                    {formData.userType === "business-owner" && "Entrepreneurial Profile"}
                    {formData.userType === "philanthropic-leader" && "Philanthropic Profile"}
                    {formData.userType === "coach" && "Coaching Profile"}
                  </h3>
                  
                  {formData.userType === "athlete" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Role Type</label>
                        <p className="mt-1 text-sm text-gray-900">{specificData.roleType}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Competition Level</label>
                        <p className="mt-1 text-sm text-gray-900">{specificData.competitionLevel}</p>
                      </div>
                      {specificData.sports && specificData.sports.length > 0 && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Sports</label>
                          <p className="mt-1 text-sm text-gray-900">{specificData.sports.join(", ")}</p>
                        </div>
                      )}
                      {specificData.currentGoals && specificData.currentGoals.length > 0 && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Current Goals</label>
                          <p className="mt-1 text-sm text-gray-900">{specificData.currentGoals.join(", ")}</p>
                        </div>
                      )}
                      {specificData.connectionPreferences && specificData.connectionPreferences.length > 0 && (
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700">Connection Preferences</label>
                          <p className="mt-1 text-sm text-gray-900">{specificData.connectionPreferences.join(", ")}</p>
                        </div>
                      )}
                      {specificData.platformExpectations && (
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700">Platform Expectations</label>
                          <p className="mt-1 text-sm text-gray-900">{specificData.platformExpectations}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {formData.userType === "venture-capitalist" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Role Type</label>
                        <p className="mt-1 text-sm text-gray-900">{specificData.roleType}</p>
                      </div>
                      {specificData.sectors && specificData.sectors.length > 0 && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Investment Sectors</label>
                          <p className="mt-1 text-sm text-gray-900">{specificData.sectors.join(", ")}</p>
                        </div>
                      )}
                      {specificData.investmentStages && specificData.investmentStages.length > 0 && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Investment Stages</label>
                          <p className="mt-1 text-sm text-gray-900">{specificData.investmentStages.join(", ")}</p>
                        </div>
                      )}
                      {specificData.openToActivities && specificData.openToActivities.length > 0 && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Open to Activities</label>
                          <p className="mt-1 text-sm text-gray-900">{specificData.openToActivities.join(", ")}</p>
                        </div>
                      )}
                      {specificData.connectionInterests && specificData.connectionInterests.length > 0 && (
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700">Connection Interests</label>
                          <p className="mt-1 text-sm text-gray-900">{specificData.connectionInterests.join(", ")}</p>
                        </div>
                      )}
                      {specificData.platformGoals && (
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700">Platform Goals</label>
                          <p className="mt-1 text-sm text-gray-900">{specificData.platformGoals}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {formData.userType === "business-owner" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Role Type</label>
                        <p className="mt-1 text-sm text-gray-900">{specificData.roleType}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Has Business or Idea</label>
                        <p className="mt-1 text-sm text-gray-900">{specificData.hasBusinessOrIdea}</p>
                      </div>
                      {specificData.businessSectors && specificData.businessSectors.length > 0 && (
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700">Business Sectors</label>
                          <p className="mt-1 text-sm text-gray-900">{specificData.businessSectors.join(", ")}</p>
                        </div>
                      )}
                      {specificData.elevatorPitch && (
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700">Elevator Pitch</label>
                          <p className="mt-1 text-sm text-gray-900">{specificData.elevatorPitch}</p>
                        </div>
                      )}
                      {specificData.supportNeeds && specificData.supportNeeds.length > 0 && (
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700">Support Needs</label>
                          <p className="mt-1 text-sm text-gray-900">{specificData.supportNeeds.join(", ")}</p>
                        </div>
                      )}
                      {specificData.platformGoals && (
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700">Platform Goals</label>
                          <p className="mt-1 text-sm text-gray-900">{specificData.platformGoals}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {formData.userType === "philanthropic-leader" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Role Type</label>
                        <p className="mt-1 text-sm text-gray-900">{specificData.roleType}</p>
                      </div>
                      {specificData.organizationCauses && specificData.organizationCauses.length > 0 && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Organization Causes</label>
                          <p className="mt-1 text-sm text-gray-900">{specificData.organizationCauses.join(", ")}</p>
                        </div>
                      )}
                      {specificData.involvementMethods && specificData.involvementMethods.length > 0 && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Involvement Methods</label>
                          <p className="mt-1 text-sm text-gray-900">{specificData.involvementMethods.join(", ")}</p>
                        </div>
                      )}
                      {specificData.connectionTargets && specificData.connectionTargets.length > 0 && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Connection Targets</label>
                          <p className="mt-1 text-sm text-gray-900">{specificData.connectionTargets.join(", ")}</p>
                        </div>
                      )}
                      {specificData.collaborationInterest && (
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700">Collaboration Interest</label>
                          <p className="mt-1 text-sm text-gray-900">{specificData.collaborationInterest}</p>
                        </div>
                      )}
                      {specificData.platformGoals && (
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700">Platform Goals</label>
                          <p className="mt-1 text-sm text-gray-900">{specificData.platformGoals}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {formData.userType === "coach" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Role Type</label>
                        <p className="mt-1 text-sm text-gray-900">{specificData.roleType}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Private Training Interest</label>
                        <p className="mt-1 text-sm text-gray-900">{specificData.privateTrainingInterest}</p>
                      </div>
                      {specificData.coachingLevels && specificData.coachingLevels.length > 0 && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Coaching Levels</label>
                          <p className="mt-1 text-sm text-gray-900">{specificData.coachingLevels.join(", ")}</p>
                        </div>
                      )}
                      {specificData.sports && specificData.sports.length > 0 && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Sports</label>
                          <p className="mt-1 text-sm text-gray-900">{specificData.sports.join(", ")}</p>
                        </div>
                      )}
                      {specificData.interests && specificData.interests.length > 0 && (
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700">Interests</label>
                          <p className="mt-1 text-sm text-gray-900">{specificData.interests.join(", ")}</p>
                        </div>
                      )}
                      {specificData.platformGoals && (
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700">Platform Goals</label>
                          <p className="mt-1 text-sm text-gray-900">{specificData.platformGoals}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {(activeTab !== "home" && activeTab !== "profile") && (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 capitalize">
              {activeTab === "network" ? "My Network" : activeTab}
            </h2>
            <p className="text-gray-600">
              This section is coming soon. Stay tuned for updates!
            </p>
          </div>
        )}
      </main>
    </div>
  );
}