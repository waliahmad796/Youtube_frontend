<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="text-white bg-accent" height-hint="98">
      <div class="row">
        <q-toolbar class="col-lg-6 col-md-6 col-sm-12">
          <q-toolbar-title
            style="
              text-shadow: rgb(0 20 255) 2px 3px 5px;
              font-size: 25px;
              font-weight: 500;
            "
            >SocialSave</q-toolbar-title
          >
        </q-toolbar>
      </div>
      <div class="row">
        <q-toolbar class="text-white">
          <q-btn
            flat
            label="Home"
            to="/"
            class="text-subtitle1 text-weight-bold"
            no-caps
          />
          <q-space />
          <q-tabs shrink stretch>
            <q-route-tab to="/youtube" name="tab1" label="YouTube" no-caps />
            <q-route-tab
              to="/instagram"
              name="tab2"
              label="Instagram"
              no-caps
            />
            <q-route-tab to="/tiktok" name="tab3" label="TikTok" no-caps />
            <q-btn-dropdown stretch flat label="Theme picker" no-caps>
              <q-list>
                <q-item-label header>Thems</q-item-label>
                <q-item clickable v-close-popup tabindex="0" @click="darkMode">
                  <q-item-section>
                    <q-item-label class="row justify-center">
                      <q-btn-toggle
                        v-model="model"
                        @click="changeTheme"
                        push
                        rounded
                        glossy
                        color="dark"
                        toggle-color="yellow"
                        :options="[
                          { value: 'one', slot: 'one' },
                          { value: 'two', slot: 'two' },
                        ]"
                      >
                        <template v-slot:one>
                          <div class="row items-center no-wrap">
                            <q-icon right name="light_mode" />
                          </div>
                        </template>

                        <template v-slot:two>
                          <div class="row items-center no-wrap">
                            <q-icon right name="dark_mode" />
                          </div> </template></q-btn-toggle
                    ></q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable tabindex="0" @click="lightMode">
                  <q-item-section>
                    <q-btn
                      label="Buttons"
                      color="primary"
                      @click="alert = true"
                    />
                    <q-dialog v-model="alert">
                      <q-card>
                        <q-card-section>
                          <div class="text-h6">Pick Your Color</div>
                        </q-card-section>

                        <q-card-section class="q-pt-none">
                          <q-color
                            v-model="primaryColor"
                            class="my-picker"
                            @change="updatePrimaryColor"
                          />
                        </q-card-section>

                        <q-card-actions align="right">
                          <q-btn
                            flat
                            label="OK"
                            color="primary"
                            v-close-popup
                          />
                        </q-card-actions>
                      </q-card>
                    </q-dialog>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar>
                    <q-btn
                      label="Header and Foter"
                      color="primary"
                      @click="topBottm = true"
                    />
                    <q-dialog v-model="topBottm">
                      <q-card>
                        <q-card-section>
                          <div class="text-h6">Pick Your Color</div>
                        </q-card-section>

                        <q-card-section class="q-pt-none">
                          <q-color
                            v-model="headFoot"
                            class="my-picker"
                            @change="updateHeaderFooter"
                          />
                        </q-card-section>

                        <q-card-actions align="right">
                          <q-btn
                            flat
                            label="OK"
                            color="primary"
                            v-close-popup
                          />
                        </q-card-actions>
                      </q-card>
                    </q-dialog>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </q-tabs>
        </q-toolbar>
      </div>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-accent text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div>SocialSave</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>
<script>
import { useQuasar } from "quasar";
import { watch } from "vue";
export default {
  data() {
    return {
      isDark: false,
      $q: useQuasar(),
      primaryColor: "",
      headFoot: "",
      alert: false,
      topBottm: false,
    };
  },
  methods: {
    changeTheme() {
      this.$q.dark.toggle();
      if (this.$q.dark.isActive) {
        this.isDark = true;
      } else {
        this.isDark = false;
      }
      localStorage.setItem("dark", this.isDark);
      // console.log("dark value-------------", this.$q.dark.isActive);
    },
    updatePrimaryColor() {
      document.documentElement.style.setProperty(
        "--q-primary",
        this.primaryColor
      );
      localStorage.setItem("buttons", this.primaryColor);
    },
    updateHeaderFooter() {
      document.documentElement.style.setProperty("--q-accent", this.headFoot);
      localStorage.setItem("headerfoot", this.headFoot);
    },
  },
  watch: {
    isDark(val) {
      // console.log(val ? "Dark is active" : "Light is active");
    },
  },
  mounted() {
    const $q = useQuasar();
    const ifDark = JSON.parse(localStorage.getItem("dark"));
    const buttons = localStorage.getItem("buttons");
    const headerFoot = localStorage.getItem("headerfoot");
    // console.log("isActive-----------", $q.dark.isActive);

    if (buttons) {
      document.documentElement.style.setProperty("--q-primary", buttons);
    }
    if (headerFoot) {
      document.documentElement.style.setProperty("--q-accent", headerFoot);
    }

    // console.log(typeof ifDark, "00000000000000000 dark active");
    if (ifDark) {
      this.isDark = $q.dark.isActive;
      this.ifDark = false;
    } else {
      this.isDark = $q.dark.toggle();
      this.ifDark = true;
      // console.log(ifDark, "00000000000000000 light avtive");
    }
  },
};
</script>
<style scoped>
/* body.body--light template {

} */
body.body--dark {
  background: #2a2a2a;
  color: white;
}
</style>
