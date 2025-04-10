import React from 'react';

const RatingsMatrix = ({ ratings, models }) => {
    return (
        <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">Ratings Matrix</h2>
            <div className="overflow-x-auto">
                <table className="table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border p-2 bg-gray-100">From / To</th>
                            {models.map(model => (
                                <th key={model} className="border p-2 bg-gray-100">{model}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {models.map(fromModel => (
                            <tr key={fromModel}>
                                <td className="border p-2 bg-gray-100 font-medium">{fromModel}</td>
                                {models.map(toModel => (
                                    <td key={toModel} className="border p-2 text-center">
                                        {ratings?.[fromModel]?.[toModel] || 'None'}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RatingsMatrix;
