import React, { FC } from 'react';
import {
  Field,
  InjectedFormProps,
  reduxForm,
} from 'redux-form';
import { connect } from 'react-redux';
import ButtonMain from 'components/ButtonMain/ButtonMain';
import './FormAddList.css';
import {
  addList,
  FormAddListValues,
} from 'redux/modules/lists';

type Props = typeof mapDispatchToProps &
  InjectedFormProps & {};

const FormAddList: FC<Props> = props => {
  const {
    handleSubmit,
    pristine,
    submitting,
    reset,
    addList,
  } = props;

  const submit = ({ name, boardId }: FormAddListValues) => {
    return addList(name, boardId).then(() => {
      reset();
    });
  };

  return (
    <div className={'form-add-list'}>
      <form onSubmit={handleSubmit(submit)}>
        <div className={'form-add-list__fields'}>
          <Field
            name="name"
            component="input"
            type="text"
            placeholder="Enter list title..."
          />
        </div>
        <div>
          <ButtonMain
            text={'Add List'}
            type="submit"
            secondary={true}
            disabled={pristine || submitting}
          />
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps: any = {
  addList,
};

const reduxFormAddList = reduxForm({
  form: 'addList', // a unique identifier for this form
})(FormAddList);

export default connect(
  null,
  mapDispatchToProps
)(reduxFormAddList);
