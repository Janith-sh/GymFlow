import React, { useState } from 'react';
import {
  Star,
  ThumbsUp,
  MessageSquare,
  TrendingUp,
  Send,
  Filter,
  Calendar,
  User,
} from 'lucide-react';

const Feedback = () => {
  const [feedbackList, setFeedbackList] = useState([
    {
      id: 1,
      name: 'Janith Shan',
      rating: 5,
      comment: 'Great facilities and friendly staff!',
      timestamp: '2 hours ago',
      type: 'positive',
    },
    {
      id: 2,
      name: 'Harshana',
      rating: 4,
      comment: 'Good equipment but could use more cardio machines.',
      timestamp: '1 day ago',
      type: 'positive',
    },
  ]);

  const [newFeedback, setNewFeedback] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [filterRating, setFilterRating] = useState('all');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Feedback Statistics
  const averageRating = 4.6;
  const positivePercentage = 87;
  const totalReviews = 234;

  const handleSubmitFeedback = () => {
    if (newFeedback.trim()) {
      const newEntry = {
        id: feedbackList.length + 1,
        name: 'Current User', // Should be replaced with actual user data
        rating: newRating,
        comment: newFeedback,
        timestamp: 'just now',
        type: newRating >= 4 ? 'positive' : 'neutral',
      };

      setFeedbackList([newEntry, ...feedbackList]);
      setNewFeedback('');
      setNewRating(5);
      setSubmitSuccess(true);

      setTimeout(() => setSubmitSuccess(false), 3000);
    }
  };

  const filteredFeedback = filterRating === 'all'
    ? feedbackList
    : feedbackList.filter((fb) => fb.rating === parseInt(filterRating));

  const StatCard = ({ label, value, icon: Icon, color }) => (
    <div className="bg-white rounded-lg border border-[var(--color-border)] p-6 flex items-start justify-between">
      <div>
        <p className="text-sm text-[var(--color-secondary)] mb-1">{label}</p>
        <p className="text-3xl font-bold text-[var(--color-primary)]">{value}</p>
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-2">
          Feedback & Communication
        </h1>
        <p className="text-[var(--color-secondary)]">
          Member feedback and satisfaction tracking
        </p>
      </div>

      {/* Success Message */}
      {submitSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
          <ThumbsUp className="w-5 h-5 text-green-600" />
          <span className="text-sm text-green-700">
            Thank you! Your feedback has been submitted successfully.
          </span>
        </div>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          label="Average Rating"
          value={averageRating}
          icon={Star}
          color="bg-yellow-500"
        />
        <StatCard
          label="Positive Feedback"
          value={`${positivePercentage}%`}
          icon={ThumbsUp}
          color="bg-green-500"
        />
        <StatCard
          label="Total Reviews"
          value={totalReviews}
          icon={TrendingUp}
          color="bg-blue-500"
        />
      </div>

      {/* Stars Display */}
      <div className="bg-white rounded-lg border border-[var(--color-border)] p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-[var(--color-secondary)]">Average Rating</p>
            <p className="text-4xl font-bold text-[var(--color-primary)]">
              {averageRating}
            </p>
          </div>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-8 h-8 ${
                  i < Math.round(averageRating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-[var(--color-border)]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Submit Feedback Section */}
      <div className="bg-white rounded-lg border border-[var(--color-border)] p-6 mb-8">
        <h2 className="text-lg font-semibold text-[var(--color-primary)] mb-4 flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Submit Feedback
        </h2>

        {/* Rating Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-[var(--color-primary)] mb-2">
            Rate Your Experience
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setNewRating(star)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= newRating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-[var(--color-border)]'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Feedback Textarea */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-[var(--color-primary)] mb-2">
            Share Your Experience
          </label>
          <textarea
            value={newFeedback}
            onChange={(e) => setNewFeedback(e.target.value)}
            placeholder="Tell us what you think about our gym facilities, trainers, and services..."
            className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] resize-none"
            rows="4"
          />
          <p className="text-xs text-[var(--color-secondary)] mt-1">
            {newFeedback.length}/500 characters
          </p>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmitFeedback}
          disabled={!newFeedback.trim()}
          className="w-full px-4 py-3 rounded-lg bg-[var(--color-primary)] text-white font-medium hover:bg-opacity-90 disabled:bg-opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          Submit Feedback
        </button>
      </div>

      {/* Filter and Recent Feedback */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[var(--color-primary)]">
            Recent Feedback
          </h2>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[var(--color-secondary)]" />
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="px-3 py-2 border border-[var(--color-border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
        </div>

        {/* Feedback List */}
        <div className="space-y-4">
          {filteredFeedback.length > 0 ? (
            filteredFeedback.map((feedback) => (
              <div
                key={feedback.id}
                className="bg-white rounded-lg border border-[var(--color-border)] p-6 hover:border-[var(--color-primary)] transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-background)] flex items-center justify-center">
                      <User className="w-5 h-5 text-[var(--color-secondary)]" />
                    </div>
                    <div>
                      <p className="font-medium text-[var(--color-primary)]">
                        {feedback.name}
                      </p>
                      <p className="text-xs text-[var(--color-secondary)] flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {feedback.timestamp}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < feedback.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-[var(--color-border)]'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-[var(--color-primary)] leading-relaxed">
                  {feedback.comment}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <MessageSquare className="w-12 h-12 text-[var(--color-border)] mx-auto mb-3" />
              <p className="text-[var(--color-secondary)]">
                No feedback found for the selected rating.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Load More Button */}
      {filteredFeedback.length > 0 && (
        <div className="text-center mt-6">
          <button className="px-6 py-2 rounded-full bg-[var(--color-background)] text-[var(--color-primary)] text-sm font-medium border border-[var(--color-border)] hover:bg-[var(--color-border)] transition-colors">
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Feedback;