import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';

const HearingTest = () => {
    const navigate = useNavigate();
    const iframeRef = useRef(null);

    useEffect(() => {
        const handleMessage = async (event) => {
            // Verify origin if deployed, but for localhost/same-origin it's fine
            // if (event.origin !== "http://localhost:5173") return;

            if (event.data && event.data.type === 'HEARING_TEST_RESULT') {
                console.log("Received hearing test result:", event.data);

                try {
                    const resultData = {
                        testName: "Hearing Test Suite",
                        testKey: "hearing-test",
                        overallScore: `${event.data.score} dB HL`,
                        assessment: {
                            category: event.data.category,
                            expectedRange: event.data.details?.expectedAge,
                            notes: event.data.details?.explanation
                        }
                    };

                    await axios.post('/api/frailty-tests/results', resultData, { withCredentials: true });
                    alert("Test results saved successfully!");
                    navigate('/profile');
                } catch (error) {
                    console.error("Error saving hearing test results:", error);
                    alert("Failed to save results. Please try again.");
                }
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [navigate]);

    return (
        <div className="w-full h-screen flex flex-col bg-gray-50">
            <div className="bg-white shadow-sm p-4 flex items-center gap-4 z-10">
                <button
                    onClick={() => navigate('/')}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Go back"
                >
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                </button>
                <h1 className="text-xl font-semibold text-gray-800">Hearing Test Suite</h1>
            </div>

            <div className="flex-1 w-full relative">
                <iframe
                    ref={iframeRef}
                    src="/hearing-test/index.html"
                    title="Hearing Test Suite"
                    className="w-full h-full border-0"
                    allow="microphone; autoplay"
                />
            </div>
        </div>
    );
};

export default HearingTest;
