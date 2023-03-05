import { repository } from '~/repositories/repositories'

export default (ctx, inject) => {
    inject('repository', repository(ctx.$axios))
}