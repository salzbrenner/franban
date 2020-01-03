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

interface OwnProps {
  listId: any;
  addTask?: typeof mapDispatchToProps;
}

type FormAddTaskProps = InjectedFormProps<{}, OwnProps> &
  OwnProps;

class FormAddTask extends Component<FormAddTaskProps> {
  formRef: RefObject<HTMLDivElement>;
  openRef: RefObject<HTMLDivElement>;
  state = {
    formVisible: false,
  };

  constructor(props: FormAddTaskProps) {
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
        const { reset } = this.props;

        this.setState({
          formVisible: false,
        });
        reset();
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
    const { reset } = this.props;
    addTask(name, listId).then(() => {
      this.setState({
        formVisible: false,
      });
      reset();
    });
  }

  renderForm(): React.ReactNode {
    const {
      pristine,
      submitting,
      handleSubmit,
    } = this.props;
    return (
      <div className={'form-add-task'} ref={this.formRef}>
        <form
          onSubmit={handleSubmit(this.submit)}
          autoComplete={'off'}
        >
          <div className={'form-add-task__fields'}>
            <Field
              name="name"
              component="input"
              type="text"
              placeholder="Task Name"
            />
          </div>
          <div className={`form-add-task__submit-wrap`}>
            <button
              className={`form-add-task__submit`}
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

const reduxFormAddTask = reduxForm<{}, OwnProps>({
  form: 'addTask', // a unique identifier for this form
})(FormAddTask);

export default connect(
  null,
  mapDispatchToProps
)(reduxFormAddTask);
