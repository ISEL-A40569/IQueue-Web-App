export class Operator {

    operatorId: number
    operatorDescription: string
    email: string
    phoneNumber: number
    address: string

    constructor(operatorId: number, operatorDescription: string, email: string, phoneNumber: number, address: string) {
        this.operatorId = operatorId
        this.operatorDescription = operatorDescription
        this.email = email
        this.phoneNumber = phoneNumber
        this.address = address
    }
}