import React from 'react';
import { useNavigate } from 'react-router-dom';
import TestIntroCard from '../../components/TestIntroCard';
import { Volume2, Mic, Gauge, Radio, CheckCircle } from 'lucide-react';

const HearingTestIntro = () => {
    const navigate = useNavigate();

    const instructions = [
        {
            icon: <Volume2 />,
            title: "dB HL Test",
            text: "Measures the minimum volume you can hear with smartphone calibration for accurate results.",
        },
        {
            icon: <Mic />,
            title: "DIN (Digits-in-Noise) Test",
            text: "Assesses your ability to understand speech in noisy environments.",
        },
        {
            icon: <Gauge />,
            title: "TGD (Temporal Gap Detection) Test",
            text: "Detects small silent gaps in noise. May indicate attention and processing speed deficits.",
        },
        {
            icon: <Radio />,
            title: "Frequency Range Test",
            text: "Identifies the highest frequency (pitch) you can hear.",
        },
        {
            icon: <CheckCircle />,
            title: "Requirements",
            text: "🎧 Headphones (strongly recommended) • 🔇 Quiet environment • ⏱️ 10-15 minutes",
        },
    ];

    return (
        <TestIntroCard
            title="Hearing Test Suite"
            instructions={instructions}
            buttonText="Start Hearing Test"
            onClick={() => navigate('/tests/hearing-test')}
        />
    );
};

export default HearingTestIntro;
