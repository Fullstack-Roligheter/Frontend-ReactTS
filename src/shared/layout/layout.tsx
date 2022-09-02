import AuthenticatedLayout from "./authenticatedLayout"
import UnauthenticatedLayout from "./unauthenticatedLayout"

const Layout = (props: any) => {
  if (props.user === '') {
    return <UnauthenticatedLayout />
  } else {
    return <AuthenticatedLayout />
  }
}

export default Layout
