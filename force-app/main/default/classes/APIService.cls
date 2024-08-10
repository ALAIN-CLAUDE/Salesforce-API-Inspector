public with sharing class APIService {
    @AuraEnabled
    public static String makeApiCall(String method, String endpoint, String headers, String body) {
        System.debug('headers------------------> '+headers);
        System.debug('headers pretty------------------> '+ JSON.serializePretty(headers));
        HttpRequest req = new HttpRequest();
        req.setEndpoint(endpoint);
        req.setMethod(method);
        req.setHeader('Accept', 'application/json');

        if (headers != null && headers != '') {
            Map<String, String> headerMap = (Map<String, String>) JSON.deserialize(headers, Map<String, String>.class);
            for (String key : headerMap.keySet()) {
                req.setHeader(key, headerMap.get(key));
            }
        }

        if (body != null && body != '') {
            req.setBody(body);
        }

        Http http = new Http();
        HttpResponse res = http.send(req);
        System.debug('res.getBody()------------> '+res.getBody());
        System.debug('res.getBody() 2222222------------> '+JSON.serializePretty(res.getBody()));
        return res.getBody();
    }
}