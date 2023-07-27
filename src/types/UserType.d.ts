interface IUser {
    _id?: string;
    firstName: string,
    lastName: string,
    phoneNumber: string,
    age: number
    createdAt?: Date,
    updatedAt?: Date,
}

interface IUserResponse {
    data: IUser;
    message: string;
}

interface IUsersResponse extends IUserResponse {
    data: IUser[];
}