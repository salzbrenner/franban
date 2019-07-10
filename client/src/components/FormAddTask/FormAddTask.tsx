import React, { Component, RefObject } from 'react';
import {
  Field,
  InjectedFormProps,
  reduxForm,
} from 'redux-form';
import { connect } from 'react-redux';
import './FormAddTask.css';
import { addTask } from 'redux/modules/tasks';

export interface FormAddTaskValues {
  name: string;
  listId: number;
  submit: Function;
}

interface XXX {
  listId: any;
  addTask?: typeof mapDispatchToProps;
}

type YYY = InjectedFormProps<{}, XXX> & XXX;

class FormAddTask extends Component<YYY> {
  formRef: RefObject<HTMLDivElement>;
  openRef: RefObject<HTMLDivElement>;
  state = {
    formVisible: false,
  };

  constructor(props: YYY) {
    super(props);
    this.formRef = React.createRef();
    this.openRef = React.createRef();
    this.openForm = this.openForm.bind(this);
    this.checkDomEl = this.checkDomEl.bind(this);
    this.submit = this.submit.bind(this);
  }

  openForm() {
    this.setState({
      formVisible: true,
    });
  }

  checkDomEl(e: Event) {
    if (e.target === this.openRef.current) {
      return;
    }

    if (!this.state.formVisible) {
      return;
    }

    if (this.formRef.current) {
      const node = e.target as HTMLDivElement;

      if (!this.formRef.current.contains(node)) {
        this.setState({
          formVisible: false,
        });
      }
    }
  }

  componentDidMount(): void {
    document.addEventListener('click', this.checkDomEl);
  }

  componentWillUnmount(): void {
    document.removeEventListener('click', this.checkDomEl);
  }

  submit({ name }: any): void {
    const { addTask, listId } = this.props;
    addTask(name, listId);
  }

  renderForm(): React.ReactNode {
    const {
      pristine,
      submitting,
      handleSubmit,
    } = this.props;
    return (
      <div className={'form-add-task'} ref={this.formRef}>
        <form onSubmit={handleSubmit(this.submit)}>
          <div className={'form-add-task__fields'}>
            <Field
              name="name"
              component="input"
              type="text"
              placeholder="Task Name"
            />
          </div>
          <div>
            <button
              type={'submit'}
              disabled={pristine || submitting}
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    );
  }

  render(): React.ReactNode {
    return (
      <>
        <div
          className={'form-add-task__open'}
          ref={this.openRef}
          onClick={this.openForm}
        >
          +
        </div>
        {this.state.formVisible && this.renderForm()}
      </>
    );
  }
}

const mapDispatchToProps: any = {
  addTask,
};

const reduxFormAddTask = reduxForm<{}, XXX>({
  form: 'addTask', // a unique identifier for this form
})(FormAddTask);

export default connect(
  null,
  mapDispatchToProps
)(reduxFormAddTask);
