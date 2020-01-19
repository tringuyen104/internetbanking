import Vue from 'vue'
import vi from 'vee-validate/dist/locale/vi'
import VeeValidate, { Validator } from 'vee-validate'
// Custom rules
// Validator.extend('is_not', (value, args) => !value || value.toLowerCase() !== args[0].toLowerCase());
// Validator.extend('no_angle_brackets', (value) => !value || /^[^<>]+$/.test(value));

// https://baianat.github.io/vee-validate/configuration.html
const validationOptions = {
  aria: true, // Generate aria attributes
  classes: true, // Use the built-in validation classes on elements
  fieldsBagName: 'formFields' // using boostrap table vue
}

// Ready to go
Vue.use(VeeValidate, validationOptions)
Validator.localize('vi', vi)
