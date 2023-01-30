import { githubIssuesModel } from "../models/githubIssuesModel";
import { Octokit } from "octokit";

export async function getIssues(): Promise<githubIssuesModel[]> {

  const octokit = new Octokit({
    auth: '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'
  })

  try {

    const resp = await octokit.request('GET /repos/{owner}/{repo}/issues', {
      owner: 'aycabasDemo',
      repo: 'ContosoProject'
    })

    let issues: githubIssuesModel[] = [];
    for (const obj of resp.data) {
      const tmp: githubIssuesModel = {
        state: obj["state"],
        url: obj["html_url"],
        title: obj["title"],
        body: obj["body"]
      };
      issues.push(tmp);
    }
    return issues;
  } catch (e) {
    throw e;
  }
}

export async function createIssue(title: string): Promise<githubIssuesModel[]> {
  const octokit = new Octokit({
    auth: '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'
  })

  try {

    await octokit.request('POST /repos/{owner}/{repo}/issues', {
      owner: 'aycabasDemo',
      repo: 'ContosoProject',
      title: title
    })

    const resp = await octokit.request('GET /repos/{owner}/{repo}/issues', {
      owner: 'aycabasDemo',
      repo: 'ContosoProject'
    })

    let issues: githubIssuesModel[] = [];
    for (const obj of resp.data) {
      const tmp: githubIssuesModel = {
        state: obj["state"],
        url: obj["html_url"],
        title: obj["title"],
        body: obj["body"]
      };
      issues.push(tmp);
    }
    return issues;
  } catch (e) {
    throw e;
  }
}

export function openTaskApp() {
  window.open(
    "https://teams.microsoft.com/l/app/0d5c91ee-5be2-4b79-81ed-23e6c4580427?source=app-details-dialog",
    "_blank"
  );
}
