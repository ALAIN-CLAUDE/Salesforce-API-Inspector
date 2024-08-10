import { LightningElement, track } from 'lwc';
import getRequestHistory from '@salesforce/apex/RequestHistoryService.getRequestHistory';

export default class RequestHistory extends LightningElement {
    @track history = [];

    connectedCallback() {
        this.loadHistory();
    }

    async loadHistory() {
        this.history = await getRequestHistory();
    }
}