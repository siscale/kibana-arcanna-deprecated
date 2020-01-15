
import { GenericRequest } from '../utils/requests';

export class FeedbackBinaryController {
  constructor(
    $scope
  ) {
    this.$scope = $scope;
    // this.$scope.selectedIndexList = selectedIndexList;
    this.genericRequest = new GenericRequest();

  }

  $onInit() {
    this.load();
    return;
  }

  async load() {
  }

}