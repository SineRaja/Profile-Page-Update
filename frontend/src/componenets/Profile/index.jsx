/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import axios from '../../tools/api';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'tailwindcss/tailwind.css';

const ProfileSchema = Yup.object().shape({
  first_name: Yup.string().required('Required'),
  last_name: Yup.string().required('Required'),
  country: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phone_number: Yup.string().required('Required'),
  profilePicture: Yup.mixed(),
});

function Profile({ user }) {
  const [initialValues, setInitialValues] = useState({
    first_name: '',
    last_name: '',
    country: '',
    city: '',
    email: '',
    phone_number: '',
    profilePicture: null,
  });

  useEffect(() => {
    if (user.id) {
      axios.get(`/users/${user.id}`)
        .then((response) => {
          setInitialValues(response.data);
        })
        .catch((error) => {
          console.error('There was an error fetching the user profile!', error);
        });
    }
  }, [user.id]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">{user.id ? 'Update Profile' : 'Create Profile'}</h1>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={ProfileSchema}
        onSubmit={(values, { setSubmitting }) => {
          const formData = new FormData();
          Object.entries(values).forEach(([key, value]) => {
            if (key === 'profilePicture' && value) {
              formData.append(key, value);
            } else if (value !== null && value !== undefined) {
              formData.append(key, value);
            }
          });

          const request = user.id
            ? axios.put(`/users/${user.id}`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
            : axios.post('/users', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });

          request
            .then((response) => {
              console.log(response.data);
              setSubmitting(false);
            })
            .catch((error) => {
              console.error('Error:', error);
              setSubmitting(false);
            });
        }}
      >
        {({ setFieldValue }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">First Name</label>
              <Field id="first_name" name="first_name" type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
              <ErrorMessage name="first_name" component="div" className="text-red-600 text-sm" />
            </div>

            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Last Name</label>
              <Field id="last_name" name="last_name" type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
              <ErrorMessage name="last_name" component="div" className="text-red-600 text-sm" />
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
              <Field id="country" name="country" type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
              <ErrorMessage name="country" component="div" className="text-red-600 text-sm" />
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
              <Field id="city" name="city" type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
              <ErrorMessage name="city" component="div" className="text-red-600 text-sm" />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <Field id="email" name="email" type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
              <ErrorMessage name="email" component="div" className="text-red-600 text-sm" />
            </div>

            <div>
              <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <Field id="phone_number" name="phone_number" type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
              <ErrorMessage name="phone_number" component="div" className="text-red-600 text-sm" />
            </div>

            <div>
              <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">Profile Picture</label>
              <input
                id="profilePicture"
                name="profilePicture"
                type="file"
                className="mt-1 block w-full"
                onChange={(event) => {
                  setFieldValue('profilePicture', event.currentTarget.files[0]);
                }}
              />
              <ErrorMessage name="profilePicture" component="div" className="text-red-600 text-sm" />
            </div>

            <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

Profile.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    email: PropTypes.string,
  }),
};

Profile.defaultProps = {
  user: { id: null, email: '' },
};

export default Profile;
