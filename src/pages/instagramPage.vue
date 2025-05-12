<template>
  <q-page class="flex flex-center">
    <div class="flex flex-center column full width full-height">
      <div class="row">
        <q-avatar
          square
          color="white"
          text-color="red"
          icon="fa-brands fa-square-instagram"
          size="60px"
          font-size="70px"
          class="col-md-12 bg-transparent"
        />
        <p class="text-h4 text-weight-bold">Download Instagram videos</p>
      </div>
      <form @submit.prevent="checkUrl" class="row download-container">
        <div class="col-md-10 col-sm-8">
          <q-input
            outlined
            v-model="instagramUrl"
            id="instagramUrl"
            label="Paste URL here"
            dense
            style="padding: 5px 0px"
          />
        </div>
        <div class="col-md-2 col-sm-2">
          <q-btn
            color="primary"
            text-color="white"
            glossy
            unelevated
            label="Download"
            class="download-btn"
            type="submit"
          />
        </div>
      </form>
      <div class="row" style="width: 100%">
        <div class="col-md-12" style="padding-right: 16px">
          <q-banner
            dense
            inline-actions
            class="text-white bg-red"
            v-if="errorMessage"
          >
            <span style="font-weight: 500">
              {{ errorMessage }}
            </span>
          </q-banner>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      instagramRegex:
        /^(https?:\/\/)?(www\.)?(instagram\.com\/p\/[A-Za-z0-9_-]+\/?)/,
      instagramUrl: "",
      errorMessage: "",
      isValid: false,
    };
  },
  methods: {
    checkUrl() {
      if (this.instagramUrl.match(this.instagramRegex)) {
        this.errorMessage = "";
        console.log("the url is valid");
      } else {
        console.log("it is not valid");
        this.errorMessage = "The URL is not Valid";
      }
    },
    modalClick() {
      this.dialog = true;
    },
  },
};
</script>
<style scoped>
.download-container {
  width: 650px;
}
.download-btn {
  margin-left: 2px;
  margin-top: 5px;
  padding: 7.5px 14px;
  text-transform: capitalize;
}
@media (max-width: 700px) {
  .download-container {
    width: 100%;
  }
  .download-btn {
    margin-top: 5px;
    padding: 7.5px 5px;
    font-weight: 500;
    font-size: 14px;
    text-transform: capitalize;
  }
}
</style>
