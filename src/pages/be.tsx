import React from "react";
import { graphql, PageProps } from "gatsby";
import PostList from "../components/PostList";
import SEO from "../components/SEO";

export default function BEPage({ data }: PageProps<Queries.BEPostsQuery>) {
  return <PostList data={data} currentCategory="be" />;
}

export const query = graphql`
  query BEPosts {
    allMdx(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { category: { eq: "be" } } }
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

export const Head = () => <SEO title="BE 공부" />;
