import { RoleString } from "src/shared/config";

export interface IUserToken {
    sub: number;
    email: string;
    banned: boolean;
    organizationId: number;
    roles: RoleString[];
}
