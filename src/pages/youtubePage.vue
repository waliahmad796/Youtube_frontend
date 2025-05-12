<template>
  <q-page class="flex flex-center">
    <div class="flex flex-center column content-center full width full-height">
      <div class="flex flex-center column content-center">
        <div class="row">
          <q-avatar
            square
            color="white"
            text-color="red"
            icon="fa-brands fa-youtube"
            size="60px"
            font-size="70px"
            class="col-md-12 bg-transparent"
          />
          <p class="text-h4 text-weight-bold">Download YouTube videos</p>
        </div>
        <form @submit.prevent="fetchFormats" class="row download-container">
          <div class="col-md-10">
            <q-input
              outlined
              v-model="videoUrl"
              id="videoUrl"
              label="Paste URL here"
              dense
              style="padding: 5px 0px"
            />
          </div>
          <div class="col-md-2">
            <q-btn
              style="padding: 7px 20px"
              color="primary"
              text-color="white"
              glossy
              unelevated
              label="Download"
              class="download-btn"
              type="submit"
              @="fetchFormats"
              :loading="loading"
            />
          </div>
        </form>
        <div class="row justify-center">
          <div class="col-md-12" style="padding-right: 16px">
            <q-banner
              dense
              inline-actions
              class="text-white bg-red"
              v-if="message"
            >
              <span style="font-weight: 500">
                {{ message }}
              </span>
            </q-banner>
          </div>
        </div>
        <div class="row justify-center">
          <q-select
            v-if="formats.length > 0"
            v-model="selectedFormat"
            :options="formats"
            label="Select Format"
            option-label="formatNote"
            option-value="formatId"
          />
          <!-- the card with video and formats container -->
          <div class="col-6" v-if="formats.length > 0">
            <!-- the card and fomrats  -->
            <div class="q-pa-md col-md-6">
              <q-card class="my-card">
                <img :src="thumbnail" alt="thumbnail of the video" />
                <q-card-section>
                  <div class="text-h6">{{ title }}</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  <!-- Selecting video and audio format-->
                  <div class="q-pa-md">
                    <div class="q-gutter-y-md column" style="max-width: 300px">
                      <!-- picking video quality -->
                      <q-select
                        clearable
                        filled
                        color="purple-12"
                        v-model="videoSelected"
                        :options="videoFormats"
                        label="Video"
                      />
                      <!-- piiking audio quality -->
                      <q-select
                        color="orange"
                        filled
                        v-model="audioSelected"
                        :options="audioFormats"
                        label="Audio"
                      >
                        <template v-if="audioSelected" v-slot:append>
                          <q-icon
                            name="cancel"
                            @click.stop.prevent="
                              if (videoSelected) {
                                videoSelected = null;
                              }
                              if (audioSelected) {
                                audioSelected = null;
                              }
                            "
                            class="cursor-pointer"
                          />
                        </template>
                      </q-select>
                      <q-select
                        v-if="formats.length > 0"
                        v-model="selectedFormat"
                        :options="formats"
                        label="Select Format"
                        option-label="formatNote"
                        option-value="formatId"
                      />
                    </div>
                  </div>
                </q-card-section>
              </q-card>
              <!-- v-if="selectedFormat" -->
              <q-btn
                style="
                  width: 100%;
                  font-size: x-large;
                  font-weight: 700;
                  margin: 10px 5px 1px 0px;
                "
                @click="downloadVideo"
                label="Download"
                color="primary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
// import axios from "axios";
import { ref } from "vue";
import api from "../../services/api";

export default {
  props: ["dark"],
  data() {
    return {
      youtubeRegex: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/,
      videoUrl: "",
      formats: [],
      videoSelected: ref(""),
      audioSelected: ref(""),
      selectedFormat: null,
      message: "",
      isValid: false,
      loading: false,
      // THE QUALITIES AND SIZES
      videoFormats: [],
      audioFormats: [],
      size: [],
      thumbnail: "",
      title: "",
    };
  },
  methods: {
    async fetchFormats() {
      if (!this.videoUrl) {
        this.message = "Please enter a YouTube URL";
        return;
      }

      try {
        this.loading = true;
        const response = await api.fetchFormats(this.videoUrl);

        this.title = response.data.title;
        this.thumbnail = response.data.thumbnail;
        this.formats = response.data.formats;
        this.message = "Formats fetched successfully!";

        console.log("formats--------", response.data.formats);
        // PUSHING THE VIDEO FORMATS
        this.formats.forEach((el) => {
          console.log("el---------------", el);
          if (el.resolution.includes("144p") && el.formatNote.includes("vp")) {
            this.videoFormats.push("144p");
            this.size.push(el.size);
          }
          if (el.resolution.includes("240p") && el.formatNote.includes("vp")) {
            this.videoFormats.push("240p");
            this.size.push(el.size);
          }
          if (el.resolution.includes("360p") && el.formatNote.includes("vp")) {
            this.videoFormats.push("360p");
            this.size.push(el.size);
          }
          if (el.resolution.includes("480p") && el.formatNote.includes("vp")) {
            this.videoFormats.push("480p");
            this.size.push(el.size);
          }
          if (el.resolution.includes("720p") && el.formatNote.includes("vp")) {
            this.videoFormats.push("720p");
            this.size.push(el.size);
          }
          if (el.resolution.includes("1080p") && el.formatNote.includes("vp")) {
            this.videoFormats.push("1080p");
            this.size.push(el.size);
          }

          // PUSHING AUDIO QUALITIES
          if (el.formatNote.includes("audio only")) {
            this.audioFormats.push("Audio mp4");
          }
        });

        this.loading = false;
      } catch (error) {
        this.message = "Failed to fetch formats";
        console.error(error);
      }
    },
    // DOWNLOADING BY SELECTING
    async downloadVideo() {
      if (!this.selectedFormat) {
        this.message = "Please select a format";
        return;
      }

      try {
        this.loading = true;
        const response = await api.downloadVideo(
          this.videoUrl,
          this.selectedFormat.formatId
        );
        this.loading = false;
        this.message = "Download completed!";
      } catch (error) {
        this.message = "Failed to download video";
        console.error(error);
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
