import { LightningElement, api, track } from 'lwc';
import generateMockData from '@salesforce/apex/MockDataService.generateMockData';

export default class MockDataGenerator extends LightningElement {
    @track mockData = '';

    async generateData() {
        this.mockData = await generateMockData();
    }
}