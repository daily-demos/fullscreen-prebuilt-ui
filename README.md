# Daily fullscreen prebuilt UI demo + rooms endpoint (Netlify function)

This demo highlights [Daily's prebuilt UI](https://www.daily.co/blog/prebuilt-ui/), and how it can be expanded fullscreen in a website or app.

This is a companion repo to our [chrome extension demo](https://github.com/daily-demos/screenshare-chrome-ext)

## Prerequisites

- [Sign up for a Daily account](https://dashboard.daily.co/signup) and get API key from [https://dashboard.daily.co/developers](https://dashboard.daily.co/developers)
- Click the Netlify deploy button below and follow the instructions

[![Deploy with Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/daily-demos/prebuilt-and-serverless)

- Use the API key from above

- (Optional) Install the [chrome extension](https://github.com/daily-demos/screenshare-chrome-ext) and add the url of your new Netlify site. 

## How the demo works

The frontend part of this demo renders our prebuilt UI in a fullscreen iframe and looks for two query parameters: 
- `room` - the url of the call 
- `screenshare` - whether to automatically start a screenshare 

This means if you visit `https://your-netlify-site.netlify.app/?room=https://mydomain.daily.co/roomname&screenshare=true` it will join a meeting at the room url specified and prompt you to start a screenshare. 

It also contains a serverless function that is meant to be deployed to Netlify that will create rooms for you. This allows the chrome extension to create a unique room whenever you click "Create and launch call". 

## Contributing and feedback

Let us know how experimenting with this demo goes! Feel free to reach out to us any time at `help@daily.co`.

## What's next

Try customizing the landing page you see after leaving a meeting, or add support for other query parameters! 