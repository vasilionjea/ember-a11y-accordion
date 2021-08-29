import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class CollapsibleController extends Controller {
  @action
  onCollapsibleShow() {
    // console.log('onCollapsibleShow');
  }

  @action
  onCollapsibleAfterShow() {
    // console.log('onCollapsibleAfterShow');
  }

  @action
  onCollapsibleHide() {
    // console.log('onCollapsibleHide');
  }
}
