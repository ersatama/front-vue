import user from "/repositories/user/user"

export const repository = ($axios) => ({
    user: user($axios)
});