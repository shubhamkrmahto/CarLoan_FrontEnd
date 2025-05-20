import React from 'react';
import { motion } from 'framer-motion';

function About() {
  const pageVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
  };

  return (
    <motion.div
      className="container my-5"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      <div className="card shadow p-4">
        <h2 className="text-primary text-center mb-4">About Krushna Fincorp</h2>
        <p className="text-center text-muted">
          Krushna Fincorp is your trusted partner in car financing. We provide fast, secure, and affordable
          car loans to help you drive your dream vehicle. Our transparent process, dedicated team, and digital-first
          solutions ensure a hassle-free experience from application to approval.
        </p>

        <div className="row mt-5">
          <div className="col-md-6 mb-4">
            <h5 className="text-secondary">Why Choose Us?</h5>
            <ul className="list-unstyled ps-3 text-muted">
              <li>✔ Instant eligibility check</li>
              <li>✔ Quick loan approvals</li>
              <li>✔ Low interest rates</li>
              <li>✔ Minimal documentation</li>
              <li>✔ 100% digital onboarding</li>
              <li>✔ Personalized customer support</li>
            </ul>
          </div>
          <div className="col-md-6 mb-4">
            <h5 className="text-secondary">Our Mission</h5>
            <p className="text-muted">
              Our mission is to bridge the gap between your dreams and financial capabilities by offering 
              innovative, customer-centric car loan solutions. We strive to make car ownership affordable, 
              accessible, and stress-free for every Indian family.
            </p>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-6 mb-4">
            <h5 className="text-secondary">Our Vision</h5>
            <p className="text-muted">
              To become India’s most trusted auto finance brand, empowering millions to achieve mobility freedom.
              We envision a future where every deserving individual has access to reliable and transparent financing.
            </p>
          </div>
          <div className="col-md-6 mb-4">
            <h5 className="text-secondary">Our Core Values</h5>
            <ul className="list-unstyled ps-3 text-muted">
              <li>✔ Integrity in every transaction</li>
              <li>✔ Simplicity in the loan process</li>
              <li>✔ Innovation in financial technology</li>
              <li>✔ Customer-first approach</li>
            </ul>
          </div>
        </div>

        <hr className="my-5" />

        <h4 className="text-center text-primary mb-4">What Our Customers Say</h4>
        <div className="row text-muted">
          <div className="col-md-4 mb-3">
            <div className="border rounded p-3 h-100">
              <p>"I got my car loan approved within hours. Krushna Fincorp made it incredibly easy!"</p>
              <small>– Rajeev S., Pune</small>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="border rounded p-3 h-100">
              <p>"Great service and low interest rates. Highly recommended for first-time buyers."</p>
              <small>– Neha P., Mumbai</small>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="border rounded p-3 h-100">
              <p>"Their support team guided me throughout the process. Very professional!"</p>
              <small>– Ankit R., Nagpur</small>
            </div>
          </div>
        </div>

        <div className="text-center mt-5">
          <h5 className="text-primary">Start Your Loan Journey Today</h5>
          <p className="text-muted">
            Whether you're buying your first car or upgrading, Krushna Fincorp is here to help you make it happen.
          </p>
          <a href="/apply" className="btn btn-primary px-4">
            Apply Now
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default About;
