import React, { Component, RefObject } from 'react';
import {
  Field,
  InjectedFormProps,
  reduxForm,
} from 'redux-form';
import { connect } from 'react-redux';
import './FormAddTask.css';

type Props = typeof mapDispatchToProps &
  InjectedFormProps & {};

class FormAddTask extends Component<Props> {
  formRef: RefObject<HTMLDivElement>;
  openRef: RefObject<HTMLDivElement>;
  state = {
    formVisible: false,
  };

  constructor(props: Props) {
    super(props);
    this.formRef = React.createRef();
    this.openRef = React.createRef();
    this.openForm = this.openForm.bind(this);
    this.checkDomEl = this.checkDomEl.bind(this);
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

  renderForm(): React.ReactNode {
    return (
      <div className={'form-add-task'} ref={this.formRef}>
        <form onSubmit={() => console.log('HELLO')}>
          <div className={'form-add-task__fields'}>
            <Field
              name="name"
              component="input"
              type="text"
              placeholder="Enter list title..."
            />
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

const mapDispatchToProps: any = {};

const reduxFormAddTask = reduxForm({
  form: 'addTask', // a unique identifier for this form
})(FormAddTask);

export default connect(
  null,
  mapDispatchToProps
)(reduxFormAddTask);
