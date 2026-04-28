import '../pages.css';
import './Contact.css';
import FeedbackForm from '../../components/forms/FeedbackForm';

export default function Contact() {
  return (
    <div className="page-container contact-page">
      <section className="contact-hero">
        <div className="container contact-hero-inner">
          <div>
            <p className="contact-kicker">We listen to every message</p>
            <h1>Feedback helps us improve OrganicSiri</h1>
            <p>
              Share a review, report an issue, or tell us how we can make shopping easier.
              Your message goes straight into our feedback inbox.
            </p>
          </div>

          <div className="contact-summary">
            <h2>Quick Contact</h2>
            <p>Email: feedback@organic.com</p>
            <p>Phone: 7013603546</p>
            <p>Hours: Mon - Fri, 9:00 AM - 6:00 PM</p>
          </div>
        </div>
      </section>

      <section className="contact-form-section">
        <div className="container">
          <FeedbackForm />
        </div>
      </section>
    </div>
  );
}