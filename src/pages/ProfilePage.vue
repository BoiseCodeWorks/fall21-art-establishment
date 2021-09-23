<template>
  <div class="container-fluid">
    <div class="profile-header" v-if="profile">
      <div class="row cover-img" :style="{backgroundImage: `url(${profile.coverImg})`}">
        <!-- TODO come put in profile info  -->
      </div>
    </div>
    <div v-else>
      <h4 class="text-light">
        ....Loading
      </h4>
    </div>
    <div class="row" v-if="projects.length > 0">
      <ProjectCard v-for="p in projects" :key="p.id" :project="p" />
    </div>
    <div class="row" v-else>
      <h3>No Porsts..... Very sad Much empty</h3>
    </div>
  </div>
</template>

<script>
import { computed, watchEffect } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { projectsService } from '../services/ProjectsService'
import { profilesService } from '../services/ProfilesService'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
export default {
  setup() {
    const route = useRoute()
    async function getProjects() {
      try {
        await projectsService.getProjects({ creatorId: route.params.id })
      } catch (error) {
        Pop.toast(error, 'error')
      }
    }
    watchEffect(async() => {
      if (route.params.id) {
        await profilesService.getProfileById(route.params.id)
        getProjects()
      }
    })
    return {
      profile: computed(() => AppState.profile),
      projects: computed(() => AppState.projects)
    }
  }
}
</script>

<style lang="scss" scoped>

.cover-img{
  height: 30vh;
  background-position: center center;
}

</style>
