import {VALIDATION_KEYS} from '../Constants';

function nameValidator(text) {
  const nameRegex = /^[\p{Arabic}a-zA-Z ]+\h?[\p{Arabic}a-zA-Z ]*$/;
  if (nameRegex.test(text)) {
    return true;
  }
  return false;
}

function phoneValidator(text) {
  const mobileRegex = /\d{10}/;
  if (mobileRegex.test(text)) {
    return true;
  }
  return false;
}

function otpValidator(text) {
  const otp = /^\d{6}$/;
  if (otp.test(text)) {
    return true;
  }
  return false;
}

function pincodeValidator(text) {
  const pincodeRegex = /[1-9]\d{5}/;
  if (pincodeRegex.test(text)) {
    return true;
  }
  return false;
}

function emailValidator(text) {
  const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  if (emailRegex.test(text)) {
    return true;
  }
  return false;
}

function passwordValidator(text) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (passwordRegex.test(text)) {
    return true;
  }
  return false;
}

export function priceValidation(text) {
  let data = JSON.parse(text);
  return Math.ceil(data);
}

const isValidate = (inputKey, inputField, label) => {
  switch (inputKey) {
    case VALIDATION_KEYS.NAME: {
      if (nameValidator(inputField) === false) {
        // return `${label} field is required.`;
        return true;
      }
      return false;
    }
    case VALIDATION_KEYS.MOBILE: {
      if (phoneValidator(inputField) === false) {
        // return 'Enter a valid 10 digit no.';
        return true;
      }
      return false;
    }
    case VALIDATION_KEYS.EMAIL: {
      if (emailValidator(inputField) === false) {
        return true;
      }
      return false;
    }
    case VALIDATION_KEYS.PASSWORD: {
      if (passwordValidator(inputField) === false) {
        return true;
      }
      return false;
    }
    case VALIDATION_KEYS.OTP: {
      if (otpValidator(inputField) === false) {
        return true;
      }
      return false;
    }
    case VALIDATION_KEYS.PINCODE: {
      if (pincodeValidator(inputField) === false) {
        // return 'Enter a valid PinCode.';
        return true;
      }
      return false;
    }
    default:
      return false;
  }
};

export default isValidate;
