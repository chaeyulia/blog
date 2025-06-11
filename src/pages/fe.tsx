import React from "react";
import { graphql, PageProps } from "gatsby";
import PostList from "../components/PostList";
import SEO from "../components/SEO";

export default function FEPage({ data }: PageProps<Queries.FEPostsQuery>) {
  return <PostList data={data} currentCategory="fe" />;
}

export const query = graphql`
  query FEPosts {
    allMdx(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { category: { eq: "fe" } } }
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
export const Head = () => <SEO title="FE 공부" />;
