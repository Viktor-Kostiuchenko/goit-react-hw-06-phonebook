import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import s from './Form.module.css';
import actions from '../../redux/contacts/contacts-actions';

const schema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan",
    )
    .required(''),
  number: Yup.string()
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +',
    )
    .required(''),
});

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const dispatch = useDispatch();

  const onSubmitHandler = data => {
    dispatch(actions.addContact(data));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div className={s.inputBox}>
        <input
          className={s.input}
          type="text"
          {...register('name')}
          id="name"
        />
        <label className={s.label} htmlFor="name">
          Name
        </label>
        <p className={s.errorMsg}>{errors.name?.message}</p>
      </div>
      <div className={s.inputBox}>
        <input
          className={s.input}
          type="tel"
          {...register('number')}
          id="number"
        />
        <label className={s.label} htmlFor="number">
          Number
        </label>
        <p className={s.errorMsg}>{errors.number?.message}</p>
      </div>
      <button className={s.button} type="submit">
        <span className={s.buttonName}>Add contact</span>
      </button>
    </form>
  );
}
