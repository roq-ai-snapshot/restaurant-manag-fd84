import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getOperationalHoursById, updateOperationalHoursById } from 'apiSdk/operational-hours';
import { operationalHoursValidationSchema } from 'validationSchema/operational-hours';
import { OperationalHoursInterface } from 'interfaces/operational-hours';
import { RestaurantInterface } from 'interfaces/restaurant';
import { getRestaurants } from 'apiSdk/restaurants';

function OperationalHoursEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<OperationalHoursInterface>(
    () => (id ? `/operational-hours/${id}` : null),
    () => getOperationalHoursById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: OperationalHoursInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateOperationalHoursById(id, values);
      mutate(updated);
      resetForm();
      router.push('/operational-hours');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<OperationalHoursInterface>({
    initialValues: data,
    validationSchema: operationalHoursValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Operational Hours',
              link: '/operational-hours',
            },
            {
              label: 'Update Operational Hours',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Operational Hours
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.day}
            label={'Day'}
            props={{
              name: 'day',
              placeholder: 'Day',
              value: formik.values?.day,
              onChange: formik.handleChange,
            }}
          />

          <FormControl id="open_time" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Open Time
            </FormLabel>
            <DatePicker
              selected={formik.values?.open_time ? new Date(formik.values?.open_time) : null}
              onChange={(value: Date) => formik.setFieldValue('open_time', value)}
            />
          </FormControl>
          <FormControl id="close_time" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Close Time
            </FormLabel>
            <DatePicker
              selected={formik.values?.close_time ? new Date(formik.values?.close_time) : null}
              onChange={(value: Date) => formik.setFieldValue('close_time', value)}
            />
          </FormControl>
          <AsyncSelect<RestaurantInterface>
            formik={formik}
            name={'restaurant_id'}
            label={'Select Restaurant'}
            placeholder={'Select Restaurant'}
            fetcher={getRestaurants}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/operational-hours')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'operational_hours',
    operation: AccessOperationEnum.UPDATE,
  }),
)(OperationalHoursEditPage);
