export interface AccessLogPage {
    ID: number;
    userId: number;
    organizationId: number;
    username: string;
    roles: string[];
    permission: string;
    isAuthorized: boolean;
    message: string;
    createdAt: string;
}