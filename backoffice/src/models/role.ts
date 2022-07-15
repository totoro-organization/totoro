export interface Role {
    id: string,
    label: string,
    createdAt: string,
    updatedAt: string,
}

export enum RoleEnum {
    admin = "Administrateur",
    moderator = "Moderateur",
    accountant = "Comptables"
}