
import { GenericRequest } from '../utils/requests';


export class HomepageController {
  constructor(
    $scope
  ) {
    this.$scope = $scope;
    this.genericRequest = new GenericRequest();
  }

  $onInit() {
    this.load();
    return;
  }

  async load() {
    // const indexData = await this.genericRequest.request('list_indices', 'GET');
    // this.indexNames = Object.keys(indexData);
  }

}