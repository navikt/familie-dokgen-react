export default {
    letterGenJsonParamsTestset(testSetName, markdownContent, useTestSet, filter={}) {
        return {
            "testSetName": testSetName,
            "markdownContent": markdownContent,
            "useTestSet": useTestSet,
            "filter": filter,
        }
    },
    letterGenJsonParamsFields(interleavingFields, markdownContent, useTestSet) {
        return {
            "interleavingFields": interleavingFields,
            "markdownContent": markdownContent,
            "useTestSet": useTestSet
        }
    },
    letterDownloadPdfParamsTestset(testSetName, useTestSet) {
        return {
            "testSetName": testSetName,
            "useTestSet": useTestSet
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
