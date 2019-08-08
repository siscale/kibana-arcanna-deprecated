
import { Client } from 'elasticsearch';

export class IndexController {
  constructor(server) {
    this.server = server;
    this.settings = {
      jobsIndex: '.arcanna-jobs',
      jobsIndexType: '_doc'
    };
    console.log(JSON.stringify(server.config().get("server.host")));
    this.esClient = new Client({
  
      // host: server.config().get('elasticsearch.hosts')[0]
    });
  }

  async listIndices(req, reply) {
    const { callWithRequest } = this.server.plugins.elasticsearch.getCluster('data');
    callWithRequest(req, 'cluster.state', {
      metric: 'metadata',
      index: req.params.name
    }).then(function (response) {
      const jsonResp = JSON.stringify(response.metadata.indices);
      reply(jsonResp);
    });
  }

  async putJob(req, reply) {
    const self = this;
    const jobInfo = req.payload;

    try {
      const body = {
        jobName: jobInfo.jobName,
        createdAt: Date.now(),
        trainingStatus: "NOT_YET_PERFORMED",
        jobStatus: "NOT_STARTED",
        indexData: []
      }
      Object.keys(jobInfo.indexData).forEach((indexName) => {
        const fieldData = [];
        Object.keys(jobInfo.indexData[indexName]['mappings']).forEach((fieldName) => {
          fieldData.push({
            field: fieldName,
            newName: jobInfo.indexData[indexName]['mappings'][fieldName].newMappingName,
            type: jobInfo.indexData[indexName]['mappings'][fieldName].fieldType
          });
        });
        body.indexData.push({
          index: indexName,
          query: jobInfo.indexData[indexName]['query'],
          fields: fieldData
        })
      });


      await self.esClient.index({
        index: self.settings.jobsIndex,
        type: '_doc',
        body: body,
        refresh: "true"
      });
      reply({success: true});

    } catch(error) {
      console.error(error);
      reply({error: error})
    }
    // } catch(error) {
    //   reply(error);
    // }
  }

  async getJobList(req, reply) {
    const self = this;
    try {
      const rawSearchRes = await self.esClient.search({
        index: self.settings.jobsIndex
      });

      const jobsResults = [];

      rawSearchRes.hits.hits.forEach((hit) => {
        const source = hit._source;
        source._id = hit._id;
        jobsResults.push(source);
      });
    
      reply(jobsResults);
    } catch(err) {
      console.error(err);
      reply({error: err});
    }

  }

  async getFeedbackBatch(req, reply) {
    const self = this;
    try {
      const indexList = req.payload.indexList;
      const feedbackGivenRes = await self.esClient.search({
        index: indexList,
        body: {
          size: 1,
          query: {
            match: {
              "arcanna.arcanna_feedback_given": false
            }
          }
        }
      });
      if(feedbackGivenRes.hits.hits.length > 0) {
        const incidentId = feedbackGivenRes.hits.hits[0]._source.arcanna.arcanna_incident_id;
        const incidentRes = await self.esClient.search({
          index: indexList,
          body: {
            query: {
              match: {
                "arcanna.arcanna_incident_id": incidentId
              }
            }
          }
        });

        let documents = [];
        incidentRes.hits.hits.forEach(hit => {
          const source = hit._source;
          documents.push({_id: hit._id, arcanna: source.arcanna, hit: hit});

        });
        reply({incident: documents});

      } else {
        reply({incident: []});
      }


    } catch(err) {
      console.error(err);
      reply({error: err});
    }
  }

  async giveFeedback(req, reply) {
    const self = this;
    try {
      console.log(JSON.stringify(req.payload));
      const docList = req.payload.events;
      const body = [];
      docList.forEach((doc) => {
        body.push({update: {_index: doc.indexName, _type: '_doc', _id: doc.id}});
        body.push({
          doc: {
            arcanna: {
              arcanna_class: doc.status
            },
            arcanna: {
              arcanna_feedback_given: true
            }
          }
        });
      });
      const resp = await self.esClient.bulk({
        body: body,
        refresh: "true"
      })
      console.log(JSON.stringify(resp));
      reply({success: true});
    } catch(err) {
      console.error(err);
      reply({error: err});
    }
  }
  // async getIndexMappings(req, reply) {
  //   // const { callWithRequest } = this.server.plugins.elasticsearch.getCluster('data');
  //   // console.log(req);
  //   console.log(req.payload)
    
  //   // callWithRequest(req, 'cluster.state', {
  //   //   metric: 'metadata',
  //   //   index: req.params.name
  //   // }).then(function (response) {
  //   //   const jsonResp = JSON.stringify(response.metadata.indices);
  //   //   reply(jsonResp);
  //   // });
  // }
}