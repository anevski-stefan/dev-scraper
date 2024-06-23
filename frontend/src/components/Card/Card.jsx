import React from 'react';

const Card = ({ title, link, tags }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg bg-white flex flex-col h-full">
      <div className="px-6 py-4 flex-1">
        <div className="font-bold text-xl mb-2">{title}</div>
        {tags && tags.length > 0 ? (
          <div className="mt-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              {tags.join(' ')}
            </span>
          </div>
        ) : (
          <div className="mt-2 text-gray-500 italic">
            No tags available
          </div>
        )}
      </div>
      <div className="px-6 py-4 bg-gray-100">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-800 text-sm font-semibold self-end"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

export default Card;
