import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import makePaymentRequest from '@salesforce/apex/MTNMoMoServiceLWC.makePaymentRequest';

export default class MtnMoMoComponent extends LightningElement {
    @track phoneNumber = '';
    @track amount = '';

    handlePhoneNumberChange(event) {
        this.phoneNumber = event.target.value;
    }

    handleAmountChange(event) {
        this.amount = event.target.value;
    }

    handleMakePayment() {
        if(this.phoneNumber && this.amount) {
            makePaymentRequest({ phoneNumber: this.phoneNumber, amount: this.amount })
                .then(result => {
                    // Handle successful payment request
                    console.log('Payment successful, transaction ID: ', result);
                    this.showToast('Success', 'Payment created successfully!', 'success');
                })
                .catch(error => {
                    // Handle errors
                    console.error('Error making payment request: ', error);
                    this.showToast('Error', 'Error making payment request.', 'error');
                });
        } else {
            // Handle missing input fields
            console.error('Phone number and amount are required.');
            this.showToast('Error', 'Phone number and amount are required.', 'error');
        }
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(event);
    }
}