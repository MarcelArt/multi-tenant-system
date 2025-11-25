type UserOrganizationStatus = 'active' | 'pending';

export interface UserOrganizationPage {
    ID: number;
    userId: number;
    username: string;
    email: string;
    organizationId: number;
    shortName: string;
    longName: string;
    status: UserOrganizationStatus;
}

export interface InviteUser {
    userIds: number[];
    organizationId: number;
}

export interface UserOrganizationDto {
    userId: number;
    organizationId: number;
    status: UserOrganizationStatus;
}