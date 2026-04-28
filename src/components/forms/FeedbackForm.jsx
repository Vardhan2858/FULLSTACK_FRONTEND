import { useState } from 'react';
import { feedbackAPI } from '../../services/api';
import './AuthForm.css';
import './FeedbackForm.css';

const initialFormData = {
  name: '',
  email: '',
  subject: '',
  rating: '5',
  message: '',
};

export default function FeedbackForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim(),
      rating: Number(formData.rating),
      message: formData.message.trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setError('Please fill in your name, email, and feedback message.');
      setLoading(false);
      return;
    }

    try {
      await feedbackAPI.submitFeedback(payload);
      setSuccess('Thanks for your feedback. Your message has been sent.');
      setFormData(initialFormData);
    } catch (err) {
      setError(err.message || 'Unable to submit feedback right now.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form feedback-form" onSubmit={handleSubmit}>
      <h2>Share Your Feedback</h2>
      <p className="feedback-intro">
        Tell us what worked, what did not, and how we can improve your experience.
      </p>

      {error && <div className="error-message" role="alert">{error}</div>}
      {success && <div className="success-message" role="status">{success}</div>}

      <div className="feedback-grid">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            disabled={loading}
            autoComplete="name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your email"
            disabled={loading}
            autoComplete="email"
          />
        </div>
      </div>

      <div className="feedback-grid">
        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            id="subject"
            name="subject"
            type="text"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Order, delivery, website, or general feedback"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="rating">Rating</label>
          <select
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            disabled={loading}
          >
            <option value="5">5 - Excellent</option>
            <option value="4">4 - Good</option>
            <option value="3">3 - Okay</option>
            <option value="2">2 - Needs work</option>
            <option value="1">1 - Poor</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="message">Feedback Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="6"
          placeholder="Write your experience here..."
          disabled={loading}
        />
      </div>

      <button type="submit" className="submit-btn" disabled={loading}>
        {loading ? 'Submitting...' : 'Send Feedback'}
      </button>
    </form>
  );
}