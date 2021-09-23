import { AppState } from '../AppState'
import { Project } from '../models/Project'
import { logger } from '../utils/Logger'
import { convertToQuery } from '../utils/Query'
import { api } from './AxiosService'

class ProjectsService {
  async getProjects(query = {}) {
    AppState.projects = []
    logger.log('query', query)
    const res = await api.get('api/projects' + convertToQuery(query))
    logger.log('porject res', res)
    AppState.projects = res.data.map(p => new Project(p))
  }

  async createProject(newProject) {
    const res = await api.post('api/projects', newProject)
    AppState.projects.unshift(new Project(res.data))
    logger.log('create res', res)
  }

  async deleteProject(projectId) {
    const res = await api.delete('api/projects/' + projectId)
    logger.log('delete res', res)
    AppState.projects = AppState.projects.filter(p => p.id !== projectId)
  }
}

export const projectsService = new ProjectsService()
