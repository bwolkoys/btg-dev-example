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
  specificData: Record<string, any>;
}

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  title?: string;
  company?: string;
  userType?: string;
  profileImage?: string;
  notes?: string;
}

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

interface Chat {
  id: string;
  contactId: string;
  messages: Message[];
  lastMessage?: Message;
}

export default function Dashboard({ userProfile, formData, profileData, specificData }: DashboardProps) {
  const [activeTab, setActiveTab] = useState("home");
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 123-4567",
      title: "Olympic Gold Medalist",
      company: "Athletic Performance Institute",
      userType: "athlete",
      notes: "Met at sports tech conference. Interested in performance analytics.",
    },
    {
      id: "2",
      name: "Mike Chen",
      email: "mike.chen@ventures.com",
      phone: "+1 (555) 987-6543",
      title: "Venture Partner",
      company: "Innovation Ventures",
      userType: "venture-capitalist",
      notes: "Looking for sports tech startups. Potential investor.",
    },
    {
      id: "3",
      name: "Alex Rodriguez",
      email: "alex@techstartup.com",
      phone: "+1 (555) 456-7890",
      title: "CEO & Founder",
      company: "TechStartup Inc",
      userType: "business-owner",
      notes: "Building AI-powered coaching platform.",
    },
  ]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newContact, setNewContact] = useState<Partial<Contact>>({
    name: "",
    email: "",
    phone: "",
    title: "",
    company: "",
    notes: "",
  });

  // Chat-related state
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddContact = () => {
    if (newContact.name && newContact.email && newContact.phone) {
      const contact: Contact = {
        id: Date.now().toString(),
        name: newContact.name,
        email: newContact.email,
        phone: newContact.phone,
        title: newContact.title || "",
        company: newContact.company || "",
        notes: newContact.notes || "",
      };
      setContacts([...contacts, contact]);
      setNewContact({
        name: "",
        email: "",
        phone: "",
        title: "",
        company: "",
        notes: "",
      });
      setShowAddForm(false);
    }
  };

  const handleDeleteContact = (contactId: string) => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
    if (selectedContact && selectedContact.id === contactId) {
      setSelectedContact(null);
    }
  };

  const handleEmailContact = (email: string) => {
    window.open(`mailto:${email}`, '_blank');
  };

  const handleChatWithContact = (contact?: Contact) => {
    if (contact) {
      // Find existing chat or create new one
      let existingChat = chats.find(chat => chat.contactId === contact.id);
      
      if (!existingChat) {
        existingChat = {
          id: Date.now().toString(),
          contactId: contact.id,
          messages: [],
        };
        setChats(prev => [...prev, existingChat!]);
      }
      
      setActiveChat(existingChat);
    }
    setActiveTab("messages");
  };

  const handleSendMessage = () => {
    if (!activeChat || !newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: "current-user", // In a real app, this would be the actual user ID
      receiverId: activeChat.contactId,
      content: newMessage.trim(),
      timestamp: new Date(),
      isRead: false,
    };

    setChats(prev => prev.map(chat => {
      if (chat.id === activeChat.id) {
        const updatedMessages = [...chat.messages, message];
        return {
          ...chat,
          messages: updatedMessages,
          lastMessage: message,
        };
      }
      return chat;
    }));

    setActiveChat(prev => prev ? {
      ...prev,
      messages: [...prev.messages, message],
      lastMessage: message,
    } : null);

    setNewMessage("");
  };

  const getContactById = (contactId: string) => {
    return contacts.find(contact => contact.id === contactId);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedChats = chats
    .map(chat => ({
      ...chat,
      contact: getContactById(chat.contactId)
    }))
    .filter(chat => chat.contact)
    .sort((a, b) => {
      const aTime = a.lastMessage?.timestamp.getTime() || 0;
      const bTime = b.lastMessage?.timestamp.getTime() || 0;
      return bTime - aTime;
    });

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
    { id: "contacts", label: "My Contacts", active: activeTab === "contacts" },
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
                  {/* <div className="flex items-center justify-between pt-4 border-t border-gray-100">
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
                  </div> */}
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

        {activeTab === "contacts" && (
          <div className="space-y-6">
            {/* Header with Add Contact Button */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-900">My Contacts</h2>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Add Contact</span>
              </button>
            </div>

            {/* Contacts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {contacts.map((contact) => (
                <div key={contact.id} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-lg font-medium">
                          {contact.name.split(" ").map(n => n.charAt(0)).join("")}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{contact.name}</h3>
                        {contact.title && (
                          <p className="text-sm text-gray-600">{contact.title}</p>
                        )}
                        {contact.company && (
                          <p className="text-xs text-gray-500">{contact.company}</p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteContact(contact.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      title="Delete contact"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>{contact.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>{contact.phone}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedContact(contact)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleEmailContact(contact.email)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                      title="Send Email"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleChatWithContact(contact)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                      title="Chat"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {contacts.length === 0 && (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts yet</h3>
                <p className="text-gray-600 mb-4">Start building your network by adding your first contact.</p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Add Your First Contact
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === "messages" && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="flex h-[600px]">
              {/* Chat List Sidebar */}
              <div className="w-1/3 border-r border-gray-200 flex flex-col">
                {/* Search Bar */}
                <div className="p-4 border-b border-gray-200">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search contacts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    />
                    <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>

                {/* Chat List */}
                <div className="flex-1 overflow-y-auto">
                  {/* Existing Chats */}
                  {sortedChats.length > 0 && (
                    <div>
                      <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide bg-gray-50">
                        Recent Chats
                      </div>
                      {sortedChats.map((chat) => (
                        <button
                          key={chat.id}
                          onClick={() => setActiveChat(chat)}
                          className={`w-full text-left p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                            activeChat?.id === chat.id ? 'bg-blue-50 border-blue-200' : ''
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-sm font-medium">
                                {chat.contact?.name.split(" ").map(n => n.charAt(0)).join("")}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">{chat.contact?.name}</p>
                              {chat.lastMessage && (
                                <p className="text-xs text-gray-500 truncate">
                                  {chat.lastMessage.content}
                                </p>
                              )}
                            </div>
                            {chat.lastMessage && (
                              <div className="text-xs text-gray-400">
                                {chat.lastMessage.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                              </div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Available Contacts */}
                  <div>
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide bg-gray-50">
                      {sortedChats.length > 0 ? 'All Contacts' : 'Start a Conversation'}
                    </div>
                    {filteredContacts.map((contact) => (
                      <button
                        key={contact.id}
                        onClick={() => handleChatWithContact(contact)}
                        className="w-full text-left p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-medium">
                              {contact.name.split(" ").map(n => n.charAt(0)).join("")}
                            </span>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{contact.name}</p>
                            <p className="text-xs text-gray-500">{contact.title || contact.email}</p>
                          </div>
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                        </div>
                      </button>
                    ))}
                  </div>

                  {filteredContacts.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                      <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <p className="text-sm">No contacts found</p>
                      <p className="text-xs mt-1">Add some contacts to start chatting</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Chat Area */}
              <div className="flex-1 flex flex-col">
                {activeChat ? (
                  <>
                    {/* Chat Header */}
                    <div className="p-4 border-b border-gray-200 bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            {getContactById(activeChat.contactId)?.name.split(" ").map(n => n.charAt(0)).join("")}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {getContactById(activeChat.contactId)?.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {getContactById(activeChat.contactId)?.title || "Contact"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {activeChat.messages.length === 0 ? (
                        <div className="text-center text-gray-500 mt-8">
                          <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          <p>No messages yet</p>
                          <p className="text-sm mt-1">Send a message to start the conversation</p>
                        </div>
                      ) : (
                        activeChat.messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.senderId === "current-user" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                message.senderId === "current-user"
                                  ? "bg-blue-600 text-white"
                                  : "bg-gray-200 text-gray-900"
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                              <p className={`text-xs mt-1 ${
                                message.senderId === "current-user" ? "text-blue-100" : "text-gray-500"
                              }`}>
                                {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                              </p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Message Input */}
                    <div className="p-4 border-t border-gray-200">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          placeholder="Type a message..."
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                        />
                        <button
                          onClick={handleSendMessage}
                          disabled={!newMessage.trim()}
                          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md transition-colors duration-200"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                      <p className="text-gray-600">Choose from your existing conversations or start a new one</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Notifications</h2>
            <p className="text-gray-600">
              This section is coming soon. Stay tuned for updates!
            </p>
          </div>
        )}
      </main>

      {/* Add Contact Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Add New Contact</h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleAddContact(); }} className="space-y-4">
              <div>
                <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  id="contactName"
                  value={newContact.name || ""}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  id="contactEmail"
                  value={newContact.email || ""}
                  onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone *
                </label>
                <input
                  type="tel"
                  id="contactPhone"
                  value={newContact.phone || ""}
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="contactTitle" className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  id="contactTitle"
                  value={newContact.title || ""}
                  onChange={(e) => setNewContact({ ...newContact, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="contactCompany" className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  id="contactCompany"
                  value={newContact.company || ""}
                  onChange={(e) => setNewContact({ ...newContact, company: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="contactNotes" className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  id="contactNotes"
                  value={newContact.notes || ""}
                  onChange={(e) => setNewContact({ ...newContact, notes: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                />
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                >
                  Add Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Contact Details Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Contact Details</h3>
              <button
                onClick={() => setSelectedContact(null)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              {/* Contact Header */}
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl font-medium">
                    {selectedContact.name.split(" ").map(n => n.charAt(0)).join("")}
                  </span>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900">{selectedContact.name}</h4>
                  {selectedContact.title && (
                    <p className="text-gray-600">{selectedContact.title}</p>
                  )}
                  {selectedContact.company && (
                    <p className="text-gray-500">{selectedContact.company}</p>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-900">{selectedContact.email}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-gray-900">{selectedContact.phone}</span>
                  </div>
                </div>

                {selectedContact.notes && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-md">{selectedContact.notes}</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={() => handleEmailContact(selectedContact.email)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Send Email</span>
                </button>
                <button
                  onClick={() => {
                    handleChatWithContact(selectedContact);
                    setSelectedContact(null);
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>Chat</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}