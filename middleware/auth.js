export default async function ({store, route, redirect}) {
    if (process.client) {
        let storage =   store.state.localStorage;
        if (storage.user) {
            if (route.name !== 'dashboard') {
                return redirect('/dashboard');
            }
        } else {
            console.log(storage);
        }
    } else {
        console.log('hi');
    }
}