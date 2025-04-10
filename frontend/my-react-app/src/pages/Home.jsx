import React, { useState } from 'react';
import PromptInput from '../Components/Body/PromptInput';
import ModelSelector from '../Components/Body/ModelSelector';
import GeneratedOutput from '../Components/Body/GeneratedOutput';
import RatingsMatrix from '../Components/Body/RatingsMatrix'; // New ratings component

const Home = () => {
    const [prompt, setPrompt] = useState('');
    const [selectedModels, setSelectedModels] = useState([]);
    const [responses, setResponses] = useState({});
    const [ratings, setRatings] = useState({});
    const [isGenerating, setIsGenerating] = useState(false);

    const handlePromptChange = (newPrompt) => {
        setPrompt(newPrompt);
    };

    const handleModelSelection = (models) => {
        setSelectedModels(models);
    };

    const handleGenerateResponses = async () => {
        if (!prompt || selectedModels.length === 0) return;

        setIsGenerating(true);

        try {
            // backend url
            const response = await fetch('https://multi-model-comparison.onrender.com/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: prompt,
                    models: selectedModels,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setResponses(data.responses);
                setRatings(data.ratings);
            } else {
                console.error("Error fetching responses from backend");
            }
        } catch (error) {
            console.error("Request failed:", error);
        }

        setIsGenerating(false);
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-semibold mb-6">AI Model Responses</h1>

            {/* Prompt Input */}
            <PromptInput onPromptChange={handlePromptChange} />

            {/* Model Selector */}
            <ModelSelector onModelSelection={handleModelSelection} />

            {/* Generate Responses Button */}
            <button
                onClick={handleGenerateResponses}
                className={`mt-6 py-2 px-4 rounded ${isGenerating
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-green-500 text-white'
                    }`}
                disabled={isGenerating}
            >
                {isGenerating ? 'Generating...' : 'Generate Responses'}
            </button>

            {/* Generated Output */}
            <GeneratedOutput responses={responses} />

            {/* Ratings Matrix */}
            {Object.keys(ratings).length > 0 && (
                <RatingsMatrix ratings={ratings} models={selectedModels} />
            )}
        </div>
    );
};

export default Home;
