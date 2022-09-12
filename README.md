# Daily fullscreen prebuilt UI demo

This demo highlights [Daily's prebuilt UI](https://www.daily.co/blog/prebuilt-ui/), and how it can be expanded fullscreen in a website or app.

It works really well with our [chrome extension demo](https://github.com/daily-demos/screenshare-chrome-ext). Although it works totally fine as a standalone app as well.

Check out a live version of the demo [here](https://fullscreen-prebuilt-ui.netlify.app/).

## Prerequisites

- [Sign up for a Daily account](https://dashboard.daily.co/signup) and get API key from [https://dashboard.daily.co/developers](https://dashboard.daily.co/developers)

### Optional

- Click the Netlify deploy button below and follow the instructions

[![Deploy with Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/daily-demos/fullscreen-prebuilt-ui)

- Use the API key from above

- Install the [chrome extension](https://github.com/daily-demos/screenshare-chrome-ext) and add the url of your new Netlify site.

## How the demo works

The frontend part of this demo renders our prebuilt UI in a fullscreen iframe and looks for two query parameters:

- `room` - the url of the call
- `screenshare` - whether to automatically start a screenshare

This means if you visit `https://your-netlify-site.netlify.app/?room=https://mydomain.daily.co/roomname&screenshare=true` it will join a meeting at the room url specified and prompt you to start a screenshare.

It also contains an API proxy that is meant to be deployed to Netlify that will create rooms for you. This allows a demo room to be automatically created whenever you load the app without a `room` parameter in the url. This also allows the chrome extension to create a unique room whenever you click "Create and launch call".

## Running locally

1. Install dependencies: `npm i`.
2. Start dev server: `npm run dev`.

Next, you'll have two ways to connect to a room. You can use Netlify to access the Daily REST API: see the Netlify CLI instructions below. Using the Netlify proxy will allow you to create rooms on the fly.

If you prefer to test with a hardcoded room, make sure to [create a room via the Daily dashboard](https://help.daily.co/en/articles/4202139-creating-and-viewing-rooms). Then run `npm run dev`, and add your room's link to the room query parameter in your localhost URL: `http://localhost:8080/?room=https://mydomain.daily.co/my-room`

This will join the `my-room` room in your local environment.

## Running using Netlify CLI

If you want access to the Daily REST API (using the proxy as specified in `netlify.toml`) as well as a more robust local dev environment, please do the following (in this project's directory):

1. Deploy to your Netlify account
   [![Deploy with Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/daily-demos/fullscreen-prebuilt-ui)

2. Install the Netlify CLI `npm i -g netlify-cli`
3. Login to your account `netlify login`
4. Rename `sample.env` to `.env` and add your API key
5. Start the dev server `netlify dev`

> Note: If the API proxy isn't working locally you may need to run `netlify build` first. This will put API key in the `netlify.toml` file, so make sure you don't commit this change.

## Contributing and feedback

Let us know how experimenting with this demo goes! Feel free to reach out to us any time at `help@daily.co`.

## What's next

Try customizing the landing page you see after leaving a meeting, or add support for other query parameters!