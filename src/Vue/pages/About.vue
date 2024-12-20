<template>
  <section id="about" class="dark-section">
    <div class="container-fluid">
      <h1 class="section-header">{{ heading }}</h1>
      <h2 class="tagline" :v-if="about.tagline !==''">{{ about.tagline }}</h2>
      <div class="row  ">
        <!--          data-aos="fade-right"-->
        <div
            class="col-12 col-md-4 flex-col"
            data-aos-duration="1000"
        >
          <img
              class="profile-pic"
              src="../../assets/images/profile-pic.png"
              alt="profile picture"
          />
        </div>
        <div
            class="col-sm-24 col-md-8 flex-col"
            data-aos-duration="1000"
        >
          <p v-if="languageDE" id="about-content">
            <span id="greeting">{{ about.greetingDE }} {{ name }}! </span>
            <span id="bio" v-html="about.bioDE"></span>
            <i class="fas fa-language" style="margin:20px" @click="languageSwitch"></i>
          </p>
          <p v-if="!languageDE" id="about-content">
            <span id="greeting">{{ about.greetingEN }} {{ name }}! </span>
            <span id="bio" v-html="about.bioEN"></span>
            <i class="fas fa-language" style="margin:20px" @click="languageSwitch"></i>
          </p>
        </div>
      </div>
    </div>

    <Arrow/>
  </section>
</template>

<script>
import data from "../../data/data.json";
import Arrow from "../components/Arrow.vue";

export default {
  name: "About",
  components: {
    Arrow,
  },
  props: {},
  data() {
    return {
      about: data.about,
      name: data.main.name.first,
      facts: data.about.facts,
      heading: data.main.headings.about,
      languageDE: false
    };
  },
  methods: {
    languageSwitch() {
      if (!this.languageDE) {
        this.languageDE = true;
      } else {
        this.languageDE = false;
      }

    },

    closeLightbox() {
      this.isLightboxVisible = false;
    },
  }
};
</script>

<style lang="scss"></style>
