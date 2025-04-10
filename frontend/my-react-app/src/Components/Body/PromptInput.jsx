// src/Components/PromptInput.jsx
import React, { useState } from 'react';

const PromptInput = ({ onPromptChange }) => {
    const [prompt, setPrompt] = useState('');

    const handleChange = (e) => {
        setPrompt(e.target.value);
        onPromptChange(e.target.value);
    };

    return (
        <div className="p-4">
            <textarea
                className="w-full p-3 border border-gray-300 rounded-md"
                rows="4"
                placeholder="Enter your prompt here..."
                value={prompt}
                onChange={handleChange}
            />
        </div>
    );
};

export default PromptInput;
