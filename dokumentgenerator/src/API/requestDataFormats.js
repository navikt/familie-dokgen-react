export default {
    letterGenJsonParams(name, interleavingFields, markdownContent, format) {
        return {
            "templateName": name,
            "interleavingFields": interleavingFields,
            "markdownContent": markdownContent,
            "format": format
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
