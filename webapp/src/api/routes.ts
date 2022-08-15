export const API_ROUTES = {
    STATUS: "/status",
    ROLES: "/roles",
    TAGS: "/tags",
    DIFFICULTIES: "/difficulties",
    LITIGATION_OBJECTS: "/litigation-objects",
    DISCOUNT_TYPES: "/types-discounts",
    APPAEARANCES: "/appearances",
    PRICINGS: "/pricings",
    ORGANIZATION_JOBS: (id: string): string => `organizations/${id}/jobs`,
    ORGANIZATION_MEMBERS: (id: string): string => `organizations/${id}/members`,
    ORGANIZATION_FAVORITES: (id: string): string => `organizations/${id}/favorites`,
    ORGANIZATION_CURRENT_SUBSCRIPTION: (id: string): string => `organizations/${id}/current-subscription`,
    ORGANIZATION_SUBSCRIPTIONS: (id: string): string => `organizations/${id}/subscriptions`,
    ORGANIZATION_UPDATE_SUBSCRIPTION: (id: string): string => `organizations/${id}/subscriptions/change`,
    ORGANIZATION_UPDATE_LOGO: (id: string): string => `organizations/logo/${id}`,
    ORGANIZATION_UPDATE_BANNER: (id: string): string => `organizations/banner/${id}`,
    ORGANIZATION_UPDATE_MEMBER_ROLE: (id: string): string => `organizations/member/${id}`,
    ORGANIZATION_INVITE: (id: string) => `/organizations/${id}/invite`,
    REQUEST_ORGANIZATION: (id: string) => `/organizations/${id}/request`,
    JOBS: '/jobs',
    JOB: (id: string) => `/jobs/${id}`,
    SUBSCRIPTIONS: "/subscriptions",
    LITIGATIONS: "/litigations",
    ORGANIZATIONS: "/organizations",
    PARTNERS: "/partners",
    USERS: "/users",
    ADMIN: "/admin",
    AUTH: "/auth",
    AUTH_CONNECTED: "/auth/connected"
} as const

export type Route = typeof API_ROUTES[keyof typeof API_ROUTES]

// export type Route = BaseRoute | `${BaseRoute}/${string}` 