export default function ({store, route, redirect}) {
    let repositories    =   store.state.repositories;
    if (repositories.user.user) {
        if (route.name !== 'dashboard') {
            return redirect('/dashboard');
        }
    }
}