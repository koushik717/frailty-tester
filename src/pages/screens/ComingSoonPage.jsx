import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PageSection from "../../components/PageSection";

const ComingSoonPage = ({ testName }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageSection className="text-center py-20">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-neutral-light p-12">
            <div className="mb-8">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-amber-600 text-2xl">⏳</span>
              </div>
              <h1 className="text-3xl font-bold text-neutral-dark mb-4 font-montserrat">
                {testName || "Test"} Coming Soon
              </h1>
              <p className="text-lg text-neutral-medium leading-relaxed font-sans">
                This assessment is currently in development and will be available soon. 
                We're working hard to bring you the most accurate and reliable health assessments.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-neutral-dark mb-2 font-montserrat">
                  What to expect:
                </h3>
                <ul className="text-neutral-medium text-left space-y-2 font-sans">
                  <li>• Scientifically validated assessment methodology</li>
                  <li>• Easy-to-use interface with clear instructions</li>
                  <li>• Detailed results with actionable insights</li>
                  <li>• Progress tracking over time</li>
                </ul>
              </div>
              
              <Link
                to="/"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium text-white bg-primary hover:bg-[#34C759] transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </PageSection>
    </div>
  );
};

export default ComingSoonPage; 