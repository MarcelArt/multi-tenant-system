export type PermissionKeys = 'fullAccess' |
    'role#view' |
    'role#manage' |
    'user#view' |
    'user#manage' |
    'organization#view' |
    'organization#manage' |
    'userOrganization#invite' |
    'accessLog#view' |
    'accessLog#manage';

export const FULL_ACCESS: PermissionKeys = 'fullAccess';

export const PERMISSION_MAP: Record<PermissionKeys, string> = {
    'fullAccess': 'Full Access',
    'role#view': 'View Roles',
    'role#manage': 'Manage Users',
    'user#view': 'View Users',
    'user#manage': 'Manage Roles',
    'organization#view': 'View Organizations',
    'organization#manage': 'Manage Organizations',
    'userOrganization#invite': 'Invite User to Organization',
    'accessLog#view': 'View Access Logs',
    'accessLog#manage': 'Manage Access Logs',
}