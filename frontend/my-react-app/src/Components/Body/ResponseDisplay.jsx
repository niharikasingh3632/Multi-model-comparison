// src/Components/ResponseDisplay.jsx
import React from 'react';

const ResponseDisplay = ({ responses }) => {
    return (
        <div className="p-4">
            {responses.length === 0 ? (
                <p className="text-gray-500">No responses yet.</p>
            ) : (
                responses.map((response, index) => (
                    <div key={index} className="mb-6">
                        <h4 className="font-semibold">Model {index + 1} Response</h4>
                        <p className="text-gray-700">{response}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default ResponseDisplay;
