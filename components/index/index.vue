<template>
<div class="my-5">
  <h1 class="text-center">welcome dashboard</h1>
  <div class="container">
    <v-row class="m-3">
      <v-card class="col-md-3 col-12">
        <v-card-media fill-height src="https://i.pinimg.com/originals/ea/37/df/ea37df8d51c2c4bcc27c1708fff6c9d6.jpg" height="400px"></v-card-media>
          <v-card-title primary-title>
              <div>
                  <h3 class="headline mb-0">dsads</h3>
              </div>
          </v-card-title>
        </v-card>
    </v-row>
  </div>
</div>
</template>

 
<script>
 


export default {

  head() {
    return {
      title: "dashboard",
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$i18n.t('Home-header') +' '+this.$i18n.t('Home-header2'),
        },
      ],
    }
  },

}
</script>
<style scoped>
.ServicesHome {
  background: #f8f8f8;
  padding: 40px 0px;
}



.section_mov {
    position: absolute;
    width: 100%;
    height: 124px;
    overflow: hidden;
    margin-top: -137px;
    z-index: 1;
}

.section_mov .wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: url(/wave.png);
  background-size: 1000px 100px;
}

.section_mov .wave.wave1 {
  animation: animate 30s linear infinite;
  z-index: 1000;
  opacity: 0.7;
  animation-delay: 0s;
  bottom: 0;
  -webkit-animation: animate 30s linear infinite;
}

@keyframes animate {
  0% {
    background-position-x: 0;
  }
  100% {
    background-position-x: 1000px;
  }
}

.section_mov .wave.wave2 {
   
  animation: animate2 15s linear infinite;
  z-index: 999;
  opacity: 0.8;
  animation-delay: -5s;
  bottom: 10px;
  -webkit-animation: animate2 15s linear infinite;
}

@keyframes animate2 {
  0% {
    background-position-x: 0;
  }
  100% {
    background-position-x: 1000px;
  }
}

.section_mov .wave.wave3 {
  animation: animate3 5s linear infinite;
  z-index: 998;
  opacity: 0.5;
  animation-delay: -3s;
  bottom: 15px;
  -webkit-animation: animate3 5s linear infinite;
}

@keyframes animate3 {
  0% {
    background-position-x: 0;
  }
  100% {
    background-position-x: 1000px;
  }
}

.section_mov .wave.wave4 {
  animation: animate4 15s linear infinite;
  z-index: 997;
  opacity: 0.7;
  animation-delay: -5s;
  bottom: 20px;
  -webkit-animation: animate4 15s linear infinite;
}

@keyframes animate4 {
  0% {
    background-position-x: 0;
  }
  100% {
    background-position-x: 1000px;
  }
}

</style>
