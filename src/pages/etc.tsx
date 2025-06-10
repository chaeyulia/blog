import React from "react";
import { graphql, PageProps } from "gatsby";
import PostList from "../components/PostList";

export default function EtcPage({ data }: PageProps<Queries.EtcPostsQuery>) {
  return <PostList data={data} currentCategory="etc" />;
}

export const query = graphql`
  query EtcPosts {
    allMdx(
      sort: { frontmatter: { date: DESC } }
      filter: {
        frontmatter: {
          category: { nin: ["fe", "be", "bug-fix", "retrospect"] }
        }
      }
    ) {
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
