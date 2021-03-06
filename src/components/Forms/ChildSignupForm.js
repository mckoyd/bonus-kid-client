import Input from '../Forms/Input';
import React from 'react';
import { connect } from 'react-redux';

import {Field, focus, reduxForm} from 'redux-form';
import {isTrimmed, matches, nonEmpty, required} from '../../validators';
import { Redirect } from 'react-router-dom';
import { registerChild }  from '../../actions/auth';

import '../../styles/child-signup-form.css';
import { toggleChildSubmitted } from '../../actions/toggles';

const matchesPassword = matches('signupPassword');

const mapStateToProps = state => ({
  childSubmitted: state.toggles.newChildCreated
});

export class ChildSignupForm extends React.Component {
  render() {
    if (this.props.childSubmitted) {
      return <Redirect to='/parent_dashboard' />;
    }
    return (
      <form
        className='child-signup-form'
        onSubmit={this.props.handleSubmit(values => {
          const { signupUsername, signupPassword, signupName, signupEmail } = values;
          const user = { 
            username: signupUsername, 
            password: signupPassword, 
            name: signupName, 
            email: signupEmail 
          };
          this.props.dispatch(registerChild(user));
          this.props.dispatch(toggleChildSubmitted(true));
        }
        )}>
        <h3 className='child-form-heading'>Add A Child Account</h3>
        <div className='child-form-body'>
          <label htmlFor='signupName'> Child's Name </label>
          <Field component={Input} type='text'
            name='signupName' id='child-signupName'
            validate={[required, nonEmpty, isTrimmed]}
          />
          <label htmlFor='signupUsername'> Child's Username </label>
          <Field component={Input} type='text'
            name='signupUsername' id='child-signupUsername'
            validate={[required, nonEmpty, isTrimmed]}
          />

          <label htmlFor='signupPassword'> Child's Password </label>
          <Field component={Input} type='password'
            name='signupPassword' id='child-signupPassword'
            validate={[required, isTrimmed]}
          />
          <label htmlFor='signupConfirmPassword' aria-label='signupConfirmPassword'>Confirm Child's Password</label>
          <Field type='password' component={Input}
            name='signupConfirmPassword' id='child-signupConfirmPassword'
            validate={[required, nonEmpty, matchesPassword]}/>
          <button
            type="submit" className='child-signup-btn'
            disabled={this.props.pristine || this.props.submitting}>
          Submit
          </button>
        </div>
      </form>
    );
  }
}

export default connect(mapStateToProps)(reduxForm({
  form: 'child-signup-form',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('child-signup-form', Object.keys(errors)[0]))
})(ChildSignupForm));