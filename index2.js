// run `node index.js` in the terminal
var express = require('express');
var brain = require('brain.js');

var app = express();

app.get('/', function (req, res) {
  res.send('Hi.');

  networkTrain();
});

app.listen(8080);

let netConfig = null,
  trainingConfig = null,
  net = null;

if (netConfig == null) {
  netConfig = {
    inputSize: 2,
    hiddenLayers: [6],
    outputSize: 1,
  };
}

if (trainingConfig == null) {
  trainingConfig = {
    // Defaults values --> expected validation
    iterations: 20000, // the maximum times to iterate the training data --> number greater than 0
    errorThresh: 0.005, // the acceptable error percentage from training data --> number between 0 and 1
    log: false, // true to use console.log, when a function is supplied it is used --> Either true or a function
    logPeriod: 10, // iterations between logging out --> number greater than 0
    learningRate: 0.3, // scales with delta to effect training rate --> number between 0 and 1
    momentum: 0.1, // scales with next layer's change value --> number between 0 and 1
    callback: null, // a periodic call back that can be triggered while training --> null or function
    callbackPeriod: 10, // the number of iterations through the training data between callback calls --> number greater than 0
    timeout: Infinity, // the max number of milliseconds to train for --> number greater than 0
  };
}

var status = {
  NetworkClasses: NetworkClasses,
  Method: method,
  TrainingData: JSON.stringify(trainingData),
  NetworkType: networkType,
  NetConfig: netConfig,
  trainingConfig: trainingConfig,
};

const NetworkClasses = {
  NeuralNetwork: 'NeuralNetwork',
  NeuralNetworkGPU: 'NeuralNetworkGPU',
  RNN: 'RNN',
  LSTM: 'LSTM',
  GRU: 'GRU',
  RNNTimeStep: 'RNNTimeStep',
  LSTMTimeStep: 'LSTMTimeStep',
  GRUTimeStep: 'GRUTimeStep',
};

function networkTrain() {
  console.log('networkTrain :>>');

  switch (networkType) {
    case NetworkClasses.NeuralNetwork:
      net = new brain.NeuralNetwork(netConfig);
      break;
    case NetworkClasses.NeuralNetworkGPU:
      net = new brain.NeuralNetworkGPU(netConfig);
      break;

    case NetworkClasses.RNN:
      net = new brain.recurrent.RNN(netConfig);
      break;
    case NetworkClasses.LSTM:
      net = new brain.recurrent.LSTM(netConfig);
      break;
    case NetworkClasses.GRU:
      net = new brain.recurrent.GRU(netConfig);
      break;

    case NetworkClasses.RNNTimeStep:
      net = new brain.recurrent.RNNTimeStep(netConfig);
      break;
    case NetworkClasses.LSTMTimeStep:
      net = new brain.recurrent.LSTMTimeStep(netConfig);
      break;
    case NetworkClasses.GRUTimeStep:
      net = new brain.recurrent.GRUTimeStep(netConfig);
      break;
  }

  // net.train(trainingData, netConfig);
  // status.outputNetwork = net;
}

networkTrain(net, trainingData, netConfig, res, status);
