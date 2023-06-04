import { Form } from 'react-bootstrap';
import { FieldError, RegisterOptions, UseFormRegister } from 'react-hook-form';

interface TextInputFieldProps {
  name: string;
  label: string;
  register: UseFormRegister<any>;
  registerOptions?: RegisterOptions;
  error?: FieldError;
  dropdown?: boolean; // New prop to indicate whether to render a dropdown
  [x: string]: any;
}

const TextInputField = ({
  name,
  label,
  register,
  registerOptions,
  error,
  dropdown = false, // Default value is false if the prop is not provided
  ...props
}: TextInputFieldProps) => {
  if (dropdown) {
    return (
      <Form.Group className='mb-3' controlId={name + '-input'}>
        <Form.Label>{label}</Form.Label>
        <Form.Select
          {...props}
          {...register(name, registerOptions)}
          isInvalid={!!error}
        >
          {[...Array(10)].map((_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type='invalid'>
          {error?.message}
        </Form.Control.Feedback>
      </Form.Group>
    );
  }

  return (
    <Form.Group className='mb-3' controlId={name + '-input'}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        {...props}
        {...register(name, registerOptions)}
        isInvalid={!!error}
      />
      <Form.Control.Feedback type='invalid'>
        {error?.message}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default TextInputField;

// import { Form } from 'react-bootstrap';
// import { FieldError, RegisterOptions, UseFormRegister } from 'react-hook-form';

// interface TextInputFieldProps {
//   name: string;
//   label: string;
//   register: UseFormRegister<any>;
//   registerOptions?: RegisterOptions;
//   error?: FieldError;
//   [x: string]: any;
// }

// const TextInputField = ({
//   name,
//   label,
//   register,
//   registerOptions,
//   error,
//   ...props
// }: TextInputFieldProps) => {
//   return (
//     <Form.Group className='mb-3' controlId={name + '-input'}>
//       <Form.Label>{label}</Form.Label>
//       <Form.Control
//         {...props}
//         {...register(name, registerOptions)}
//         isInvalid={!!error}
//       />
//       <Form.Control.Feedback type='invalid'>
//         {error?.message}
//       </Form.Control.Feedback>
//     </Form.Group>
//   );
// };

// export default TextInputField;
