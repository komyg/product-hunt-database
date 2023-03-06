import { Octokit } from 'octokit';
import { Repositories, UsersPerRepository } from './types';

async function authenticate() {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  return octokit;
}

function getPublicGithubRepositories(octokit: Octokit) {
  const gql = octokit.graphql; // Must do this to preserve syntax highlighting for some reason.

  return () =>
    gql<Repositories>(`
    query Repositories {
      search(query: "stars:>0", type: REPOSITORY, first: 10) {
        edges {
          cursor
          node {
            ... on Repository {
              id
              name
              owner {
                id
                url
                login
              }
              url
              description
              createdAt
              updatedAt
              forkCount
              stargazerCount
            }
          }
        }
      }
    }
  `);
}

function getUsersPerRepository(octokit: Octokit) {
  const gql = octokit.graphql; // Must do this to preserve syntax highlighting for some reason.

  return (name: string, owner: string) =>
    gql<UsersPerRepository>(
      `
    query UsersPerRepository($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
      mentionableUsers(first: 100) {
        edges {
          cursor
          node {
            id
            name
            websiteUrl
            url
            login
            bio
          }
        }
      }
    }
  }
  `,
      { name, owner }
    );
}

export async function getGithubApi() {
  const octokit = await authenticate();

  return {
    getPublicGithubRepositories: getPublicGithubRepositories(octokit),
    getUsersPerRepository: getUsersPerRepository(octokit),
  };
}