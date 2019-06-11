
// import { Client } from 'elasticsearch';


export class TensorflowController {
  constructor(server) {
    this.server = server;
    this.tfEndpointUrl = this.server.config().get('arcanna.endpoint.url');
    this.tfEndpointToken = this.server.config().get('arcanna.endpoint.token');
    this.tfEndpointHeader = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    // this.esClient = new Client({
    //   host: server.config().get('elasticsearch.url')
    // });
  }

  async train(req, reply) {
    // console.log(this.server.config().get('arcanna_v_1.endpoint.url'));
    try {
      const jobId = req.payload.jobId;
      const body = {
        token: this.tfEndpointToken,
        action: 'TRAIN',
        jobId: jobId
      };
      const fetch = require('node-fetch');
      fetch(this.tfEndpointUrl +'/api/v1/execute', {
        method: "POST",
        headers: this.tfEndpointHeader,
        body: JSON.stringify(body)
      }).then(response => {
        reply({response: response.json()});
      }).catch(err => {
        console.error(err);
        reply({error: err});
      });
    } catch(err) {
      console.error(err);
      reply({error: err});
    }
  }

  async evaluate(req, reply) {
    try {
      const jobId = req.payload.jobId;
      const body = {
        token: this.tfEndpointToken,
        action: 'EVALUATE',
        jobId: jobId
      };

      console.log(JSON.stringify(body));
      const fetch = require('node-fetch');
      fetch(this.tfEndpointUrl +'/api/v1/execute', {
        method: "POST",
        headers: this.tfEndpointHeader,
        body: JSON.stringify(body)
      }).then(response => {
        reply({response: response.json()});
      }).catch(err => {
        console.error(err);
        reply({error: err});
      });
    } catch(err) {
      console.error(err);
      reply({error: err});
    }
  }

  async pause(req, reply) {
    try {
      const jobId = req.payload.jobId;
      const body = {
        token: this.tfEndpointToken,
        action: 'PAUSE',
        jobId: jobId
      };
      const fetch = require('node-fetch');
      fetch(this.tfEndpointUrl +'/api/v1/execute', {
        method: "POST",
        headers: this.tfEndpointHeader,
        body: JSON.stringify(body)
      }).then(response => {
        reply({response: response.json()});
      }).catch(err => {
        console.error(err);
        reply({error: err});
      });
    } catch(err) {
      console.error(err);
      reply({error: err});
    } 
  }

  async stop(req, reply) {
    try {
      const jobId = req.payload.jobId;
      const body = {
        token: this.tfEndpointToken,
        action: 'STOP',
        jobId: jobId
      };
      const fetch = require('node-fetch');
      fetch(this.tfEndpointUrl +'/api/v1/execute', {
        method: "POST",
        headers: this.tfEndpointHeader,
        body: JSON.stringify(body)
      }).then(response => {
        reply({response: response.json()});
      }).catch(err => {
        console.error(err);
        reply({error: err});
      });
    } catch(err) {
      console.error(err);
      reply({error: err});
    } 
  }

  async healthCheck(req, reply) {
    try {
      const body = {
        token: this.tfEndpointToken
      };
      const fetch = require('node-fetch');
      fetch(this.tfEndpointUrl +'/api/v1/health_check', {
        method: "POST",
        headers: this.tfEndpointHeader,
        body: JSON.stringify(body)
      }).then(response => {
        reply({response: response.json()});
      }).catch(err => {
        console.error(err);
        reply({error: err});
      });
    } catch(err) {
      console.error(err);
      reply({error: err});
    }
  }
}