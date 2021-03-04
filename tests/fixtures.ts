import { folio as baseFolio } from '@playwright/test';
import { devices } from "playwright";

const builder = baseFolio.extend<{}, {}, { isMobile: boolean }>();

builder.isMobile.initParameter('Set to true to enable mobile emulation', false);

builder.contextOptions.override(async ({ contextOptions, isMobile, browserName }, runTest) => {
  if (isMobile) {
    const device = browserName === 'webkit' ? devices['iPhone 11'] : devices['Pixel 2'];
    await runTest({
      ...contextOptions,
      ...device
    });
  } else {
    await runTest({ ...contextOptions });
  }
});

builder.context.override(async ({ context }, runTest) => {
  context.route('**/api/keys', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: '{}'
    })
  });
  context.route('**/api/feed', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(MOCK_FEED)
    })
  });
  runTest(context);
});

const folio = builder.build();
export const it = folio.it;
export const expect = folio.expect;

const MOCK_FEED = {
  "updates": [
    {
      "name": "burkeholland",
      "caption": "Hey everybody, this is Burke in Nashville TN and I am working on writing some documentation for the build demo which I should have already done.",
      "video": "https://coffeeimage.blob.core.windows.net/raw/burkeholland",
      "created": "10 months ago"
    },
    {
      "name": "suzannechen",
      "caption": "Hi, I'm Suzanne, and I'm in Singapore. I'm looking on Microsoft build bringing built to Asia over the next few days. I'll be connecting our host with our life guest. So that they can synergise and bring better content to our audience.",
      "video": "https://coffeeimage.blob.core.windows.net/raw/suzannechen",
      "created": "10 months ago"
    },
    {
      "name": "cassieview",
      "caption": "Hi, everyone. I'm Cassie and today. I'm gonna be working on finishing up my blog post on how to operationalize your machine learning models using C sharp and the Onyx runtime and then I'm going to play with some web VR and Babylon JS to create. A game.",
      "video": "https://coffeeimage.blob.core.windows.net/raw/cassieview",
      "created": "10 months ago"
    },
    {
      "name": "WirelessLife",
      "caption": "Anthony checking in just coated the ECU on my Forester for some more horsepower in the summer time I have my new NVIDIA, Jetson project just about to start just getting in the case right now and just completed authoring iot modules. on Microsoft learn.",
      "video": "https://coffeeimage.blob.core.windows.net/raw/WirelessLife",
      "created": "10 months ago"
    },
    {
      "name": "webmaxru",
      "caption": "Hi, Folks Maxim is here today. I go through the nominations for Azure Hero program and work on my part of community track at Microsoft build event.",
      "video": "https://coffeeimage.blob.core.windows.net/raw/webmaxru",
      "created": "10 months ago"
    },
    {
      "name": "toddanglin",
      "caption": "Good morning everyone hope everyone is doing, well today just preparing for build recording a few videos to teach other people how to improve their home video recording setups. And I'll talk to a lot of you later today and one on ones ever good day.",
      "video": "https://coffeeimage.blob.core.windows.net/raw/toddanglin",
      "created": "10 months ago"
    },
    {
      "name": "lbugnion",
      "caption": "He everyone this is Laurent from Switzerland today. I'm going to be working on my new super secret project which aims at helping beginners to understand the Azure vocabulary. So this is quite exciting.",
      "video": "https://coffeeimage.blob.core.windows.net/raw/lbugnion",
      "created": "10 months ago"
    },
    {
      "name": "khaosdoctor",
      "caption": "Hello. Everyone. My name is Lucas. I am currently deploying Kubernetes clusters into all things the chosen ones were Raspberry pies, these and I'm also creating awesome new content for Microsoft learn bye bye see you soon.",
      "video": "https://coffeeimage.blob.core.windows.net/raw/khaosdoctor",
      "created": "10 months ago"
    },
    {
      "name": "justinyoo",
      "caption": "Hello. This is Justin from South Korea, which is the other side of the world today. I'm going to review a few Microsoft docs whether they make sense or not from the end user perspective.",
      "video": "https://coffeeimage.blob.core.windows.net/raw/justinyoo",
      "created": "10 months ago"
    },
    {
      "name": "johnpapa",
      "caption": "I got up this morning I rolled out of bed. I felt like a dog had been kicked in the head. And preparing a build demo.",
      "video": "https://coffeeimage.blob.core.windows.net/raw/johnpapa",
      "created": "10 months ago"
    },
    {
      "name": "jldeen",
      "caption": "What's up everyone Jessica here just been working on some videos for build an YouTube as well some new getting started demos for Docker and Kubernetes Ann just really been having fun.",
      "video": "https://coffeeimage.blob.core.windows.net/raw/jldeen",
      "created": "10 months ago"
    },
    {
      "name": "jdubois",
      "caption": "Hey, I'm Julian My kids are watching paw patrol. So at least I can do some Java today.",
      "video": "https://coffeeimage.blob.core.windows.net/raw/jdubois",
      "created": "10 months ago"
    },
    {
      "name": "glaucia86",
      "caption": "Hi, everyone. My name is Glaucia. And I'm here preparing my next live coding. I'm really excited about this project see you soon bye bye.",
      "video": "https://coffeeimage.blob.core.windows.net/raw/glaucia86",
      "created": "10 months ago"
    },
    {
      "name": "FBoucher",
      "caption": "Just push the last commit on git for the learn module forearm and later today. I have my life study group in French for the Azure fundamental certification AZ 900.",
      "video": "https://coffeeimage.blob.core.windows.net/raw/FBoucher",
      "created": "10 months ago"
    },
    {
      "name": "emilyfreeman",
      "caption": "Hi, Emily here, I'm on my second cup of coffee. So I'm starting to feel like a human being today. I need to wrap up my deck for build as well as track down some data for our weekly report.",
      "video": "https://coffeeimage.blob.core.windows.net/raw/emilyfreeman",
      "created": "10 months ago"
    },
    {
      "name": "cmaneu",
      "caption": "Hi. It's Chris today. I set up a streaming for my next meet up. I'm on holiday tonight, I'm really excited and I will be working on a blazer app.",
      "video": "https://coffeeimage.blob.core.windows.net/raw/cmaneu",
      "created": "10 months ago"
    },
    {
      "name": "chanezon",
      "caption": "Hi. This is Patrick from San Francisco today. I went for a hike to Twin Peaks because it's Sunday and I have been working on a new service for developers. We will launch at build. I hope you like it.",
      "video": "https://coffeeimage.blob.core.windows.net/raw/chanezon",
      "created": "10 months ago"
    },
    {
      "name": "cecilphillip",
      "caption": "Everyone. It's been been a rough week, and the kids are still running around all over the house the place is crazy, but I got a lot of my tasks done my Azure DevOps board is looking pretty good. So looking forward to getting some more work done this week.",
      "video": "https://coffeeimage.blob.core.windows.net/raw/cecilphillip",
      "created": "10 months ago"
    },
    {
      "name": "btholt",
      "caption": "Today. I worked on the build keynote including this app sunrise stand up and I had some meetings and I'm going to have some pizza tonight. So I'm pretty excited.",
      "video": "https://coffeeimage.blob.core.windows.net/raw/btholt",
      "created": "10 months ago"
    },
    {
      "name": "berndverst",
      "caption": "Hi. This is Bernd I have been working on 2 build related projects in my first project, I have been meeting with several stakeholders to create a design document for the architecture. And in my other project, I have created Azure functions back end.",
      "video": "https://coffeeimage.blob.core.windows.net/raw/berndverst",
      "created": "10 months ago"
    },
    {
      "name": "AmandaSilver",
      "caption": "Everybody just wanted to. Thank you guys for contributing to the demo.",
      "video": "https://coffeeimage.blob.core.windows.net/raw/AmandaSilver",
      "created": "10 months ago"
    },
    {
      "name": "abelsquidhead",
      "caption": "Hi. My name is able. I've been working on Donovan's portion of Scott Guthrie's keynote demo. Building up the scripts recording stuff. I am so excited, it's going to be amazing, and I can't wait to see it live X.",
      "video": "https://coffeeimage.blob.core.windows.net/raw/abelsquidhead",
      "created": "10 months ago"
    }
  ]
}