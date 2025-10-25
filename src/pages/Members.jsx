import React, { useState } from 'react';
import { Search, Plus, Eye, Edit, Trash2, X } from 'lucide-react';

// --- Mock Data ---
const membersData = [
  {
    initials: 'JS',
    name: 'Janith Shan',
    contactEmail: 'janithshan@gmail.com',
    contactPhone: '081-1123325',
    plan: 'Premium',
    status: 'Active',
    expiryDate: '2025-01-15',
  },
  {
    initials: 'BK',
    name: 'Bhathiya Kulathunga',
    contactEmail: 'bhathiya@gmail.com',
    contactPhone: '081-1123325',
    plan: 'Basic',
    status: 'Active',
    expiryDate: '2025-03-20',
  },
  {
    initials: 'MS',
    name: 'Mike Smith',
    contactEmail: 'mike.smith@gmail.com',
    contactPhone: '081-1123326',
    plan: 'VIP',
    status: 'Active',
    expiryDate: '2025-02-10',
  },
  {
    initials: 'SA',
    name: 'Sarah Anderson',
    contactEmail: 'sarah.anderson@gmail.com',
    contactPhone: '081-1123327',
    plan: 'Premium',
    status: 'Expiring Soon',
    expiryDate: '2025-10-15',
  },
  {
    initials: 'TJ',
    name: 'Tom Johnson',
    contactEmail: 'tom.johnson@gmail.com',
    contactPhone: '081-1123328',
    plan: 'Basic',
    status: 'Inactive',
    expiryDate: '2024-12-01',
  },
  {
    initials: 'EW',
    name: 'Emily Wilson',
    contactEmail: 'emily.wilson@gmail.com',
    contactPhone: '081-1123329',
    plan: 'VIP',
    status: 'Active',
    expiryDate: '2025-04-18',
  },
  {
    initials: 'RD',
    name: 'Robert Davis',
    contactEmail: 'robert.davis@gmail.com',
    contactPhone: '081-1123330',
    plan: 'Premium',
    status: 'Active',
    expiryDate: '2025-05-22',
  },
  {
    initials: 'LM',
    name: 'Lisa Martinez',
    contactEmail: 'lisa.martinez@gmail.com',
    contactPhone: '081-1123331',
    plan: 'Basic',
    status: 'Expiring Soon',
    expiryDate: '2025-11-05',
  },
  {
    initials: 'DJ',
    name: 'David Johnson',
    contactEmail: 'david.johnson@gmail.com',
    contactPhone: '081-1123332',
    plan: 'VIP',
    status: 'Active',
    expiryDate: '2025-03-14',
  },
  {
    initials: 'AB',
    name: 'Anna Brown',
    contactEmail: 'anna.brown@gmail.com',
    contactPhone: '081-1123333',
    plan: 'Premium',
    status: 'Active',
    expiryDate: '2025-06-30',
  },
  {
    initials: 'CW',
    name: 'Chris Wilson',
    contactEmail: 'chris.wilson@gmail.com',
    contactPhone: '081-1123334',
    plan: 'Basic',
    status: 'Inactive',
    expiryDate: '2024-11-20',
  },
  {
    initials: 'JL',
    name: 'Jennifer Lee',
    contactEmail: 'jennifer.lee@gmail.com',
    contactPhone: '081-1123335',
    plan: 'VIP',
    status: 'Active',
    expiryDate: '2025-07-12',
  },
  {
    initials: 'MT',
    name: 'Mark Thompson',
    contactEmail: 'mark.thompson@gmail.com',
    contactPhone: '081-1123336',
    plan: 'Premium',
    status: 'Expiring Soon',
    expiryDate: '2025-10-28',
  },
  {
    initials: 'KR',
    name: 'Karen Rodriguez',
    contactEmail: 'karen.rodriguez@gmail.com',
    contactPhone: '081-1123337',
    plan: 'Basic',
    status: 'Active',
    expiryDate: '2025-08-09',
  },
  {
    initials: 'PG',
    name: 'Paul Garcia',
    contactEmail: 'paul.garcia@gmail.com',
    contactPhone: '081-1123338',
    plan: 'VIP',
    status: 'Active',
    expiryDate: '2025-09-16',
  },
  {
    initials: 'NH',
    name: 'Nancy Harris',
    contactEmail: 'nancy.harris@gmail.com',
    contactPhone: '081-1123339',
    plan: 'Premium',
    status: 'Active',
    expiryDate: '2025-12-03',
  },
  {
    initials: 'BC',
    name: 'Brian Clark',
    contactEmail: 'brian.clark@gmail.com',
    contactPhone: '081-1123340',
    plan: 'Basic',
    status: 'Inactive',
    expiryDate: '2024-10-15',
  },
  {
    initials: 'SL',
    name: 'Stephanie Lewis',
    contactEmail: 'stephanie.lewis@gmail.com',
    contactPhone: '081-1123341',
    plan: 'VIP',
    status: 'Expiring Soon',
    expiryDate: '2025-11-20',
  },
  {
    initials: 'JW',
    name: 'James Walker',
    contactEmail: 'james.walker@gmail.com',
    contactPhone: '081-1123342',
    plan: 'Premium',
    status: 'Active',
    expiryDate: '2026-01-08',
  },
  {
    initials: 'MH',
    name: 'Michelle Hall',
    contactEmail: 'michelle.hall@gmail.com',
    contactPhone: '081-1123343',
    plan: 'Basic',
    status: 'Active',
    expiryDate: '2025-04-25',
  },
];

// --- Utility Functions ---

const getStatusStyles = (status) => {
  switch (status) {
    case 'Active':
      return 'bg-green-100 text-green-700';
    case 'Expiring Soon':
      return 'bg-yellow-100 text-yellow-700';
    case 'Inactive':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-[var(--color-inactive)] text-[var(--color-secondary)]';
  }
};

const getPlanStyles = (plan) => {
  switch (plan) {
    case 'Premium':
      return 'bg-blue-100 text-blue-700';
    case 'VIP':
      return 'bg-purple-100 text-purple-700';
    case 'Basic':
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

// --- Main Component ---
const Members = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    plan: 'Basic'
  });

  const filteredMembers = membersData.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.contactEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your API
    console.log('New member data:', formData);
    
    // Reset form and close modal
    setFormData({
      name: '',
      email: '',
      phone: '',
      plan: 'Basic'
    });
    setIsModalOpen(false);
    
    // You could also add the new member to the local state or refresh the data
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      plan: 'Basic'
    });
  };

  const handleViewProfile = (member) => {
    setSelectedMember(member);
    setIsProfileModalOpen(true);
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
    setSelectedMember(null);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-primary)] mb-2">Member Management</h1>
        <p className="text-[var(--color-secondary)]">Manage your gym members and their subscriptions</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-[var(--color-main)] p-6 rounded-lg border border-[var(--color-border)] shadow-sm">
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 items-center">
          
          {/* Search Input */}
          <div className="relative flex-grow w-full lg:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[var(--color-secondary)]" />
            <input
              type="text"
              placeholder="Search members by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[var(--color-border)] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-[var(--color-main)] text-[var(--color-primary)]"
            />
          </div>
          
          {/* Add Member Button */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center bg-[var(--color-primary)] text-[var(--color-font-main)] px-5 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity w-full lg:w-auto"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Member
          </button>
          
          {/* Sort Buttons */}
          <button className="bg-[var(--color-inactive)] text-[var(--color-primary)] px-4 py-2 rounded-lg font-medium hover:bg-[var(--color-secondary)] hover:text-[var(--color-font-main)] transition-colors w-full lg:w-auto">
            Sort by name
          </button>
          <button className="bg-[var(--color-inactive)] text-[var(--color-primary)] px-4 py-2 rounded-lg font-medium hover:bg-[var(--color-secondary)] hover:text-[var(--color-font-main)] transition-colors w-full lg:w-auto">
            Sort by date
          </button>
        </div>
      </div>

      {/* All Members Table Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-[var(--color-primary)]">All Members</h2>
          <span className="text-[var(--color-secondary)] text-sm">
            {filteredMembers.length} of {membersData.length} members
          </span>
        </div>
        
        <div className="bg-[var(--color-main)] rounded-lg border border-[var(--color-border)] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--color-border)]">
              <thead className="bg-[var(--color-inactive)]">
                <tr>
                  {['Member', 'Contact', 'Plan', 'Status', 'Expiry Date', 'Actions'].map((header) => (
                    <th
                      key={header}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-semibold text-[var(--color-primary)] uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {filteredMembers.map((member, index) => (
                  <tr key={index} className="hover:bg-[var(--color-background)] transition-colors">
                    {/* Member Cell */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {/* Initials Circle */}
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[var(--color-inactive)] flex items-center justify-center text-sm font-medium text-[var(--color-primary)] mr-4">
                          {member.initials}
                        </div>
                        <div className="text-sm font-medium text-[var(--color-primary)]">{member.name}</div>
                      </div>
                    </td>
                    
                    {/* Contact Cell */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--color-primary)]">
                      <div>{member.contactEmail}</div>
                      <div className="text-xs text-[var(--color-secondary)]">{member.contactPhone}</div>
                    </td>
                    
                    {/* Plan Cell */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span 
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded ${getPlanStyles(member.plan)}`}
                      >
                        {member.plan}
                      </span>
                    </td>
                    
                    {/* Status Cell */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyles(member.status)}`}
                      >
                        {member.status}
                      </span>
                    </td>
                    
                    {/* Expiry Date Cell */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--color-secondary)]">
                      {member.expiryDate}
                    </td>
                    
                    {/* Actions Cell */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-3">
                        <button 
                          onClick={() => handleViewProfile(member)}
                          className="text-[var(--color-secondary)] hover:text-blue-600 transition-colors" 
                          title="View"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-[var(--color-secondary)] hover:text-green-600 transition-colors" title="Edit">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-[var(--color-secondary)] hover:text-red-600 transition-colors" title="Delete">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredMembers.length === 0 && (
            <div className="text-center py-12">
              <div className="text-[var(--color-secondary)]">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">No members found</h3>
                <p className="text-sm">Try adjusting your search terms or add a new member.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Member Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop with blur effect */}
          <div 
            className="absolute inset-0 bg-white bg-opacity-30 backdrop-blur-md"
            onClick={closeModal}
          ></div>
          
          {/* Modal Content */}
          <div className="relative bg-[var(--color-main)] rounded-lg border border-[var(--color-border)] shadow-xl w-full max-w-md mx-4 p-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[var(--color-primary)]">Add New Member</h2>
              <button
                onClick={closeModal}
                className="text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[var(--color-primary)] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-[var(--color-main)] text-[var(--color-primary)]"
                  placeholder="Enter full name"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[var(--color-primary)] mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-[var(--color-main)] text-[var(--color-primary)]"
                  placeholder="Enter email address"
                />
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-[var(--color-primary)] mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-[var(--color-main)] text-[var(--color-primary)]"
                  placeholder="Enter phone number"
                />
              </div>

              {/* Membership Plan Field */}
              <div>
                <label htmlFor="plan" className="block text-sm font-medium text-[var(--color-primary)] mb-1">
                  Membership Plan *
                </label>
                <select
                  id="plan"
                  name="plan"
                  value={formData.plan}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-[var(--color-main)] text-[var(--color-primary)]"
                >
                  <option value="Basic">Basic</option>
                  <option value="Premium">Premium</option>
                  <option value="VIP">VIP</option>
                </select>
              </div>

              {/* Form Actions */}
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 text-[var(--color-secondary)] bg-[var(--color-inactive)] rounded-lg font-medium hover:bg-[var(--color-secondary)] hover:text-[var(--color-font-main)] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[var(--color-primary)] text-[var(--color-font-main)] rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Add Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Profile View Modal */}
      {isProfileModalOpen && selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-200 bg-opacity-70 p-4">
          
          {/* Modal Container: Matches the light gray/white card in the image */}
          <div 
            className="bg-white rounded-xl shadow-xl w-full max-w-sm"
            // Prevent clicks inside the modal from closing it
            onClick={(e) => e.stopPropagation()} 
          >
            
            {/* Header and Close Button */}
            <header className="p-6 pb-2 flex justify-between items-start">
              <h2 className="text-xl font-medium text-gray-900">Member Details</h2>
              <button 
                onClick={closeProfileModal} 
                className="text-gray-400 hover:text-gray-700 transition"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </header>
            
            {/* Body Section: Member Info */}
            <div className="p-6 pt-0 space-y-8">
              
              {/* Top Member Info (Avatar, Name, Status) */}
              <div className="flex items-center">
                {/* Initials Circle */}
                <div className="flex-shrink-0 h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-medium text-gray-700 mr-4">
                  {selectedMember.initials}
                </div>
                <div>
                  <p className="text-xl font-medium text-gray-900">{selectedMember.name}</p>
                  <span className={`inline-block mt-1 px-2 py-0.5 text-xs font-semibold rounded ${getStatusStyles(selectedMember.status)}`}>
                    {selectedMember.status}
                  </span>
                </div>
              </div>

              {/* Details Grid (Two columns) */}
              <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-base">
                
                {/* Row 1: Email / Phone */}
                <div>
                  <p className="text-gray-500 text-sm mb-1">Email</p>
                  <p className="font-medium text-gray-900">{selectedMember.contactEmail}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Phone</p>
                  <p className="font-medium text-gray-900">{selectedMember.contactPhone}</p>
                </div>
                
                {/* Row 2: Plan / Joined */}
                <div>
                  <p className="text-gray-500 text-sm mb-1">Plan</p>
                  <p className="font-medium text-gray-900">{selectedMember.plan}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Joined</p>
                  <p className="font-medium text-gray-900">Jan 15, 2024</p>
                </div>

                {/* Row 3: Expiry (Full width) */}
                <div className="col-span-2"> 
                  <p className="text-gray-500 text-sm mb-1">Expiry</p>
                  <p className="font-medium text-gray-900">{selectedMember.expiryDate}</p>
                </div>
                
              </div>
              
            </div>

            {/* Footer: Action Button */}
            <div className="p-6 pt-0">
              <button 
                className="w-full bg-black text-white py-3 rounded-lg font-medium shadow-md hover:bg-gray-800 transition"
                onClick={() => alert('Edit Membership clicked!')}
              >
                Edit Membership
              </button>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default Members;