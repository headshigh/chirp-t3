import { type NextPage } from "next";
import type { RouterOutputs } from "~/utils/api";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  SignInButton,
  SignIn,
  SignedOut,
  useUser,
  useClerk,
} from "@clerk/nextjs";
import { api } from "~/utils/api";
import { postsRouter } from "../server/api/routers/posts";
type PostWithUser = RouterOutputs["example"]["getAll"][number];
const PostView = (props: { post: PostWithUser }) => {
  const { post, author } = props;
  return (
    <div key={post.id} className="flex gap-3 border-b border-slate-400 p-4">
      <Image
        src={author.profileImageUrl}
        className="h-14 w-14 rounded-full"
        alt={`@${author.username}'s profile picture`}
        width={56}
        height={56}
      />
      <div className="flex flex-col">
        <div className="flex gap-1 text-slate-300">
          <Link href={`/@${author.username}`}>
            <span>{`@${author.username} `}</span>
          </Link>
          <Link href={`/post/${post.id}`}>
            <span className="font-thin">{` · ${dayjs(
              post.createdAt
            ).fromNow()}`}</span>
          </Link>
        </div>
        <span className="text-2xl">{post.content}</span>
      </div>
    </div>
  );
};
const Home: NextPage = () => {
  const { data } = api.example.getAll.useQuery();
  console.log(data);
  const user = useUser();
  console.log("user1", user);
  const { signOut } = useClerk();
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ backgroundColor: "black", color: "white" }}>
        <div>
          <h1>Sign In</h1>
          <h1>hello</h1>
          {!user.isSignedIn && <SignInButton />}
          {!!user.isSignedIn && (
            <button onClick={() => signOut()}>sign out</button>
          )}
        </div>
        <div className="posts flex-col  ">
          {data?.map(({ post, author }) => (
            <PostView post={post} author={author} />
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
