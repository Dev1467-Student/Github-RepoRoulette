import React from 'react';
import { useSelector } from 'react-redux';
import topicsData from '../data/topics.json';
import { translations } from '../locales/translations';

const TopicSelector = ({ selectedTopic, onChange }) => {
  const lang = useSelector((state) => state.lang.current);
  const t = translations[lang];

  // Group topics by category
  const groupedTopics = topicsData.topics.reduce((acc, topic) => {
    if (!acc[topic.category]) {
      acc[topic.category] = [];
    }
    acc[topic.category].push(topic);
    return acc;
  }, {});

  return (
    <div className="mb-6 w-full max-w-md mx-auto">
      <label htmlFor="topic-select" className="block mb-2 font-medium" style={{ textAlign: 'center' }}>
        {t.selectTopic}
      </label>
      <select 
        id="topic-select" 
        value={selectedTopic} 
        onChange={(e) => onChange(e.target.value)}
        className="select-input"
      >
        <option value="">{t.chooseTopic}</option>
        {Object.entries(groupedTopics).map(([category, topics]) => (
          <optgroup key={category} label={category.toUpperCase()}>
            {topics.map(topic => (
              <option key={topic.id} value={topic.name}>
                {topic.name}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
};

export default TopicSelector;
