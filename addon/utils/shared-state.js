import { tracked } from '@glimmer/tracking';

export default class SharedState {
  @tracked headerId;
  @tracked isDisabled;
  @tracked isExpanded;
  @tracked name;
  @tracked panelContent;
  @tracked panelId;
  @tracked panelWrapper;
  @tracked triggerId;

  constructor({ headerId, isDisabled, isExpanded, name, panelId, triggerId }) {
    this.headerId = headerId;
    this.isDisabled = isDisabled;
    this.isExpanded = isExpanded;
    this.name = name;
    this.panelId = panelId;
    this.triggerId = triggerId;
  }
}
