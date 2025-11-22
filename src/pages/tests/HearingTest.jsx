import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const HearingTest = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Optional: Listen for postMessage from iframe if we want to capture results
        const handleMessage = (event) => {
            // Validate origin for security
            if (event.origin !== window.location.origin) return;

            // Handle test results if needed
            if (event.data.type === 'hearing-test-complete') {
                console.log('Hearing test results:', event.data.results);
                // Could save results to backend here
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header with back button */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <button
                        onClick={() => navigate('/tests/hearing-intro')}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5" />
                        <span className="font-medium">Back to Instructions</span>
                    </button>
                </div>
            </div>

            {/* Iframe container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <iframe
                        src="/hearing-test/index.html"
                        title="Hearing Test"
                        className="w-full"
                        style={{ height: 'calc(100vh - 200px)', minHeight: '600px', border: 'none' }}
                        allow="autoplay; microphone"
                        sandbox="allow-scripts allow-same-origin allow-forms"
                    />
                </div>
            </div>
        </div>
    );
};

export default HearingTest;
