# PR Review

PR review is a process where you and your peers check the completed tasks for potential bugs or incorrect implementation of business requirements. This process also helps identify unhandled business requirements, which can then be communicated to the business side for proper handling.

## Self-Review

It's a good practice to perform a self-review after creating a PR. Self-review provides a comprehensive view of your implementation and helps identify bugs that may have appeared between commits.

Additionally, self-review offers insights into what was done well, what should be continued or promoted, and what should be avoided, such as PR scoping.

## Peer Review

Peer review is crucial but should be balanced to avoid misunderstandings and maintain team synergy. Despite potential challenges, peer review is essential for team efficiency.

-   It allows seniors/leads to focus on more critical topics.
-   It facilitates knowledge sharing among team members, whether related to the product domain or technology.
-   It provides inspiration on different approaches to achieve tasks.
-   It highlights maintainability and readability concerns, which are important for team maintenance.

Ultimately, the goal is for everyone to learn from each task daily, beyond just fulfilling business needs.

For team-wide standards or practices, there should be fewer comments on issues as our linter should catch and rectify them before any commits. It's also the individual's responsibility to ensure the linter server is functioning correctly during commits, so lint checks and prettier formatting work as expected.

# PR Scoping

When assigned a task, start by listing the required steps/items. This list can be written down or kept in mind.

Utilize this TODO list to benefit the team by breaking down changes into smaller PRs, each focusing on a specific purpose or goal.

Separate items that could be distractions from the main feature, such as:

-   Module setup
-   File movement
-   Loading state, error state, empty state
-   Additional functionalities

If breaking down your PR is challenging, set smaller goals for each PR. For example, instead of a single PR for sharing PDFs (which requires displaying the PDF first), create two PRs: one for displaying the PDF and another for sharing it.

These smaller PRs will ultimately lead to the same deliverable, such as the PDF sharing feature in this example.

| Pros                                                                                 | Cons                                                   |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------ |
| Smaller PRs with a clearer, more direct purpose                                      | More time spent on planning rather than actual work    |
| Faster review process                                                                | More PRs created                                       |
| Small yet important items won't be deprioritized                                     |

## How?

1. List the necessary TODO items to deliver the task.
2. Separate them into three chunks (UI, Logic, and Data - similar to our architecture).
3. Ensure each item is loosely coupled. If coupling is necessary, add new TODO items to handle it specifically.
4. Determine if the items are mandatory for the feature. If not, extract and address them in later PRs.

**Note:** The TODO list is flexible and can be updated as needed when items are missing, unnecessary, or can be merged.

**Disclaimer:** The examples provided are for reference or guidance in scoping your PR. They are not standards but are meant to facilitate smoother team development.
