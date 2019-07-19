export default {
    letterGenJsonParamsTestset(testSetName, markdownContent) {
        return {
            "testSetName": testSetName,
            "markdownContent": markdownContent,
        }
    },
    letterGenJsonParamsFields(interleavingFields, markdownContent) {
        return {
            "interleavingFields": interleavingFields,
            "markdownContent": markdownContent,
        }
    },
    letterGenJsonHeaders(format) {
        if(format === "html") {
            return {
                headers: {'Content-Type': 'application/json'}
            }
        }
        else if(format === "pdf" || format === "pdfa"){
            return {
                headers: {'Content-Type': 'application/json'},
                responseType: 'blob',
                transformResponse: [function (data) {
                    return new window.Blob([data], { type: 'application/pdf' });
                }]
            }
        }
    }
}
