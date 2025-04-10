import React, { useState } from 'react';
import { toast } from 'sonner'; 

const ModelSelector = ({ onModelSelection }) => {
    const availableModels = [
        'meta-llama/llama-4-scout-17b-16e-instruct',
        'llama3-8b-8192',
        'deepseek-r1-distill-llama-70b',
        'gemma2-9b-it',
        'qwen-qwq-32b',
        'deepseek-r1-distill-qwen-32b',
        'llama-3.3-70b-versatile',
        'qwen-2.5-32b',
    ];

    const uniqueModels = [...new Set(availableModels)];

    const [selectedModels, setSelectedModels] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [buttonText, setButtonText] = useState('Select Models');

    const handleModelChange = (e) => {
        const value = e.target.value;
        setSelectedModels((prev) =>
            prev.includes(value) ? prev.filter((model) => model !== value) : [...prev, value]
        );
    };

    const handleSelection = async () => {
        setIsSubmitting(true);
        setButtonText('Selecting...');
        setTimeout(() => {
            onModelSelection(selectedModels);
            toast.success("Models selected successfully!");
            setIsSubmitting(false);
            setButtonText('Select Models');
        }, 2000);
    };

    const handleSelectAll = () => {
        if (selectedModels.length === uniqueModels.length) {
            setSelectedModels([]); // Deselect all
        } else {
            setSelectedModels(uniqueModels); // Select all
        }
    };

    return (
        <div className="mt-6">
            <h2 className="text-xl font-medium mb-1">Select Models</h2>
            <h3 className='text-xs text-gray-600 mb-1'>Select less models for faster results</h3>
            <h3 className='text-xs text-gray-600 mb-4'>Caution: Due to API limits there might be some errors (especially in Deepseek models) give it some time and try again </h3>

            <div className="mb-4">
                <button
                    onClick={handleSelectAll}
                    className="bg-gray-300 text-black py-1 px-3 rounded shadow hover:bg-gray-400 transition"
                >
                    {selectedModels.length === uniqueModels.length ? 'Deselect All' : 'Select All Models'}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {uniqueModels.map((model) => (
                    <label key={model} className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            value={model}
                            onChange={handleModelChange}
                            checked={selectedModels.includes(model)}
                            className="w-5 h-5"
                        />
                        <span className="text-lg">{model}</span>
                    </label>
                ))}
            </div>

            <button
                onClick={handleSelection}
                className="mt-6 bg-blue-600 text-white py-2 px-5 rounded-xl text-lg shadow-md hover:bg-blue-700 transition"
                disabled={isSubmitting}
            >
                {buttonText}
            </button>
        </div>
    );
};

export default ModelSelector;
