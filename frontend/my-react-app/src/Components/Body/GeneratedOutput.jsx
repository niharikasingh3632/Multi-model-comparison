import React from 'react';

const GeneratedOutput = ({ responses }) => {
    const formatText = (text) => {
        let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>');

        formattedText = formattedText.split('*').map((line, index) => {
            if (index === 0) return line;
            return `<li>${line.trim()}</li>`;
        }).join('');

        if (formattedText.includes('<li>')) {
            formattedText = `<ul>${formattedText}</ul>`;
        }

        return formattedText;
    };

    // Convert object to array safely
    const responseArray = responses && typeof responses === 'object'
        ? Object.entries(responses).map(([model, response]) => ({ model, response }))
        : [];

    return (
        <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">Generated Outputs</h2>
            {responseArray.length === 0 ? (
                <p className="text-gray-500">No responses generated yet.</p>
            ) : (
                responseArray.map((res, index) => (
                    <div key={index} className="mb-8">
                        <div className="p-4 bg-white shadow-lg rounded-lg">
                            <h3 className="font-semibold text-lg mb-2 text-blue-500">
                                {res.model} Response:
                            </h3>
                            <div className="space-y-4 text-gray-800">
                                <div
                                    className="leading-relaxed"
                                    dangerouslySetInnerHTML={{
                                        __html: formatText(res.response)
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default GeneratedOutput; // ✅ This is essential!
