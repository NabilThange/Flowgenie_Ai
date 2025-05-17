export const sampleWorkflows = [
  {
    trigger: "welcome email",
    explanation:
      "Here's how to create a workflow that sends a welcome email to new users:\n\n1. Set up the trigger: Use the 'Webhook' node as your trigger. This will create an endpoint that can be called when a new user signs up.\n\n2. Configure the webhook: Set the webhook to receive POST requests with the user's information (name, email, etc.).\n\n3. Add an Email node: Connect the webhook to an 'Email' node. Configure it with your SMTP settings.\n\n4. Customize the email content: Use the data from the webhook to personalize the email. You can use expressions like `{{$json.name}}` to insert the user's name.",
    json: {
      nodes: [
        {
          parameters: {
            httpMethod: "POST",
            path: "new-user",
            options: {},
          },
          name: "Webhook",
          type: "n8n-nodes-base.webhook",
          typeVersion: 1,
          position: [250, 300],
        },
        {
          parameters: {
            fromEmail: "your-email@example.com",
            toEmail: "={{$json.email}}",
            subject: "Welcome to Our Service!",
            text: "=Hi {{$json.name}},\n\nWelcome to our service! We're excited to have you on board.\n\nBest regards,\nThe Team",
            options: {},
          },
          name: "Send Email",
          type: "n8n-nodes-base.emailSend",
          typeVersion: 1,
          position: [500, 300],
        },
      ],
      connections: {
        Webhook: {
          main: [
            [
              {
                node: "Send Email",
                type: "main",
                index: 0,
              },
            ],
          ],
        },
      },
    },
  },
  {
    trigger: "Twitter",
    explanation:
      "Here's how to create a workflow that posts to Twitter when you publish a new blog post:\n\n1. Set up the RSS trigger: Use the 'RSS Feed' node to monitor your blog's RSS feed for new posts.\n\n2. Configure the RSS node: Set the URL to your blog's RSS feed and set a polling interval (e.g., every 15 minutes).\n\n3. Add a Twitter node: Connect the RSS node to a 'Twitter' node. You'll need to authenticate with your Twitter account.\n\n4. Customize the tweet: Format your tweet using data from the RSS feed. For example: `New blog post: {{$json.title}} {{$json.link}}`",
    json: {
      nodes: [
        {
          parameters: {
            url: "https://yourblog.com/feed",
            options: {
              polling: true,
              pollInterval: 15,
            },
          },
          name: "RSS Feed",
          type: "n8n-nodes-base.rssFeedRead",
          typeVersion: 1,
          position: [250, 300],
        },
        {
          parameters: {
            text: "=New blog post: {{$json.title}} {{$json.link}}",
            additionalFields: {},
          },
          name: "Twitter",
          type: "n8n-nodes-base.twitter",
          typeVersion: 1,
          position: [500, 300],
        },
      ],
      connections: {
        "RSS Feed": {
          main: [
            [
              {
                node: "Twitter",
                type: "main",
                index: 0,
              },
            ],
          ],
        },
      },
    },
  },
]
