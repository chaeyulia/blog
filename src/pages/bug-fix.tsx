import React from "react";
import { graphql, PageProps } from "gatsby";
import PostList from "../components/PostList";

export default function BugFixPage({
  data,
}: PageProps<Queries.BugFixPostsQuery>) {
  return <PostList data={data} currentCategory="bug-fix" />;
}

export const query = graphql`
  query BugFixPosts {
    allMdx(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { category: { eq: "bug-fix" } } }
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
