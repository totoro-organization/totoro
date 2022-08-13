export const API_ROUTES = {
    STATUS: "/status",
    ROLES: "/roles",
    TAGS: "/tags",
    DIFFICULTIES: "/difficulties",
    LITIGATION_OBJECTS: "/litigation-objects",
    DISCOUNT_TYPES: "/types-discounts",
    APPAEARANCES: "/appearances",
    PRICINGS: "/pricings",
    JOBS: "/jobs",
    SUBSCRIPTIONS: "/subscriptions",
    LITIGATIONS: "/litigations",
    ORGANIZATIONS: "/organizations",
    PARTNERS: "/partners",
    USERS: "/users",
    ADMIN: "/admin",
    FAVORITES: "/favorites",
    AUTH: "/auth",
    AUTH_CONNECTED: "/auth/connected"
} as const

type BaseRoute = typeof API_ROUTES[keyof typeof API_ROUTES]

export type Route = BaseRoute | `${BaseRoute}/${string}` 