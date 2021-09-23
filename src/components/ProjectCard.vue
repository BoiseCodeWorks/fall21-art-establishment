<template>
  <div class="col-md-4 p-2">
    <div class="card " style="width: 18rem;">
      <div class="on-hover position-absolute" style="right: 1rem; top: 1rem" v-if="account.id == project.creatorId">
        <i class="mdi mdi-close text-danger f-20 selectable" @click="deleteProject()"></i>
      </div>
      <img :src="project.imgUrl" class="card-img-top" alt="..." :data-bs-target="'#project-modal-' + project.id" data-bs-toggle="modal">
      <div class="card-body">
        <h5 class="card-title">
          {{ project.title }}
        </h5>
        <div class="d-flex">
          <router-link :to="{name: 'Profile', params: {id: project.creatorId}}" class="selectable">
            <img :src="project.creator.picture" class="" width="64" alt="Da Creatoooor">
            {{ project.creator.name }}
          </router-link>
        </div>
      </div>
    </div>
  </div>

  <!-- REVIEW this is data binding a unique id to the modal so that it pops the correct data #wizardry -->
  <Modal :id="'project-modal-' + project.id">
    <template #modal-title>
      {{ project.title }}
    </template>
    <template #modal-body>
      <div class="row">
        <div class="col-md-6 p-2" v-for="p in project.photos" :key="p.id">
          <img class="img-fluid" :src="p.imgUrl" alt="">
        </div>
      </div>
    </template>
  </Modal>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { projectsService } from '../services/ProjectsService'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
export default {
  props: {
    project: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    return {
      account: computed(() => AppState.account),
      async deleteProject() {
        try {
          await projectsService.deleteProject(props.project.id)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
