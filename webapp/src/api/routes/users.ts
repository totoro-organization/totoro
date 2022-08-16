export const API_USERS_ROUTES = {
    USERS: '/users',
    USER: (id: string): string => `users/${id}`,
    USER_CHANGE_PASSWORD: '/users/change/password',
    USER_RESET_PASSWORD: '/users/reset/password',
    USER_ACTIVATE_ACCOUNT: '/users/account/activate',
    USER_UPDATE_AVATAR: '/users/change/avatar'
}