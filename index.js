var request = require('request');

const authorize_url = ' https://auth.brightidea.com/_oauth2/authorize?client_id=90f97ace679a11e9a3060a720a822d3c&response_type=code&redirect_uri=https%3A%2F%2Fwww.theowlnest.tk%2Foauth%2Fredirect'

const token_url = 'https://auth.brightidea.com/_oauth2/token'

const brain = require('brain.js');
const fs = require('fs');
const data = require('./assets/train.json');
const networkPath = 'cached_network.json';

const metas = ['Redução de custos',
    'Qualidade (reclamação e refugo)',
    'Índice de segurança e saúde',
    'Aumento de disponibilidade de máquina',
    'Inovação em produtos e serviços',
    'Aumento de performance de máquina',
    'Meio ambiente',
    'Não identificado - uso exclusivo da Luna']

const network = new brain.recurrent.LSTM();

const trainingData = data.map(item => ({
  input: item.input,
  output: item.output
}));

let networkData = null;
if (fs.existsSync(networkPath)) {
  networkData = JSON.parse(fs.readFileSync(networkPath));
  network.fromJSON(networkData);
} else {
  network.train(trainingData, {
    iterations: 500
  });
  fs.writeFileSync(networkPath, JSON.stringify(network.toJSON(), null, 2));
}

const output = network.run('nova opção ao produto com melhoria no serviço');

console.log(`Categoria: ${metas[output-1]}`);