import React from 'react';

const About = () => {
  return (
    <div className="max-w-3xl mx-auto py-12 px-6 fade-in text-left">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-primary-color">About This Project</h1>
        <div className="glass-card" style={{ margin: '5px 0', padding: '1rem' }}>
          <p className="text-xl text-muted font-medium">GitHub Random Repository Explorer</p>
        </div>
      </header>

      <div className="glass-card mb-12 p-8">
        <p className="mb-6 text-lg leading-relaxed text-muted">
          This application is a modern React-based platform designed to help developers discover, explore, and save interesting projects from GitHub in an intuitive and efficient way.
        </p>
        <p className="text-lg leading-relaxed text-muted">
          Instead of endlessly scrolling through repositories, this app provides a smarter approach to discovery by combining randomness with powerful filtering and search capabilities.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 border-b border-[rgba(255,255,255,0.1)] pb-2"
          style={{ textAlign: "center", marginTop: "10px" }}>Purpose</h2>
        <div className="glass-card" style={{ margin: '5px 0', padding: '1rem' }}>
          <p className="mb-4 text-lg text-muted">The main goal of this project is to:</p>
          <br />
          <ul className="list-disc pl-8 mb-6 text-lg text-muted space-y-2"
            style={{ listStyle: "square", marginLeft: "15px" }}>
            <li>Help users find new and interesting GitHub repositories</li>
            <li>Explore projects by topic, language, and popularity</li>
            <li>Save favorite repositories for later reference</li>
            <li>Provide a clean and user-friendly interface for browsing</li>
          </ul>
          <br />
          <p className="text-lg text-muted italic">
            This project was also built as a practical exercise to demonstrate real-world React development skills, including state management, API integration, and component-based architecture.
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <h2 className="text-xl font-bold mb-4 text-primary-color"
          style={{ textAlign: "center", marginTop: "10px" }}>Features</h2>
        <section className="glass-card p-6">
          <ul className="list-disc pl-6 text-muted space-y-2">
            <li>Random repository generator</li>
            <li>Advanced search with filters</li>
            <li>Detailed repository view</li>
            <li>Favorites system (saved locally)</li>
            <li>Pagination and structured results</li>
            <li>Light and dark mode themes</li>
          </ul>
        </section>
        <h2 className="text-xl font-bold mb-4 text-primary-color"
          style={{ textAlign: "center", marginTop: "10px" }}>Technologies Used</h2>
        <section className="glass-card p-6">

          <ul className="list-disc pl-6 text-muted space-y-2">
            <li>React (Functional Components & Hooks)</li>
            <li>React Router (Multi-page navigation)</li>
            <li>Redux Toolkit (Global state management)</li>
            <li>GitHub REST API (Data fetching)</li>
            <li>LocalStorage (Favorites persistence)</li>
            <li>Vite & Modern CSS variables</li>
          </ul>
        </section>
      </div>
      <h2 className="text-2xl font-bold mb-6 border-b border-[rgba(255,255,255,0.1)] pb-2"
        style={{ textAlign: "center", marginTop: "10px" }}>What This Project Demonstrates</h2>

      <section className="glass-card p-6">
        <ul className="list-disc pl-8 mb-8 text-lg text-muted space-y-2">
          <li>Clean project structure and reusable components</li>
          <li>Handling asynchronous data and API errors</li>
          <li>Implementing user-friendly features like search and filtering</li>
          <li>Managing global and local state effectively</li>
          <li>Building scalable frontend applications</li>
        </ul>
      </section>
      <h2 className="text-2xl font-bold mb-6 border-b border-[rgba(255,255,255,0.1)] pb-2"
        style={{ textAlign: "center", marginTop: "10px" }}>Future Improvements</h2>

      <section className="glass-card p-6">
        <ul className="list-disc pl-8 mb-8 text-lg text-muted space-y-2">
          <li>User authentication (GitHub login)</li>
          <li>Better recommendation system</li>
          <li>Trending repositories section</li>
          <li>Backend integration for persistent data</li>
          <li>Improved caching and performance optimization</li>
        </ul>
      </section>
    </div>
  );
};

export default About;
