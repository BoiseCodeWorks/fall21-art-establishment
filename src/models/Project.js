
export class Project {
  constructor(data) {
    this.id = data.id
    this.creatorId = data.creatorId
    this.imgUrl = data.imgUrl
    this.title = data.title
    this.creator = data.creator || {}
    this.photos = data.photos
    this.createdAt = data.createdAt
  }
}
