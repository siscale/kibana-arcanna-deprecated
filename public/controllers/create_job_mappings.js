
import { GenericRequest } from '../utils/requests';

export class CreateJobMappingsController {
  constructor(
    $scope,
    selectedIndexList
  ) {
    this.$scope = $scope;
    this.selectedIndexList = selectedIndexList;
    this.genericRequest = new GenericRequest();

  }

  $onInit() {
    this.load();
    return;
  }

  async load() {
    // const indexData = await this.genericRequest.request('get_index_mappings', 'POST', JSON.stringify({maBody: 'yeyeye'}));
  }

}