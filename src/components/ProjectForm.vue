<template>
  <form @submit.prevent="createProject()">
    <div class="form-group">
      <label for="title">Title</label>
      <input type="text"
             class="form-control bg-light"
             name="title"
             placeholder="Title...."
             v-model="editable.title"
             required
      >
    </div>
    <div class="form-group">
      <label for="title">Img Url</label>
      <input type="text"
             class="form-control bg-light"
             name="imgUrl"
             placeholder="Img Url...."
             v-model="editable.imgUrl"
             required
      >
    </div>
    <div class="form-group">
      <!-- REVIEW you wont need this for the checkpoint -->
      <label for="photos">Photos</label>
      <button type="button" class="btn btn-primary" @click="addPhoto()">
        Add Photo
      </button>
      <div class="row">
        <div class="col-md-6 p-2" v-for="p in editable.photos" :key="p.id">
          <img class="img-fluid" :src="p.imgUrl" alt="">
          <input type="text" name="" id="" class="" v-model="p.imgUrl">
        </div>
      </div>
    </div>
    <div class="form-group">
      <button type="submit" class="btn btn-success mt-2">
        Create Porject
      </button>
    </div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import { projectsService } from '../services/ProjectsService'
import Pop from '../utils/Pop'
import { Modal } from 'bootstrap'
export default {
  setup() {
    const editable = ref({ photos: [] })
    return {
      editable,
      addPhoto() {
        editable.value.photos.push({ title: 'your title', imgUrl: '//placehold.it/300x300' })
      },
      async createProject() {
        try {
          await projectsService.createProject(editable.value)
          editable.value = { photos: [] }
          Pop.toast('Much success', 'success')

          const modal = Modal.getInstance(document.getElementById('project-form'))
          modal.hide()
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
