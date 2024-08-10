public with sharing class RequestHistoryService {
    @AuraEnabled
    public static void saveRequestHistory(String method, String endpoint, String headers, String body, String response ) {
        API_Request_History__c history = new API_Request_History__c();
        history.Method__c = method;
        history.Endpoint__c = endpoint;
        history.Headers__c = headers;
        history.Body__c = body;
        history.Response__c = response;
        insert history;
    }

    @AuraEnabled
    public static List<API_Request_History__c> getRequestHistory() {
        return [SELECT Id, Method__c, Endpoint__c FROM API_Request_History__c ORDER BY CreatedDate DESC LIMIT 10];
    }
}