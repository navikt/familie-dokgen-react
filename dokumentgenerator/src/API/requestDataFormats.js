export function letterGenJson(name, interleavingFields, markdownContent, format) {
    return {
        "templateName": name,
        "interleavingFields": {},
        "markdownContent": markdownContent,
        "format": format
    }
}
