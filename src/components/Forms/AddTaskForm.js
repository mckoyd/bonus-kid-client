import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {connect} from 'react-redux';
import Input from '../Forms/Input';
import {required, nonEmpty} from '../../validators';

import '../../styles/add-form.css';
import { postTask } from '../../actions/tasks';
import { toggleAddTaskForm } from '../../actions/toggles';

const mapStateToProps = state => ({
  isAdding: state.toggles.addTaskView.adding,
  id: state.toggles.addTaskView.id
});

export class AddTaskForm extends React.Component {
  render(){
    let error;
    if(this.props.error){
      error = (<div className='form-error'>{this.props.error}</div>);
    }
    return (
      <div className={this.props.isAdding ? 'visible add-menu' : 'add-menu'}
        onSubmit={this.props.handleSubmit(values => {
          const {taskName, pointValue} = values;
          const newTask = {
            name: taskName, 
            pointValue
          };
          this.props.reset();
          this.props.dispatch(toggleAddTaskForm());
          return this.props.dispatch(postTask(this.props.id, newTask));
        })}>
        <h3 className='add-form-heading'>Add A Task</h3>
        <form className='add-form'>
          <div className='add-form-body'>
            {error}
            <label htmlFor='taskName'>Task: </label>
            <Field component={Input} name='taskName'
              type='text' id='addTaskName' placeholder='ex. Wash the dishes'
              validate={[required, nonEmpty]} />
            <label htmlFor='pointValue'>Point Value: </label>
            <Field component={Input} name='pointValue' placeholder='ex. 20'
              type='number' id='addPointValue' validate={[required, nonEmpty]} />
            <button className='add-btn' disabled={this.props.pristine || this.props.submitting}>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps)(reduxForm({
  form: 'add-form',
  onSubmitFail: (errors, dispatch) => dispatch(focus('add-form', 'taskName'))
})(AddTaskForm));