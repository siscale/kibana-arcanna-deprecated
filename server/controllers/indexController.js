
import { Client } from 'elasticsearch';

export class IndexController {
  constructor(server) {
    this.server = server;
    this.settings = {
      jobsIndex: '.arcanna-jobs',
      jobsIndexType: '_doc'
    };
    this.esClient = server.plugins.elasticsearch.getCluster('data');
  }

  async listIndices(req, reply) {
    const { callWithRequest } = this.esClient;
    try {
      const results = await callWithRequest(req, 'cluster.state', {
        metric: 'metadata',
        index: req.params.name
      })
      const jsonResp = JSON.stringify(results.metadata.indices);
      return jsonResp;
    } catch (error) {
      console.error(error);
      return { error: error };
    }

  }

  async putJob(req, reply) {
    const self = this;
    const { callWithRequest } = this.esClient;
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

      await callWithRequest(req, 'index', {
        index: self.settings.jobsIndex,
        type: '_doc',
        body: body,
        refresh: "true"
      });
      // await self.esClient.index({
      //   index: self.settings.jobsIndex,
      //   type: '_doc',
      //   body: body,
      //   refresh: "true"
      // });
      return { success: true };

    } catch (error) {
      console.error(error);
      return { error: error };
    }
    // } catch(error) {
    //   reply(error);
    // }
  }

  async getJobList(req, reply) {
    const self = this;
    const { callWithRequest } = self.esClient;
    try {
      const rawSearchRes = await callWithRequest(req, 'search', {
        index: self.settings.jobsIndex
      });

      const jobsResults = [];

      rawSearchRes.hits.hits.forEach((hit) => {
        const source = hit._source;
        source._id = hit._id;
        jobsResults.push(source);
      });

      return jobsResults;
    } catch (err) {
      console.error(err);
      return { error: err };
    }

  }

  async getFeedbackBatch(req, reply) {
    const self = this;
    const { callWithRequest } = self.esClient;
    try {
      const jobId = req.payload.jobId.toLowerCase();
      const jobIndex = ".arcanna-job-" + jobId;

      const feedbackGivenRes = await callWithRequest(req, 'search', {
        index: jobIndex,
        body: {
          size: 1,
          query: {
            bool: {
              must_not: [
                {
                  match: {
                    tags: "feedback_given"
                  }
                }
              ]
            }
          }
        }
      });
      // const feedbackGivenRes = await self.esClient.search({
      //   index: indexList,
      //   body: {
      //     size: 1,
      //     query: {
      //       match: {
      //         "arcanna.arcanna_feedback_given": false
      //       }
      //     }
      //   }
      // });
      if (feedbackGivenRes.hits.hits.length > 0) {
        const batch_id = feedbackGivenRes.hits.hits[0]._source.batch_id;
        const incidentRes = await callWithRequest(req, 'search', {
          index: indexList,
          body: {
            query: {
              match: {
                "batch_id": batch_id
              }
            }
          }
        });
        // const incidentRes = await self.esClient.search({
        //   index: indexList,
        //   body: {
        //     query: {
        //       match: {
        //         "arcanna.arcanna_incident_id": incidentId
        //       }
        //     }
        //   }
        // });

        let documents = [];
        incidentRes.hits.hits.forEach(hit => {
          const source = hit._source;
          documents.push({ _id: hit._id, arcanna: source.arcanna, hit: hit });

        });
        return { incident: documents };

      } else {
        return { incident: [] };
      }


    } catch (err) {
      console.error(err);
      return { error: err };
    }
  }

  async giveFeedback(req, reply) {
    const self = this;
    const { callWithRequest } = self.esClient;
    try {
      console.log(JSON.stringify(req.payload));
      const docList = req.payload.events;
      const body = [];
      docList.forEach((doc) => {
        body.push({ update: { _index: doc.indexName, _type: '_doc', _id: doc.id } });
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
      const resp = await callWithRequest(req, 'bulk', {
        body: body,
        refresh: "true"
      });
      console.log(JSON.stringify(resp));
      return { success: true };
    } catch (err) {
      console.error(err);
      return { error: err };
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