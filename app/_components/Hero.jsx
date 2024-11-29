import React from "react";

function LandingPage() {
  return (
    <div>
      {/* Header */}
      {/* <header className="bg-black text-white shadow-md sticky top-0 z-50">
        <div className="max-w-screen-xl mx-auto px-4 py-6 flex justify-between items-center">
          <a href="#" className="text-3xl font-bold text-orange-500">
            AI Tools
          </a>
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-lg text-white hover:text-orange-500">
              Features
            </a>
            <a href="#how-it-works" className="text-lg text-white hover:text-orange-500">
              How It Works
            </a>
            <a href="#testimonials" className="text-lg text-white hover:text-orange-500">
              Testimonials
            </a>
            <a href="#cta" className="text-lg text-white hover:text-orange-500">
              Get Started
            </a>
          </nav>
          <button className="md:hidden text-2xl text-white" aria-label="Toggle Navigation">
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </header> */}

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-black text-white py-32">
        <div className="max-w-screen-xl mx-auto text-center px-4">
          <h1 className="text-4xl font-extrabold sm:text-5xl leading-tight">
            Create Forms, Quizzes & Surveys in Seconds
            <strong className="text-yellow-300">, Not Hours</strong>
          </h1>
          <p className="mt-4 sm:text-xl">
            AI-powered tools that make form creation, quizzes, and surveys quick and effortless.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a
              className="btn btn-accent px-12 py-3 text-sm font-medium"
              href="#cta"
            >
              Start Creating
            </a>
            <a
              className="btn btn-outline btn-sm px-12 py-3 text-sm font-medium"
              href="#features"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-16">
        <div className="max-w-screen-xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Why Choose Us?</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-lg hover:bg-gray-200 transition duration-300">
              <div className="text-4xl text-orange-500 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 6h2M11 12h2M11 18h2M4 6h.01M4 12h.01M4 18h.01M20 6h.01M20 12h.01M20 18h.01"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">AI Automation</h3>
              <p className="text-gray-600">
                Harness the power of AI to automate the form creation process and save time.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-lg hover:bg-gray-200 transition duration-300">
              <div className="text-4xl text-orange-500 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 3l14 18M5 3h14M5 3v18"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Easy to Use</h3>
              <p className="text-gray-600">
                User-friendly platform designed to create professional forms without any hassle.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-lg hover:bg-gray-200 transition duration-300">
              <div className="text-4xl text-orange-500 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 6l6 6-6 6M13 6l6 6-6 6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Customizable Templates</h3>
              <p className="text-gray-600">
                Pick and customize templates for forms, surveys, and quizzes tailored to your needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-gray-100 py-16">
        <div className="max-w-screen-xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">How It Works</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 1: Choose a Template</h3>
              <p className="text-gray-600">
                Select a template that suits your need and get started quickly.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 2: Customize</h3>
              <p className="text-gray-600">
                Personalize your form with the AI-powered builder to add dynamic fields.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 3: Share</h3>
              <p className="text-gray-600">
                Publish and share your form with a link or embed it on your website.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-white py-16">
        <div className="max-w-screen-xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">What Our Users Say</h2>
          <div className="flex justify-center space-x-8">
            <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
              <p className="text-lg text-gray-600 mb-4">
                "AI Tools made form creation a breeze! I saved so much time using this platform."
              </p>
              <div className="font-bold text-gray-800">John Doe</div>
              <div className="text-gray-500">CEO, Tech Co.</div>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
              <p className="text-lg text-gray-600 mb-4">
                "I created a survey in minutes. This platform is so intuitive and easy to use."
              </p>
              <div className="font-bold text-gray-800">Jane Smith</div>
              <div className="text-gray-500">Marketing Director</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="cta" className="bg-gradient-to-r from-orange-500 to-black text-white py-16">
        <div className="max-w-screen-xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Start Building Today!</h2>
          <p className="mb-6">
            Whether you need a simple form, a quiz, or a survey, our platform makes it easy to get started.
          </p>
          <a
            className="btn btn-accent px-12 py-3 text-sm font-medium"
            href="#"
          >
            Create Your First Tool
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="max-w-screen-xl mx-auto px-4 flex justify-between">
          <div>
            <a href="#" className="text-2xl font-bold text-orange-500">AI Tools</a>
            <p className="mt-4">All rights reserved.</p>
          </div>
          <div className="space-x-6">
            <a href="#" className="text-white hover:text-orange-500">Privacy Policy</a>
            <a href="#" className="text-white hover:text-orange-500">Terms of Service</a>
            <a href="#" className="text-white hover:text-orange-500">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
