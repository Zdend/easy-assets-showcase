import { withFormik } from 'formik';
import { FilterFormValues } from './types';

const initialState: FilterFormValues = {
  type: null,
  serviceType: null,
  city: undefined
};

const withCompanyFilterFormik = withFormik<any, FilterFormValues>({
  mapPropsToValues: () => ({
    ...initialState
  }),
  handleSubmit: async (_values, actions) => {
    actions.setTouched({ type: false, serviceType: false, city: false });
  }
});

export default withCompanyFilterFormik;
