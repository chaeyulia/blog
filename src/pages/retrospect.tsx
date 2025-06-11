import React from "react";
import { graphql, PageProps } from "gatsby";
import PostList from "../components/PostList";
import SEO from "../components/SEO";

export default function RetrospectPage({
  data,
}: PageProps<Queries.RetrospectPostsQuery>) {
  return <PostList data={data} currentCategory="retrospect" />;
}

export const query = graphql`
  query RetrospectPosts {
    allMdx(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { category: { eq: "retrospect" } } }
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

export const Head = () => <SEO title="회고" />;
