import React from 'react';

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-white text-black">
      <h1 className="text-5xl font-bold mb-8">About AI Video Generator</h1>
      <p className="text-xl text-center mb-6">
        Welcome to the AI Video Generator, your one-stop solution for creating engaging and professional videos effortlessly! Our platform harnesses the power of artificial intelligence to transform your scripts into stunning videos with captions and voiceovers.
      </p>

      <div className="bg-blue-600 p-6 rounded-lg shadow-md w-full max-w-2xl text-white">
        <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
        <p className="text-xl mb-6">
          Our mission is to empower creators, educators, and businesses by providing an easy-to-use tool that simplifies video production. We believe that everyone should have the ability to share their stories and ideas through video, regardless of their technical skills.
        </p>

        <h2 className="text-3xl font-semibold mb-4">Key Features</h2>
        <ul className="list-disc list-inside text-xl mb-6">
          <li className="mb-2">🔹 Generate videos from text scripts in minutes.</li>
          <li className="mb-2">🔹 High-quality voiceovers in multiple languages.</li>
          <li className="mb-2">🔹 Customizable video styles and templates.</li>
          <li className="mb-2">🔹 Access to a vast library of stock images and videos.</li>
          <li className="mb-2">🔹 User-friendly interface designed for everyone.</li>
        </ul>

        <h2 className="text-3xl font-semibold mb-4">Why Choose Us?</h2>
        <p className="text-xl mb-6">
          With our AI Video Generator, you can save time and resources while producing high-quality content. Whether you are a YouTuber, educator, or marketer, our platform is designed to help you create videos that captivate your audience and elevate your message.
        </p>

        <h2 className="text-3xl font-semibold mb-4">Get Started Today!</h2>
        <p className="text-xl mb-0">
          Join our community of creators and start generating your first video today! Experience the future of video production with the AI Video Generator.
        </p>
      </div>
    </div>
  );
};

export default About;