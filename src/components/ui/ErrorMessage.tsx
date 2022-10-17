import { ErrorMessage as ErrorMessageFormik } from 'formik';

interface Props {
  name: string;
}

const ErrorMessage = ({ name }: Props) => (
  <ErrorMessageFormik
    name={name}
    render={(error) => <p className="text-red-600">{error}</p>}
  />
);

export default ErrorMessage;
