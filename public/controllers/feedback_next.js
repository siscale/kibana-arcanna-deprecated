
import { GenericRequest } from '../utils/requests';

export class FeedbackNextController {
  constructor(
    $scope
  ) {
    this.$scope = $scope;
    // this.$scope.selectedIndexList = selectedIndexList;
    this.genericRequest = new GenericRequest();
  }

  $onInit() {
    return;
  }


}