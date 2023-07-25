import * as yup from 'yup';

export const seatingLayoutValidationSchema = yup.object().shape({
  layout_name: yup.string().required(),
  restaurant_id: yup.string().nullable(),
});
