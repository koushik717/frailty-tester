import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetStage } from "../../store/slices/stageSlice";
import { useGetAllResultsQuery, useDeleteResultMutation } from "../../services/resultAPI";
import { setLoading, setError } from "../../store/slices/resultSlice";

const ResultCard = ({ result, index, onDelete }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <div className="flex justify-between">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">
          {new Date(result.timestamp).toLocaleDateString()}
        </h3>
        <p className="text-gray-600">Age: {result.userAge} years</p>
        <p className="text-gray-600">
          Average Balance: {result.averageBalanceTime.toFixed(2)}s
        </p>
        <p className={`font-semibold ${
          result.assessment.category === "Below Average" ? "text-red-500" :
          result.assessment.category === "Average" ? "text-green-500" :
          "text-blue-500"
        }`}>
          {result.assessment.category}
        </p>
      </div>
      <button
        onClick={() => onDelete(index)}
        className="h-8 px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
      >
        Delete
      </button>
    </div>

    <div className="mt-4 pt-4 border-t">
      <h4 className="font-semibold mb-2">Attempts:</h4>
      <div className="grid grid-cols-3 gap-2">
        {result.attempts.map((attempt, i) => (
          <div key={i} className="bg-gray-50 p-2 rounded text-sm">
            <p>{attempt.foot} foot</p>
            <p className="font-semibold">{attempt.balanceScore.toFixed(2)}s</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const HistoryScreen = () => {
  const dispatch = useDispatch();
  const { data: results, isLoading, error } = useGetAllResultsQuery();
  const [deleteResult] = useDeleteResultMutation();

  const handleDelete = async (index) => {
    if (!window.confirm("Are you sure you want to delete this result?")) return;
    
    try {
      dispatch(setLoading(true));
      await deleteResult(index).unwrap();
    } catch (err) {
      dispatch(setError("Failed to delete result"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">Loading history...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-red-500">Error: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Test History</h1>
        <button
          onClick={() => dispatch(resetStage())}
          className="px-6 py-2 bg-lightBlue text-white rounded-md hover:bg-darkBlue"
        >
          Back to Test
        </button>
      </div>

      <div className="space-y-4">
        {results?.testResults?.length > 0 ? (
          results.testResults.map((result, index) => (
            <ResultCard
              key={index}
              result={result}
              index={index}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">
            No test results available
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryScreen;