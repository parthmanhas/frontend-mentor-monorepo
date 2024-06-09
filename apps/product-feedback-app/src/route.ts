export const publicRoutes = [
    '/login'
]

export const protectedRoutes = [
    '/create',
    '/edit',
    '/home',
    '/id/:id',
    '/edit/:id'
]

export const apiAuthPrefix = '/api/auth';

export const DEFAULT_LOGIN_REDIRECT = '/home';