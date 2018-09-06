import SignupHeader from './SignupHeader';
import React from 'react';

import {connect} from 'react-redux';
import {Link , Redirect} from 'react-router-dom';

import '../../styles/landing-page.css';
import ParentSignupForm from '../Forms/ParentSignupForm';

const mapStateToProps = state => ({
  loggedIn: state.auth.user !== null,
  user: state.auth.user,
  parentChoice: state.toggles.loginChoice.parent
});

export function SignupPage(props){
  if(props.loggedIn && props.user.isParent){
    return <Redirect to='/parent_dashboard' />;
  } else if(props.loggedIn){
    return <Redirect to='/child_dashboard' />;
  }
  return(
    <div className='signup-page'>
      <div className='one-pager'>
        <SignupHeader />
        <ParentSignupForm />
        <div className='non-members'>
          <h3>Already a member...<br /><Link to='/'>log in here</Link></h3>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(SignupPage);