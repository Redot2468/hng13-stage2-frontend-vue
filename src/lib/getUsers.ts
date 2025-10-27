export const getUser = () => {
  const session = localStorage.getItem('ticketapp_session')
  return session ? JSON.parse(session) : null
}

export function logoutUser() {
  localStorage.removeItem('ticketapp_session')
}
