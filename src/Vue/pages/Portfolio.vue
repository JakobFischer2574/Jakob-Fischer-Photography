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
          <img :src="image_src" @click="closeLightbox" />
          <button class="nextbtn" @click="nextbtn(image_src)">></button>
          <button class="backbtn" @click="closeLightbox">x</button>
        </div>

        <div class="grid-container">
          <div  v-for="(item, index) in filteredProjects" :key="index" :class="[item.upright? uprightClasss : horizontalClass , gridItem, portfolioItem]">
            <img :src="require(`../../assets/images/portfolio/${item.image}`)"  :class="[item.upright? uprightClasss : horizontalClass , gridItem]"/>
            <div class="overlay" @click="openLightbox(require(`../../assets/images/portfolio/${item.image}`))"></div>
          </div>
        </div>

    </div>
    <Arrow />
  </section>
</template>

<script>


import data from "../../data/data.json";
import Arrow from "../components/Arrow.vue";

export default {
  name: "portfolio",
  props: {},
  components: {
    Arrow,
  },
  data() {

    return {
      projects: data.portfolio.projects,
      heading: data.main.headings.portfolio,
      currentFilter: data.portfolio.defaultFilter,
      isLightboxVisible: false,
      image_src: ``,
      horizontalClass: 'horizontalClass',
      gridItem: 'grid-item',
      uprightClasss: 'uprightClass',
      portfolioItem: 'portfolio-item'
    };
  },

  computed: {
    filteredProjects() {
      var projects = data.portfolio.projects;
      var filter = this.currentFilter;
      var filtered = projects.filter(function(x) {
        return x.filter === filter;
      });
      return filtered;
    },
    filters() {
      var filterList = [];
      var projects = data.portfolio.projects;
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
    openLightbox(src){

      this.image_src=src;
      this.isLightboxVisible = true;

    },

    closeLightbox(){
      this.isLightboxVisible = false;
    },
    nextbtn(src){

      var tmpescr = src.split('.');
      console.log();
      var tmpescrNumber = cutStringFromCharToBack(tmpescr[0], 'e')
      tmpescrNumber = parseInt(tmpescrNumber, 10) + 1;
      var tmpescrFile = cutStringFromCharToBack(tmpescr[0], '/')
      tmpescrFile=cutStringFromCharToStart(tmpescrFile, 'e')
      console.log(tmpescrFile);

      this.image_src = require(`../../assets/images/portfolio/${tmpescrFile}/${tmpescrFile}${tmpescrNumber}.jpg`);
      console.log(this.image_src);

    },

    prevbtn(src) {

      var tmpescr = src.split('.');
      console.log();
      var tmpescrNumber = cutStringFromCharToBack(tmpescr[0], 'e')
      tmpescrNumber = parseInt(tmpescrNumber, 10) - 1;
      var tmpescrFile = cutStringFromCharToBack(tmpescr[0], '/')
      tmpescrFile=cutStringFromCharToStart(tmpescrFile, 'e')
      console.log(tmpescrFile);

      this.image_src = require(`../../assets/images/portfolio/${tmpescrFile}/${tmpescrFile}${tmpescrNumber}.jpg`);
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

function cutStringFromCharToStart(string, char){
  const index = string.lastIndexOf(char);
  if (index !== -1) {
    // Schneidet den String ab dem gefundenen Index ab
    return string.substring(0, index+1);
  }
  // Gibt den Originalstring zurück, falls das Zeichen nicht gefunden wird
  return "";
}
</script>

<style scoped>

.grid-container {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 10px; /* Abstände zwischen den Feldern */
  justify-content: space-evenly;
  justify-items: center;
  align-items: center;
}

@media screen and (max-width: 1300px) {
  .grid-container {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 10px; /* Abstände zwischen den Feldern */
    justify-content: space-evenly;
    justify-items: center;
    align-items: center;
  }
}

@media screen and (max-width: 1000px) {
  .grid-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px; /* Abstände zwischen den Feldern */
    justify-content: space-evenly;
    justify-items: center;
    align-items: center;
  }
}
.grid-item{
  width: 100%;;
  object-fit: cover;
  height: 250px;
  overflow: hidden;
}

@media screen and (max-width: 1000px) {
  .grid-item{
    width: 100%;;
    object-fit: cover;
    height: 150px;
    overflow: hidden;}
}
.horizontalClass{
  width: 100%;
  grid-column: span 2;
}

</style>
