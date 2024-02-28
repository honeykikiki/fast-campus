import PostForm from 'components/posts/PostForm';
import PostBox from 'components/posts/PostBox';

export interface PostProps {
  id: string;
  email: string;
  content: string;
  createdAt: string;
  uid: string;
  profileUrl?: string;
  likesCount?: number;
  comments?: any;
}

const posts: PostProps[] = [
  {
    id: '0',
    email: 'email',
    content: 'content',
    createdAt: 'createdAt',
    uid: 'uid',
  },
  {
    id: '1',
    email: 'email',
    content: 'content',
    createdAt: 'createdAt',
    uid: 'uid',
  },
  {
    id: '2',
    email: 'email',
    content: 'content',
    createdAt: 'createdAt',
    uid: 'uid',
  },
  {
    id: '3',
    email: 'email',
    content: 'content',
    createdAt: 'createdAt',
    uid: 'uid',
  },
  {
    id: '4',
    email: 'email',
    content: 'content',
    createdAt: 'createdAt',
    uid: 'uid',
  },
];

export default function HomePage() {
  return (
    <div className="home">
      <div className="home__title">Home</div>
      <div className="home__tabs">
        <div className="home__tab home__tab--active">For you</div>
        <div className="home__tab">Following</div>
      </div>

      {/* 게시물 입력 */}
      <PostForm />

      {/* Tweet Post */}
      <div className="post">
        {posts.map((post) => (
          <PostBox post={post} key={post.id} />
        ))}
      </div>
      {/* footer */}
    </div>
  );
}
