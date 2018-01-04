import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import commonStyle from '../../commonStyle';
import fieldValidation from '../../utils/fieldValidation';
import TextInput from '../../inputControls/textInput';
import DatePicker from '../../inputControls/datePicker';
import Button from '../../inputControls/button';

const RegisterFirst = ({
  pristine, handleSubmit, submitting, error,
}) => {
  const {
    required, alphabets, maxLength40, date, maxLength20, normalizeDate,
  } = fieldValidation;
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <View style={{ margin: 10 }}>{!!error && <Text>{error}</Text>}</View>
      <View style={{ margin: 10 }}>
        <Text style={commonStyle.text}>First Name</Text>
        <Field
          name="FirstName"
          component={TextInput}
          validate={[required, alphabets, maxLength40]}
          placeholder="First Name"
          returnKeyType="next"
          onSubmitEditing={() => {
            this.lastName.focus();
          }}
        />
      </View>
      <View style={{ margin: 10 }}>
        <Text style={commonStyle.text}>Last Name</Text>
        <Field
          name="LastName"
          component={TextInput}
          validate={[required, alphabets, maxLength40]}
          placeholder="Last Name"
          inputRef={(el) => {
            this.lastName = el;
          }}
          returnKeyType="next"
          onSubmitEditing={() => {
            this.birthDate.focus();
          }}
        />
      </View>
      <View style={{ margin: 10 }}>
        <Text style={commonStyle.text}>Birth Date</Text>
        <Field
          name="BirthDate"
          component={DatePicker}
          validate={[required, date]}
          placeholder="MM/DD/YYYY"
          normalize={normalizeDate}
          returnKeyType="next"
          keyboardType="numeric"
          inputRef={(el) => {
            this.birthDate = el;
          }}
          onSubmitEditing={() => {
            this.ssn.focus();
          }}
        />
      </View>
      <View style={{ borderWidth: StyleSheet.hairlineWidth, margin: 5, borderRadius: 4 }}>
        <View style={{ margin: 10 }}>
          <Text style={commonStyle.text}>Social Security Number</Text>
          <Field
            name="SSN"
            component={TextInput}
            validate={[maxLength20]}
            placeholder="Social Security Number"
            inputRef={(el) => {
              this.ssn = el;
            }}
            returnKeyType="next"
            onSubmitEditing={() => {
              this.medicaidId.focus();
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 10,
          }}
        >
          <View style={{ flex: 1, borderTopWidth: StyleSheet.hairlineWidth }} />
          <Text style={[commonStyle.text, { paddingHorizontal: 10 }]}>OR</Text>
          <View style={{ flex: 1, borderTopWidth: StyleSheet.hairlineWidth }} />
        </View>
        <View style={{ margin: 10 }}>
          <Text style={commonStyle.text}>Medicaid ID</Text>
          <Field
            name="MemberId"
            component={TextInput}
            validate={[maxLength20]}
            placeholder="Medicaid ID"
            inputRef={(el) => {
              this.medicaidId = el;
            }}
            returnKeyType="next"
            onSubmitEditing={() => !(pristine || submitting) && handleSubmit()}
          />
        </View>
      </View>
      <View style={{ margin: 10 }}>
        <Button
          text="Next"
          onPress={() => !(pristine || submitting) && handleSubmit()}
          disabled={pristine || submitting}
          submitting={submitting}
        />
      </View>
    </ScrollView>
  );
};

RegisterFirst.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

RegisterFirst.defaultProps = {
  error: '',
};

export default reduxForm({
  form: 'registerFirst',
})(RegisterFirst);
