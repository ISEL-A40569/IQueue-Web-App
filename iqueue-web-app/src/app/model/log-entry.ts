export class LogEntry {
    logId: number
    logCreationDateTime: Date
    requestMethod: string
    requestUri: string
    requestHeaders: string
    requestBody: string
    responseStatus: number
    responseHeaders: string
    responseBody: string
}

