import { getPosts } from "../utils/mdxUtils";
import Wizard from "../components/wizard";

export default function WizardPage({ posts }) {
  return <Wizard posts={posts} />;
}

export function getStaticProps() {
  const posts = getPosts();

  return { props: { posts } };
}
