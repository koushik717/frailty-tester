/**
 * @file initializeTF.js
 * @description Initializes TensorFlow.js and MoveNet pose detection model with lazy loading
 */

export const initializeTensorFlow = async () => {
  try {
    // Dynamically import TensorFlow and MoveNet
    const poseDetection = await import('@tensorflow-models/pose-detection');
    const tf = await import('@tensorflow/tfjs-core');
    await import('@tensorflow/tfjs-backend-webgl');
    
    // Initialize TensorFlow
    await tf.ready();
    await tf.setBackend("webgl");
    
    console.log("TensorFlow.js is ready with backend:", tf.getBackend());
    
    // Create MoveNet detector - use the correct structure
    const model = poseDetection.SupportedModels.MoveNet;
    const detectorConfig = {
      modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER,
    };
    
    const detector = await poseDetection.createDetector(model, detectorConfig);
    console.log("MoveNet detector loaded successfully");
    
    return detector;
  } catch (error) {
    console.error("Failed to initialize TensorFlow:", error);
    throw error;
  }
};
