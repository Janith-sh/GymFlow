import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, Eye, Edit, Trash2, X, BarChart3 } from 'lucide-react';

// --- Mock Data ---
const trainersData = [
  {
    initials: 'AM',
    name: 'Alex Mitchell',
    email: 'alex.mitchell@gmail.com',
    phone: '081-112-3325',
    specialization: 'Strength & Conditioning, Muscle Building',
    experience: '6 years',
    status: 'Active',
  },
  {
    initials: 'AF',
    name: 'Ayesha Fernando',
    email: 'ayesha.fernando@gmail.com',
    phone: '081-223-4567',
    specialization: 'Weight Loss, Personal Training for Women, Aerobics',
    experience: '5 years',
    status: 'Active',
  },
  {
    initials: 'MD',
    name: 'Marcus Davis',
    email: 'marcus.davis@gmail.com',
    phone: '081-334-5678',
    specialization: 'Functional Training, CrossFit, Core Strength',
    experience: '8 years',
    status: 'Active',
  },
  {
    initials: 'SP',
    name: 'Sofia Patel',
    email: 'sofia.patel@gmail.com',
    phone: '081-445-6789',
    specialization: 'Flexibility & Mobility, Yoga-Based Fitness, Pilates',
    experience: '4 years',
    status: 'Active',
  },
  {
    initials: 'RK',
    name: 'Rohan Kumar',
    email: 'rohan.kumar@gmail.com',
    phone: '081-556-7890',
    specialization: 'Cardio Training, HIIT, Marathon Coaching',
    experience: '7 years',
    status: 'Inactive',
  },
  {
    initials: 'EC',
    name: 'Emma Clarke',
    email: 'emma.clarke@gmail.com',
    phone: '081-667-8901',
    specialization: 'Boxing, Self-Defense, Combat Sports',
    experience: '9 years',
    status: 'Active',
  },
  {
    initials: 'TR',
    name: 'Thomas Roberts',
    email: 'thomas.roberts@gmail.com',
    phone: '081-778-9012',
    specialization: 'Rehabilitation, Injury Recovery, Sports Therapy',
    experience: '10 years',
    status: 'Active',
  },
  {
    initials: 'NM',
    name: 'Nina Mendez',
    email: 'nina.mendez@gmail.com',
    phone: '081-889-0123',
    specialization: 'Nutrition Coaching, Body Composition, Wellness',
    experience: '6 years',
    status: 'Active',
  },
  {
    initials: 'LJ',
    name: 'Liam Johnson',
    email: 'liam.johnson@gmail.com',
    phone: '081-990-1234',
    specialization: 'Olympic Lifting, Power Training, Technique Coaching',
    experience: '5 years',
    status: 'Active',
  },
  {
    initials: 'OL',
    name: 'Olivia Lewis',
    email: 'olivia.lewis@gmail.com',
    phone: '081-001-2345',
    specialization: 'Zumba, Dance Fitness, Group Classes',
    experience: '3 years',
    status: 'Inactive',
  },
];

const Trainers = () => {
  const [trainers, setTrainers] = useState(trainersData);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialization: '',
    experience: '',
    status: 'Active',
  });

  const filteredTrainers = trainers.filter(trainer =>
    trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trainer.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddTrainer = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      specialization: '',
      experience: '',
      status: 'Active',
    });
    setIsAddModalOpen(true);
  };

  const handleEditTrainer = (trainer) => {
    setSelectedTrainer(trainer);
    setFormData(trainer);
    setIsEditModalOpen(true);
  };

  const handleSaveTrainer = () => {
    if (isEditModalOpen && selectedTrainer) {
      setTrainers(trainers.map(t =>
        t.name === selectedTrainer.name ? { ...formData, initials: formData.name.split(' ').map(n => n[0]).join('') } : t
      ));
    } else {
      setTrainers([...trainers, {
        ...formData,
        initials: formData.name.split(' ').map(n => n[0]).join('')
      }]);
    }
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setFormData({});
  };

  const handleDeleteTrainer = (trainerName) => {
    setTrainers(trainers.filter(t => t.name !== trainerName));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-2">
          Trainer Management
        </h1>
        <p className="text-[var(--color-secondary)]">Manage your gym trainers</p>
      </div>

      {/* Top Section with Performance Link */}
      <div className="flex justify-end">
        <Link
          to="/trainers/performance"
          className="flex items-center gap-2 bg-[var(--color-primary)] text-[var(--color-main)] px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
        >
          <BarChart3 className="w-5 h-5" />
          View Performance
        </Link>
      </div>

      {/* Top Actions Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-[var(--color-secondary)]" />
          <input
            type="text"
            placeholder="Search trainers by name or speci..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-[var(--color-main)] border border-[var(--color-border)] text-[var(--color-primary)] placeholder-[var(--color-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>
        <button
          onClick={handleAddTrainer}
          className="flex items-center gap-2 bg-[var(--color-primary)] text-[var(--color-main)] px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
        >
          <Plus className="w-5 h-5" />
          Add Trainer
        </button>
        <button className="px-4 py-2 bg-[var(--color-main)] border border-[var(--color-border)] text-[var(--color-primary)] rounded-lg hover:bg-[var(--color-inactive)] transition-colors">
          Sort by name
        </button>
      </div>

      {/* Trainers Tab Content */}
      <div className="bg-[var(--color-main)] rounded-lg shadow-sm border border-[var(--color-border)]">
        {/* Full Name Header */}
        <div className="px-6 py-4 border-b border-[var(--color-border)]">
          <h3 className="text-[var(--color-primary)] font-semibold">All Trainers</h3>
        </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--color-border)]">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--color-primary)]">
                    Trainer
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--color-primary)]">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--color-primary)]">
                    Specialization
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--color-primary)]">
                    Experience
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--color-primary)]">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--color-primary)]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTrainers.map((trainer, index) => (
                  <tr key={index} className="border-b border-[var(--color-border)] hover:bg-[var(--color-inactive)] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-[var(--color-main)] font-semibold text-sm">
                          {trainer.initials}
                        </div>
                        <span className="text-[var(--color-primary)] font-medium">{trainer.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-[var(--color-primary)]">
                        <div>{trainer.email}</div>
                        <div className="text-[var(--color-secondary)]">{trainer.phone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-[var(--color-primary)]">{trainer.specialization}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-[var(--color-primary)]">{trainer.experience}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        trainer.status === 'Active'
                          ? 'bg-[var(--color-primary)] text-[var(--color-main)]'
                          : 'bg-[var(--color-inactive)] text-[var(--color-primary)]'
                      }`}>
                        {trainer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button className="text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors">
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleEditTrainer(trainer)}
                          className="text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteTrainer(trainer.name)}
                          className="text-[var(--color-secondary)] hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      {/* Add/Edit Trainer Modal */}
      {(isAddModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[var(--color-main)] rounded-lg p-6 w-full max-w-md shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-[var(--color-primary)]">
                {isEditModalOpen ? 'Edit Trainer' : 'Add New Trainer'}
              </h2>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setIsEditModalOpen(false);
                }}
                className="text-[var(--color-secondary)] hover:text-[var(--color-primary)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-[var(--color-primary)] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg text-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  placeholder="Enter trainer name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-primary)] mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg text-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  placeholder="Enter email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-primary)] mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg text-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-primary)] mb-1">
                  Specialization
                </label>
                <input
                  type="text"
                  value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg text-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  placeholder="Enter specialization"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-primary)] mb-1">
                  Experience (years)
                </label>
                <input
                  type="text"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg text-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  placeholder="Enter years of experience"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-primary)] mb-1">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg text-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setIsEditModalOpen(false);
                }}
                className="px-4 py-2 border border-[var(--color-border)] text-[var(--color-primary)] rounded-lg hover:bg-[var(--color-inactive)] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveTrainer}
                className="px-4 py-2 bg-[var(--color-primary)] text-[var(--color-main)] rounded-lg hover:opacity-90 transition-opacity"
              >
                Save Trainer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trainers;