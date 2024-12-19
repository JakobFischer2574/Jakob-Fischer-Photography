<template>
  <section id="portfolio" class="dark-section" >
    <div class="container-fluid">
      <h1 class="section-header">{{ heading }}</h1>

      <!-- start of filters  -->
      <div class="row filters">
        <ul class="list-inline mx-auto">
          <li
            v-for="item in filters"
            :key="item.title"
            class="list-inline-item filter"
          >
            <a
              class="nav-item"
              :class="item.filter === currentFilter ? 'active' : null"
              :data-filter="item.filter"
              @click="setFilter"
              >{{ item.filter }}
            </a>
          </li>
        </ul>
      </div>
      <!-- end of filters  -->



        <div v-if="isLightboxVisible" class="bigImage"  tabindex="0"   @keydown.esc="closeLightbox">

          <button class="prevbtn" @click="prevbtn(image_src)">&lt;</button>
          <img :src="image_src" @click="closeLightbox"/>
          <button class="nextbtn" @click="nextbtn(image_src)">></button>
          <button class="backbtn" @click="closeLightbox">x</button>
        </div>

        <div class="grid-container">
          <div  v-for="(item, index) in filteredProjects" :key="index" :class="[item.upright? uprightClasss : horizontalClass , gridItem, portfolioItem]">
            <img  loading="lazy" :src="require(`../../assets/images/${this.imageFolder}/${item.image}`)"  :class="[item.upright? uprightClasss : horizontalClass , gridItem] "/>
            <div class="overlay" @click="openLightbox(require(`../../assets/images/${this.imageFolder}/${item.image}`), item.image)"></div>
          </div>
        </div>

    </div>
    <Arrow />
  </section>
</template>

<script>


import data from "../../data/data.json";
import imageData from "../../data/imageData.json";
import Arrow from "../components/Arrow.vue";

export default {
  name: "portfolio",
  props: {},
  components: {
    Arrow,
  },
  data() {

    return {
      projects: imageData.portfolio.projects,
      heading: data.main.headings.portfolio,
      currentFilter: imageData.portfolio.defaultFilter,
      isLightboxVisible: false,
      image_src: ``,
      horizontalClass: 'horizontalClass',
      gridItem: 'grid-item',
      uprightClasss: 'uprightClass',
      portfolioItem: 'portfolio-item',
      imageFolder:'',
    };
  },

  computed: {
    filteredProjects() {
      var projects = imageData.portfolio.projects;
      var filter = this.currentFilter;
      var filtered = projects.filter(function(x) {
        return x.filter === filter;
      });
      return filtered;
    },
    filters() {
      var filterList = [];
      var projects = imageData.portfolio.projects;
      filterList = projects.filter(function(x) {
        if (!filterList.includes(x.filter)) {
          filterList.push(x.filter);
          return x.filter;
        }
      });
      return filterList;
    },

  },
  methods: {
    setFilter(event) {
      this.currentFilter = event.target.dataset.filter;
    },
    openLightbox(src, folder){

      this.image_src=src
      this.image_folder = folder.split('/')[0];
      this.isLightboxVisible = true;

    },

    closeLightbox(){
      this.isLightboxVisible = false;
    },
    nextbtn(src) {

      var tmpescr = src.split('.');
      var tmpeScrFile = cutStringFromCharToBack(tmpescr[0], '/')  +".webp"
      var projects = imageData.portfolio.projects;
      const currentIndex = projects.findIndex((project) => project.title === tmpeScrFile);
      const currentFilter = projects[currentIndex].filter;
      if (projects[currentIndex + 1].filter === currentFilter) {
        var newScrFile = projects[currentIndex + 1].image; // Gib das 'image' des nächsten passenden Eintrags zurück
      }
      this.image_src = require(`../../assets/images/${this.imageFolder}/${newScrFile}`);
      console.log(this.image_src);
    },

    prevbtn(src) {
      var tmpescr = src.split('.');
      var tmpeScrFile = cutStringFromCharToBack(tmpescr[0], '/')  +".webp"
      var projects = imageData.portfolio.projects;
      const currentIndex = projects.findIndex((project) => project.title === tmpeScrFile);
      const currentFilter = projects[currentIndex].filter;
      if (projects[currentIndex - 1].filter === currentFilter) {
        var newScrFile = projects[currentIndex - 1].image; // Gib das 'image' des nächsten passenden Eintrags zurück
      }
      this.image_src = require(`../../assets/images/${this.imageFolder}/${newScrFile}`);
      console.log(this.image_src);
    },
    handleKeyDown(event) {
      console.log(event.key);
      if (event.key === 'Escape') {
        // this.isLightboxVisible = false;
        console.log('Escape key pressed');

      }
    }
  },

  beforeMount() {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    //const userAgent = navigator.userAgent.toLowerCase();
    //const isPC = /windows|macintosh|linux|x11|chrome|firefox|safari|edge/.test(userAgent);
    this.imageFolder = mediaQuery.matches ? 'portfolioMobile' : 'portfolioPC';
    console.log(this.imageFolder)
  }
};


function cutStringFromCharToBack(string, char) {
  const index = string.lastIndexOf(char);
  if (index !== -1) {
    // Schneidet den String ab dem gefundenen Index ab
    return string.substring(index + 1);
  }
  // Gibt den Originalstring zurück, falls das Zeichen nicht gefunden wird
  return "";
}
</script>

<style scoped>

</style>
