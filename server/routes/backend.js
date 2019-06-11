import { IndexController, TensorflowController } from '../controllers';

export default function (server) {
  const indexCtrl = new IndexController(server);
  const tensorCtrl = new TensorflowController(server);

  server.route({
    path: '/api/arcanna/list_indices',
    method: 'GET',
    handler(req, reply) {
      indexCtrl.listIndices(req, reply);
    }
  });


  server.route({
    path: '/api/arcanna/list_jobs',
    method: 'GET',
    handler(req, reply) {
      indexCtrl.getJobList(req, reply);
    }
  });

  server.route({
    path: '/api/arcanna/put_job',
    method: 'POST',
    handler(req, reply) {
      indexCtrl.putJob(req, reply);
    }
  })

  server.route({
    path: '/api/arcanna/get_incident',
    method: 'POST',
    handler(req, reply) {
      indexCtrl.getFeedbackBatch(req, reply);
    }
  });

  server.route({
    path: '/api/arcanna/give_feedback',
    method: 'POST',
    handler(req, reply) {
      indexCtrl.giveFeedback(req, reply);
    }
  });

  server.route({
    path:'/api/arcanna/tensorflow/train',
    method: 'POST',
    handler(req, reply) {
      tensorCtrl.train(req, reply)
    }
  });

  server.route({
    path:'/api/arcanna/tensorflow/evaluate',
    method: 'POST',
    handler(req, reply) {
      tensorCtrl.evaluate(req, reply)
    }
  });

  server.route({
    path:'/api/arcanna/tensorflow/pause',
    method: 'POST',
    handler(req, reply) {
      tensorCtrl.pause(req, reply)
    }
  });


  server.route({
    path:'/api/arcanna/tensorflow/stop',
    method: 'POST',
    handler(req, reply) {
      tensorCtrl.stop(req, reply)
    }
  });

  server.route({
    path:'/api/arcanna/tensorflow/health_check',
    method: 'GET',
    handler(req, reply) {
      tensorCtrl.healthCheck(req, reply);
    }
  })
}
