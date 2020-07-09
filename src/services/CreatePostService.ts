import PostsRepositories from '../repositories/PostsRepositories';

interface RequestPostsDTO {
  title: string;
  subtitle: string;
  description: string;
  likes: number;
  id_user: string;
  avatar_id?: string;
}

class CreatePostService {
  public async execute({ title, subtitle, description, likes, id_user }: RequestPostsDTO) {
    const postsRepositories = new PostsRepositories();
    
    const post = await postsRepositories.create({ title, subtitle, description, likes, id_user })

    return post;
  }
}

export default CreatePostService;