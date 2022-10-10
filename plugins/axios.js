export default function ({ $axios, app }, inject) {
  // Create a custom axios instance
  const axios = $axios.create({
    headers: {
      common: {
        'Accept': "application/json",
        'Content-Type': 'multipart/form-data',
        'Vary':'X-HTTP-Method-Override',
        'Content-Type': 'application/json',
        'Authorization':app.$cookies.get('Authorization'),
      }
    }
  })

  axios.setBaseURL('https://66.29.155.80:5004')
  inject('axios', axios)
}
