## FireBase Schema

### `/github_webhook_events`

This is a list of webhook posts from the github which needs to be synced into FireBase

### `/github/prs/:number`

Full details of a particular PR.

### `/digest/prs/[open|closed]/:number`

```
{
  number: number,
  title: string
  assigned: string,
  author: string,
  created_at: number,
  updated_at: number,
  labels: string[],
  comments: number
}
```
