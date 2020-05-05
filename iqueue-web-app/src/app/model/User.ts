export class User {
    userId: number
    userName: string
    email: string
    phoneNumber: number
    address: string
    userProfileId: number

    constructor(userId: number, userName: string, email: string, phoneNumber: number,
        address: string, userProfileId: number) {
        this.userId = userId
        this.userName = userName
        this.email = email
        this.phoneNumber = phoneNumber
        this.address = address
        this.userProfileId = userProfileId
    }
}
