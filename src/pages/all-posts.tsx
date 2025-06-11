import React from "react";
import { graphql, PageProps } from "gatsby";
import PostList from "../components/PostList";
import SEO from "../components/SEO";

export default function AllPostsPage({
  data,
}: PageProps<Queries.AllPostsQuery>) {
  return <PostList data={data} />;
}

export const query = graphql`
  query AllPosts {
    allMdx(sort: { frontmatter: { date: DESC } }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD")
            slug
            category
            tags
          }
        }
      }
    }
  }
`;

export const Head = () => <SEO title="전체 글" />;
