import { LightningElement, track } from 'lwc';
import makeApiCall from '@salesforce/apex/APIService.makeApiCall';
import saveRequestHistory from '@salesforce/apex/RequestHistoryService.saveRequestHistory';

export default class ApiInspector extends LightningElement {
    @track method = 'GET';
    @track endpoint = '';
    @track headers = '';
    @track body = '';
    @track response = null;

    handleMethodChange(event) {
        this.method = event.target.value;
    }

    handleInputChange(event) {
        const field = event.target.name;
        this[field] = event.target.value;
    }

    async handleSendRequest() {
        try {
            const result = await makeApiCall({ method: this.method, endpoint: this.endpoint, headers: this.headers, body: this.body });
            this.response = result;
            console.log('this.response------------> ',JSON.stringify(this.response));
            saveRequestHistory({ method: this.method, endpoint: this.endpoint, headers: this.headers, body: this.body });
        } catch (error) {
            this.response = error;
        }
    }
}