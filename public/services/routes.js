

import uiRoutes from 'ui/routes';

import listJobsTemplate from '../templates/list_jobs.html';
import createJobTemplate from '../templates/create_job.html';
import createJobMappingsTemplate from '../templates/create_job_mappings.html';
import createJobSettingsTemplate from '../templates/create_job_settings.html';
import feedbackTemplate from '../templates/feedback.html';
import feedbackNextTemplate from '../templates/feedback_next.html';
import homepageTemplate from '../templates/homepage.html';


uiRoutes.enable();

uiRoutes
  .when('/', {
    template: homepageTemplate,
    controller:'homepageController',
    controllerAs: 'ctrl'
  })
  .when('/list_jobs', {
    template: listJobsTemplate,
    controller: 'listJobsController',
    controllerAs: 'ctrl'
  })
  .when('/create_job', {
    template: createJobTemplate,
    controller: 'createJobController',
    controllerAs: 'ctrl'
  })
  .when('/create_job_mappings', {
    template: createJobMappingsTemplate,
    controller: 'createJobMappingsController',
    controllerAs: 'ctrl'
  })
  .when('/create_job_settings', {
    template: createJobSettingsTemplate,
    controller: 'createJobSettingsController',
    controllerAs: 'ctrl'
  })
  .when('/feedback', {
    template: feedbackTemplate,
    controller: 'feedbackController',
    controllerAs: 'ctrl'
  })
  .when('/feedback_next', {
    template: feedbackNextTemplate,
    controller: 'feedbackNextController',
    controllerAs: 'ctrl'
  });