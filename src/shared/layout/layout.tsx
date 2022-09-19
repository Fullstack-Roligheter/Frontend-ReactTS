import AuthenticatedLayout from "./authenticatedLayout"
import UnauthenticatedLayout from "./unauthenticatedLayout"
import Paper from '@mui/material/Paper';

import Image from '../../img/newbackground.png'

const styles = {
  paperContainer: {
    backgroundImage: `url(${Image})`,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
  },
};


const Layout = (props: any) => (
  <Paper style={styles.paperContainer}>
    {(() => {
      if (props.user === '') {
        return <UnauthenticatedLayout />;
      } else {
        return <AuthenticatedLayout user={props.user} />;
      }
    })()}
  </Paper>
)

export default Layout
