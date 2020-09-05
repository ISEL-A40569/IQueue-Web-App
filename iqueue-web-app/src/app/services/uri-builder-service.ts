export class UriBuilderService {
    readonly protocol = 'https://'
    readonly host = 'localhost'
    readonly port = ':8443'
    readonly commonPath = '/api/iqueue/'

    private buildUri(variablePath: string): string {
        return `${this.protocol}${this.host}${this.port}${this.commonPath}${variablePath}`
    }

    public getLoginUri(): string {
        return this.buildUri('login')
    }

    public getOperatorsUsersUri(): string {
        return this.buildUri('operator/user')
    }

    public getOperatorUsersUri(operatorId: number): string {
        return this.buildUri(`operator/${operatorId}/user`)
    }

    public getUserOperatorsUri(userId: string): string {
        return this.buildUri(`operator/user/${userId}`)       
    }

    public getOperatorUserUri(operatorId: number, userId: number): string {
        return this.buildUri(`operator/${operatorId}/user/${userId}`)
    }

    public getUserDeskUri(userId: string): string {
        return this.buildUri(`desk/user/${userId}`)
    }

    public getUserUri(userId: string): string {
        return this.buildUri(`user/${userId}`)
    }

    public getUsersUri(): string {
        return this.buildUri('user')
    }

    public getUserProfileUri(languageId: string): string {
        return this.buildUri(`userprofile?languageId=${languageId}`)
    }

    public getServiceQueueStatisticsUri(serviceQueueId: number): string {
        return this.buildUri(`servicequeue/${serviceQueueId}/statistics`)
    }

    public getServiceQueueAttendancesUri(serviceQueueId: number): string {
        return this.buildUri(`attendance?serviceQueueId=${serviceQueueId}`)
    }

    public getAttendanceClassificationUri(attendanceId: number): string {
        return this.buildUri(`attendance/${attendanceId}/classification`)
    }

    public getServiceQueueUri(serviceQueueId: number): string {
        return this.buildUri(`servicequeue/${serviceQueueId}`)
    }

    public getServiceQueuesUri(): string {
        return this.buildUri('servicequeue')
    }

    public getServiceQueueTypesUri(languageId: string): string {
        return this.buildUri(`servicequeuetype?languageId=${languageId}`)
    }

    public getOperatorServiceQueuesUri(operatorId: string): string {
        return this.buildUri(`servicequeue?operatorId=${operatorId}`)
    }

    public getServiceQueueWaitingCountUri(deskId: string): string {
        return this.buildUri(`servicequeue/waitingcount/${deskId}`)
    }

    public getNextAttendanceUri(deskId: string): string {
        return this.buildUri(`attendance/next/${deskId}`)
    }

    public getAttendanceUri(attendanceId: number): string {
        return this.buildUri(`attendance/${attendanceId}`)
    }

    public getAttendanceTicketUri(attendanceId: number): string {
        return this.buildUri(`attendance/${attendanceId}/ticket`)
    }

    public getUserCredentialsUri(userId: string): string {
        return this.buildUri(`user/${userId}/credentials`)
    }

    public getOperatorBeaconUri(operatorId: number, beaconId: number): string {
        return this.buildUri(`operator/${operatorId}/beacon/${beaconId}`)
    }

    public getOperatorBeaconsUri(operatorId: number): string {
        return this.buildUri(`operator/${operatorId}/beacon`)
    }

    public getOperatorsBeaconsUri(): string {
        return this.buildUri('operator/beacon')
    }

    public getOperatorsUri(): string {
        return this.buildUri('operator')
    }

    public getOperatorUri(operatorId: number): string {
        return this.buildUri(`operator/${operatorId}`)
    }

    public getLogUri(): string {
        return this.buildUri('log')
    }

    public getLanguageUri(): string {
        return this.buildUri('language')
    }

    public getDeskUserUri(deskId: number, userId: number): string {
        return this.buildUri(`desk/${deskId}/user/${userId}`)
    }

    public getDeskUsersUri(deskId: number): string {
        return this.buildUri(`desk/${deskId}/user/`)
    }

    public getDesksUsersUri(): string {
        return this.buildUri(`desk/user/`)
    }

    public getDeskUri(deskId: number): string {
        return this.buildUri(`desk/${deskId}`)
    }

    public getDesksUri(): string {
        return this.buildUri('desk')
    }

    public getServiceQueueDesks(serviceQueueId: number): string {
        return this.buildUri(`desk?serviceQueueId=${serviceQueueId}`)
    }

    public getBeaconUri(beaconId: number): string {
        return this.buildUri(`beacon/${beaconId}`)
    }

    public getBeaconsUri(): string {
        return this.buildUri('beacon')
    }
}