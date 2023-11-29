export interface INotice {
    id: number;
    name: string | null;
    content: string;
    writer: IWriter;
    createdAt: string;
    updatedAt: string;
    isFixed: string;
    title: string;
}

export interface IWriter {
    userId: number;
    userAccount: string;
    userPhoneNum: string;
    nickName: string;
    gender: string;
    dateOfBirth: string;
    job: string;
    role: string;
    status: string;
}
