import * as tf from "@tensorflow/tfjs";

/**
 * @file TensorFlowInitial.js
 * @description Initializes TensorFlow.js and sets the computation backend.
 */

/**
 * Initializes TensorFlow.js and sets the backend for processing.
 * Ensures TensorFlow is ready before using it in pose detection.
 * @returns {Promise<void>} A promise that resolves when TensorFlow is fully initialized.
 */
export const initializeTensorFlow = async () => {
  await tf.ready(); // Ensure TensorFlow.js is fully loaded
  
  await tf.setBackend("cpu"); // Use CPU backend to avoid GPU adapter issues
  
  console.log("TensorFlow.js is ready with backend:", tf.getBackend());
};
