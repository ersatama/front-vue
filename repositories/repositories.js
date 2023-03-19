import user from "/repositories/user/user"
import portalProject from "./portalProject/portalProject";

export const repository = ($axios) => ({
    user: user($axios),
    portalProject: portalProject($axios),
});