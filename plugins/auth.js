export default async function ({route, store, redirect}) {
    if (process.client) {
        let storage =   store.state.localStorage;
        if (storage.user ) {
            if (route.name !== 'dashboard') {
                window.location.href = '/dashboard';
                //return redirect('/dashboard');
            }
        } else if (route.name === 'dashboard') {
            window.location.href = '/login';
        }
    }
}