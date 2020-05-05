export class ServiceQueue {
    operatorId: number
    serviceQueueId: number
    serviceQueueDescription: string
    serviceQueueTypeId: number
    dailyLimit: number

    constructor(operatorId: number, serviceQueueId: number, serviceQueueDescription: string,
        serviceQueueTypeId: number, dailyLimit: number) {
        this.operatorId = operatorId
        this.serviceQueueId = serviceQueueId
        this.serviceQueueDescription = serviceQueueDescription
        this.serviceQueueTypeId = serviceQueueTypeId
        this.dailyLimit = dailyLimit
    }
}

