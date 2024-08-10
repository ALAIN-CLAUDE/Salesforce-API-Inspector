public with sharing class MockDataService {
    @AuraEnabled
    public static String generateMockData() {
        Map<String, Object> mockData = new Map<String, Object>();
        mockData.put('Name', 'TestName');
        mockData.put('Id', '001xx000003NGp0AAG');
        return JSON.serialize(mockData);
    }
}