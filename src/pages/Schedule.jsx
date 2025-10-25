import React, { useState, useCallback } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Search, Plus, Edit, Trash2, X } from 'lucide-react';

const localizer = momentLocalizer(moment);

// Main Page Component
const SchedulePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState('week');
  const [date, setDate] = useState(new Date());
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showEditEventModal, setShowEditEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Sample events data
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Yoga Class',
      trainer: 'John Wick',
      start: new Date(2025, 9, 21, 9, 0), // Oct 21, 2025, 9:00 AM
      end: new Date(2025, 9, 21, 10, 0),   // Oct 21, 2025, 10:00 AM
      resource: { color: 'blue', trainer: 'John Wick' }
    },
    {
      id: 2,
      title: 'CrossFit',
      trainer: 'Jane Doe',
      start: new Date(2025, 9, 22, 9, 0),
      end: new Date(2025, 9, 22, 10, 0),
      resource: { color: 'green', trainer: 'Jane Doe' }
    },
    {
      id: 3,
      title: 'Pilates',
      trainer: 'Mike Johnson',
      start: new Date(2025, 9, 22, 12, 0),
      end: new Date(2025, 9, 22, 13, 0),
      resource: { color: 'purple', trainer: 'Mike Johnson' }
    },
    {
      id: 4,
      title: 'Cardio Blast',
      trainer: 'Sarah Wilson',
      start: new Date(2025, 9, 22, 14, 0),
      end: new Date(2025, 9, 22, 15, 0),
      resource: { color: 'orange', trainer: 'Sarah Wilson' }
    },
    {
      id: 5,
      title: 'Strength Training',
      trainer: 'Tom Brown',
      start: new Date(2025, 9, 23, 9, 0),
      end: new Date(2025, 9, 23, 10, 0),
      resource: { color: 'blue', trainer: 'Tom Brown' }
    },
    {
      id: 6,
      title: 'Zumba',
      trainer: 'Lisa Davis',
      start: new Date(2025, 9, 23, 11, 0),
      end: new Date(2025, 9, 23, 12, 0),
      resource: { color: 'green', trainer: 'Lisa Davis' }
    },
    {
      id: 7,
      title: 'Boxing',
      trainer: 'Alex Chen',
      start: new Date(2025, 9, 23, 13, 0),
      end: new Date(2025, 9, 23, 14, 0),
      resource: { color: 'purple', trainer: 'Alex Chen' }
    },
    {
      id: 8,
      title: 'Morning Yoga',
      trainer: 'Emma Stone',
      start: new Date(2025, 9, 24, 8, 0),
      end: new Date(2025, 9, 24, 9, 0),
      resource: { color: 'blue', trainer: 'Emma Stone' }
    },
    {
      id: 9,
      title: 'HIIT',
      trainer: 'Ryan Garcia',
      start: new Date(2025, 9, 24, 10, 0),
      end: new Date(2025, 9, 24, 11, 0),
      resource: { color: 'orange', trainer: 'Ryan Garcia' }
    },
    {
      id: 10,
      title: 'Spin Class',
      trainer: 'Maria Rodriguez',
      start: new Date(2025, 9, 24, 13, 0),
      end: new Date(2025, 9, 24, 14, 0),
      resource: { color: 'green', trainer: 'Maria Rodriguez' }
    },
    {
      id: 11,
      title: 'Body Pump',
      trainer: 'David Lee',
      start: new Date(2025, 9, 25, 9, 0),
      end: new Date(2025, 9, 25, 10, 0),
      resource: { color: 'purple', trainer: 'David Lee' }
    },
    {
      id: 12,
      title: 'Aqua Fitness',
      trainer: 'Nina Patel',
      start: new Date(2025, 9, 25, 12, 0),
      end: new Date(2025, 9, 25, 13, 0),
      resource: { color: 'blue', trainer: 'Nina Patel' }
    },
  ]);

  // Filter events based on search term
  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.trainer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle event selection
  const handleSelectEvent = useCallback((event) => {
    setSelectedEvent(event);
    setShowEditEventModal(true);
  }, []);

  // Handle slot selection (for adding new events)
  const handleSelectSlot = useCallback((slotInfo) => {
    setSelectedSlot(slotInfo);
    setShowAddEventModal(true);
  }, []);

  // Handle view change
  const handleViewChange = useCallback((newView) => {
    setView(newView);
  }, []);

  // Handle date navigation
  const handleNavigate = useCallback((newDate) => {
    setDate(newDate);
  }, []);

  // Sort functions
  const sortEventsByName = () => {
    setEvents([...events].sort((a, b) => a.title.localeCompare(b.title)));
  };

  const sortEventsByTime = () => {
    setEvents([...events].sort((a, b) => new Date(a.start) - new Date(b.start)));
  };

  // Custom event style getter
  const eventStyleGetter = (event) => {
    const colors = {
      blue: { backgroundColor: '#3b82f6', borderColor: '#2563eb' },
      green: { backgroundColor: '#10b981', borderColor: '#059669' },
      purple: { backgroundColor: '#8b5cf6', borderColor: '#7c3aed' },
      orange: { backgroundColor: '#f97316', borderColor: '#ea580c' },
    };

    const color = event.resource?.color || 'blue';
    return {
      style: {
        ...colors[color],
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '12px',
        padding: '2px 4px',
      }
    };
  };

  // Custom event component to show trainer name
  const CustomEvent = ({ event }) => {
    return (
      <div className="text-white">
        <div className="font-semibold text-xs">{event.title}</div>
        <div className="text-xs opacity-90">{event.resource?.trainer || event.trainer}</div>
      </div>
    );
  };

  return (
    <div className="p-8 bg-[var(--color-background)] min-h-screen">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[var(--color-primary)]">Class Schedule Management</h1>
        <p className="text-[var(--color-secondary)] mt-1">Track and manage your gym's classes and schedule</p>
      </div>

      {/* Control Bar */}
      <div className="flex justify-between items-center mb-6">
        {/* Search Bar */}
        <div className="flex items-center bg-[var(--color-inactive)] rounded-lg p-2 w-72">
          <Search className="w-5 h-5 text-[var(--color-secondary)]" />
          <input
            type="text"
            placeholder="Search classes or trainers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent ml-2 w-full text-sm text-[var(--color-primary)] placeholder-[var(--color-secondary)] focus:outline-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button 
            onClick={sortEventsByName}
            className="bg-[var(--color-main)] border border-[var(--color-border)] rounded-lg px-4 py-2 text-sm font-medium text-[var(--color-primary)] hover:bg-[var(--color-inactive)]"
          >
            Sort by name
          </button>
          <button 
            onClick={sortEventsByTime}
            className="bg-[var(--color-main)] border border-[var(--color-border)] rounded-lg px-4 py-2 text-sm font-medium text-[var(--color-primary)] hover:bg-[var(--color-inactive)]"
          >
            Sort by time
          </button>
          <button 
            onClick={() => setShowAddEventModal(true)}
            className="bg-[var(--color-primary)] text-[var(--color-font-main)] rounded-lg px-4 py-2 text-sm font-medium hover:opacity-90 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Class</span>
          </button>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-[var(--color-main)] rounded-lg border border-[var(--color-border)] shadow-sm p-4">
        <Calendar
          localizer={localizer}
          events={filteredEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          view={view}
          date={date}
          onView={handleViewChange}
          onNavigate={handleNavigate}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          eventPropGetter={eventStyleGetter}
          components={{
            event: CustomEvent,
          }}
          min={new Date(0, 0, 0, 6, 0, 0)} // 6 AM
          max={new Date(0, 0, 0, 22, 0, 0)} // 10 PM
          step={60}
          timeslots={1}
          defaultView="week"
          views={['month', 'week', 'day']}
          toolbar={true}
          popup={true}
          popupOffset={{x: 30, y: 20}}
        />
      </div>

      {/* Add Event Modal */}
      {showAddEventModal && (
        <AddEventModal 
          setShowModal={setShowAddEventModal}
          events={events}
          setEvents={setEvents}
          selectedSlot={selectedSlot}
        />
      )}

      {/* Edit Event Modal */}
      {showEditEventModal && selectedEvent && (
        <EditEventModal
          event={selectedEvent}
          setShowModal={setShowEditEventModal}
          setEvents={setEvents}
        />
      )}
    </div>
  );
};

// Add Event Modal
const AddEventModal = ({ setShowModal, events, setEvents, selectedSlot }) => {
  const [formData, setFormData] = useState({
    title: '',
    trainer: '',
    start: selectedSlot ? selectedSlot.start : new Date(),
    end: selectedSlot ? selectedSlot.end : new Date(),
    color: 'blue'
  });

  const colors = ['blue', 'green', 'purple', 'orange'];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      id: Date.now(),
      ...formData,
      resource: { color: formData.color, trainer: formData.trainer }
    };
    setEvents(prev => [...prev, newEvent]);
    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[var(--color-main)] rounded-lg p-6 w-96 max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[var(--color-primary)]">Add New Class</h2>
          <button
            onClick={() => setShowModal(false)}
            className="text-[var(--color-secondary)] hover:text-[var(--color-primary)]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-[var(--color-primary)] mb-2">Class Name</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full p-2 border border-[var(--color-border)] rounded focus:outline-none focus:border-[var(--color-primary)]"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-[var(--color-primary)] mb-2">Trainer</label>
            <input
              type="text"
              value={formData.trainer}
              onChange={(e) => setFormData(prev => ({ ...prev, trainer: e.target.value }))}
              className="w-full p-2 border border-[var(--color-border)] rounded focus:outline-none focus:border-[var(--color-primary)]"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-[var(--color-primary)] mb-2">Start Time</label>
            <input
              type="datetime-local"
              value={moment(formData.start).format('YYYY-MM-DDTHH:mm')}
              onChange={(e) => setFormData(prev => ({ ...prev, start: new Date(e.target.value) }))}
              className="w-full p-2 border border-[var(--color-border)] rounded focus:outline-none focus:border-[var(--color-primary)]"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-[var(--color-primary)] mb-2">End Time</label>
            <input
              type="datetime-local"
              value={moment(formData.end).format('YYYY-MM-DDTHH:mm')}
              onChange={(e) => setFormData(prev => ({ ...prev, end: new Date(e.target.value) }))}
              className="w-full p-2 border border-[var(--color-border)] rounded focus:outline-none focus:border-[var(--color-primary)]"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-[var(--color-primary)] mb-2">Color</label>
            <div className="flex space-x-2">
              {colors.map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, color }))}
                  className={`w-8 h-8 rounded border-2 ${
                    formData.color === color ? 'border-gray-800' : 'border-gray-300'
                  } ${
                    color === 'blue' ? 'bg-blue-500' :
                    color === 'green' ? 'bg-green-500' :
                    color === 'purple' ? 'bg-purple-500' :
                    'bg-orange-500'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              type="submit"
              className="flex-1 bg-[var(--color-primary)] text-[var(--color-font-main)] py-2 px-4 rounded hover:opacity-90"
            >
              Add Class
            </button>
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="flex-1 bg-[var(--color-inactive)] text-[var(--color-secondary)] py-2 px-4 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Edit Event Modal
const EditEventModal = ({ event, setShowModal, setEvents }) => {
  const [formData, setFormData] = useState({
    title: event.title,
    trainer: event.trainer || event.resource?.trainer || '',
    start: event.start,
    end: event.end,
    color: event.resource?.color || 'blue'
  });

  const colors = ['blue', 'green', 'purple', 'orange'];

  const handleSubmit = (e) => {
    e.preventDefault();
    setEvents(prev => prev.map(e => 
      e.id === event.id 
        ? { ...e, ...formData, resource: { color: formData.color, trainer: formData.trainer } }
        : e
    ));
    setShowModal(false);
  };

  const handleDelete = () => {
    setEvents(prev => prev.filter(e => e.id !== event.id));
    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[var(--color-main)] rounded-lg p-6 w-96 max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[var(--color-primary)]">Edit Class</h2>
          <div className="flex space-x-2">
            <button
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="text-[var(--color-secondary)] hover:text-[var(--color-primary)]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-[var(--color-primary)] mb-2">Class Name</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full p-2 border border-[var(--color-border)] rounded focus:outline-none focus:border-[var(--color-primary)]"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-[var(--color-primary)] mb-2">Trainer</label>
            <input
              type="text"
              value={formData.trainer}
              onChange={(e) => setFormData(prev => ({ ...prev, trainer: e.target.value }))}
              className="w-full p-2 border border-[var(--color-border)] rounded focus:outline-none focus:border-[var(--color-primary)]"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-[var(--color-primary)] mb-2">Start Time</label>
            <input
              type="datetime-local"
              value={moment(formData.start).format('YYYY-MM-DDTHH:mm')}
              onChange={(e) => setFormData(prev => ({ ...prev, start: new Date(e.target.value) }))}
              className="w-full p-2 border border-[var(--color-border)] rounded focus:outline-none focus:border-[var(--color-primary)]"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-[var(--color-primary)] mb-2">End Time</label>
            <input
              type="datetime-local"
              value={moment(formData.end).format('YYYY-MM-DDTHH:mm')}
              onChange={(e) => setFormData(prev => ({ ...prev, end: new Date(e.target.value) }))}
              className="w-full p-2 border border-[var(--color-border)] rounded focus:outline-none focus:border-[var(--color-primary)]"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-[var(--color-primary)] mb-2">Color</label>
            <div className="flex space-x-2">
              {colors.map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, color }))}
                  className={`w-8 h-8 rounded border-2 ${
                    formData.color === color ? 'border-gray-800' : 'border-gray-300'
                  } ${
                    color === 'blue' ? 'bg-blue-500' :
                    color === 'green' ? 'bg-green-500' :
                    color === 'purple' ? 'bg-purple-500' :
                    'bg-orange-500'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              type="submit"
              className="flex-1 bg-[var(--color-primary)] text-[var(--color-font-main)] py-2 px-4 rounded hover:opacity-90"
            >
              Update Class
            </button>
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="flex-1 bg-[var(--color-inactive)] text-[var(--color-secondary)] py-2 px-4 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SchedulePage;