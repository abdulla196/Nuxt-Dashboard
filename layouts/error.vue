<template>
  <div class="page container_cc d-flex align-center justify-center">
    <div class="page_cc text-center">
      <h1 v-if="error.statusCode === 404">Page not found</h1>
      <h1 v-else>An error occurred - {{ error.statusCode }}</h1>
      <v-btn
      depressed
      color="primary" class="mt-3" to="/">Home page</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: ["error"],
  layout: "error", // you can set a custom layout for the error page
};
</script>

 
 