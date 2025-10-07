import { Role } from '@prisma/client'

export type Permission =
  | 'user:read'
  | 'user:create'
  | 'user:update'
  | 'user:delete'
  | 'post:read'
  | 'post:create'
  | 'post:update'
  | 'post:delete'
  | 'post:publish'
  | 'service:read'
  | 'service:create'
  | 'service:update'
  | 'service:delete'
  | 'company:read'
  | 'company:update'
  | 'media:read'
  | 'media:upload'
  | 'media:delete'

const rolePermissions: Record<Role, Permission[]> = {
  SUPER_ADMIN: [
    // User management
    'user:read',
    'user:create',
    'user:update',
    'user:delete',
    // All content permissions
    'post:read',
    'post:create',
    'post:update',
    'post:delete',
    'post:publish',
    'service:read',
    'service:create',
    'service:update',
    'service:delete',
    'company:read',
    'company:update',
    'media:read',
    'media:upload',
    'media:delete',
  ],
  ADMIN: [
    // Content management (no user management)
    'post:read',
    'post:create',
    'post:update',
    'post:delete',
    'post:publish',
    'service:read',
    'service:create',
    'service:update',
    'service:delete',
    'company:read',
    'company:update',
    'media:read',
    'media:upload',
    'media:delete',
  ],
  EDITOR: [
    // Can create/edit content but not publish or delete
    'post:read',
    'post:create',
    'post:update',
    'service:read',
    'service:update',
    'company:read',
    'media:read',
    'media:upload',
  ],
  VIEWER: [
    // Read-only access
    'post:read',
    'service:read',
    'company:read',
    'media:read',
  ],
}

export function hasPermission(role: Role, permission: Permission): boolean {
  return rolePermissions[role]?.includes(permission) ?? false
}

export function hasAnyPermission(role: Role, permissions: Permission[]): boolean {
  return permissions.some(permission => hasPermission(role, permission))
}

export function hasAllPermissions(role: Role, permissions: Permission[]): boolean {
  return permissions.every(permission => hasPermission(role, permission))
}

export function getRolePermissions(role: Role): Permission[] {
  return rolePermissions[role] ?? []
}
