
const styles = {
  welcomeBackgroundColor: {
    //background: 'radial-gradient(circle at center, rgba(65, 162, 72, 0.4), rgba(65, 162, 72, 0.1))',
    borderRadius: '15px',
    paddingLeft: '30px',
    paddingRight: '30px',
    paddingTop: '60px',
    paddingBottom: '60px',
    display: 'flex',
    justifyItems: 'center',
  },
  textfield: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: '5px',
  },
  linkTypography: {
    textDecoration: 'none',
    textShadow: '1px 1px 2px black',
    color: 'white'
  },
  whiteTypography: {
    textShadow: '1px 1px 2px black',
    color: 'white'
  }, blackTypography: {
    color: 'black'
  },
  textIncludedInForm: {
    fontSize: '10px',
    width: '100%',
    marginBottom: '8px',
    color: 'grey'
  },
  formBackground: {
    backgroundColor: 'rgba(161,136,127, 0.60)',
    width: 'fit-content',
    padding: '30px',
    borderRadius: '15px',
    marginTop: '35px',
  },
  dashboardBackground: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '80vw',
    // background:
    //   'radial-gradient(circle at center, rgba(65, 162, 72, 0.4), rgba(65, 162, 72, 0.0))',
    borderRadius: '15px',
    paddingLeft: '30px',
    paddingRight: '30px',
    paddingTop: '100px',
    paddingBottom: '100px',
    height: 'fit-content',
  },
  closeButton: {
    width: '25px',
    height: '25px',
    padding: '0px',
    marginLeft: '0.5rem',
    border: '1px solid black',
    borderRadius: '3px',
  },
  addButton: {
    padding: '0px',
    minWidth: '5px',
    height: '40px',
    width: '40px',
  },
  userProfileBOX: {
    display: "flex",
  },
  userProfileIMG: {
    margin: "5px",
  },
  userProfileInfo: {
    margin: "5px",
  },
  siteBackground: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'top',
    paddingTop: '75px',
    minHeight: "calc(100vh - 56px)",
    height: "fit-content"
  },
  savingsplanDate: {
    color: "#676d98"
  },
  savingsPlanInfo: {
    color: "#1976D2"
  }
};


export default styles;