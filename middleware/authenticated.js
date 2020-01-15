export default function ({ store, redirect }) {
  if (!store.state.customer.auth) return redirect('/login')
}
