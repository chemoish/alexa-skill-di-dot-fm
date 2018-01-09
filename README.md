# alexa-skill-di-dot-fm

Unofficial [DI.FM](https://www.di.fm/) Alexa skill.

> This repository enables me to listen to my favorite radio station. Secondarily, it is to help guide others in Alexa skill development.

> There are many things I do not know, but approaching Alexa development was much more difficult than I would have liked.

**WARNING:** You will need a [premium](https://www.di.fm/premium) account to be able to publish your own [DI.FM](https://www.di.fm/) skill to Alexa.

What this repository is not:

- Alexa step by step tutorial
- Alexa all encompassing example

A variety of tutorials and examples can be found on Github, Medium, and Amazon.

## Primary Goals

- Learn how to write an Alexa skill
- Learn how to write an Alexa audio skill
- Learn how to stream a nonsecure file (Alexa only allows secure streaming)

## Secondary Goals

- Learn how to test an Alexa skill
- Learn how to ease development
- Learn how to do everything for free*

## Get Started

Unfortunately, Alexa development is not straight forward; to get started you will need to read *ALL*  of Amazon's documentation. And, even if you do, there will be many unanswered questions.

> I have never worked with any Amazon technology prior to learning how to create a skill. Your mileage may vary.

Instead, I decided to try to bootstrap development through Google. This is what I found:

1. [alexa-app](https://github.com/alexa-js/alexa-app) — Much better documentation than the [alexa-sdk](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs); however, it will always be missing core features—still not great—examples often found in personal projects of maintainers.
1. [Apex](https://github.com/apex/apex) — Helps deploy your code to Amazon's services.
1. [Amazon Alexa documentation](https://developer.amazon.com/docs/ask-overviews/build-skills-with-the-alexa-skills-kit.html) — Help answer general questions.

> NOTE: There may be tools available to help facilitate skill creation, such as `ask-cli`, but barrier to entry was too high for me.

That being said, https://www.youtube.com/watch?v=pzM4jv7k7Rg and  [alexa-parrot](https://github.com/dblock/alexa-parrot) is what helped me get started.

## Install

Assuming you are following suit, to begin Alexa skill development you will need to setup two accounts:

- [AWS](https://aws.amazon.com/)
- [Developer](https://developer.amazon.com/)

> There wasn't enough information on how to build skills outside of AWS, but AWS is mostly* free so I didn't investigate further.

> Additionally, you can apply for [Alexa Promotional Credit](https://developer.amazon.com/alexa-skills-kit/alexa-aws-credits) once you publish your skill.

Next, you will need to install and configure two CLIs:

- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/installing.html)
- [Apex](http://apex.run/#installation)

Once you have your accounts created and configured, you are finally ready to start developing… dot dot dot…

Now, development will occur, not only through code, but through Amazon's developer console. This is not a great experience, but I haven't found anything easier (Alexa GUI and skill creation tools were much to clunky).

On the bright side, a majority of the configuration required in Amazon's developer console has been abstracted by [alexa-app](https://github.com/alexa-js/alexa-app) (See below).

## Walkthrough

I would recommend following [alexa-parrot](https://github.com/dblock/alexa-parrot). This will be the first step to understanding how to put the Alexa skill pieces together.

## Testing

Testing through [alexa-app](https://github.com/alexa-js/alexa-app) is pretty straightforward. You can either follow [alexa-parrot](https://github.com/dblock/alexa-parrot) or follow the `npm test` found in `package.json`.

> I still don't understand how to properly test/mock intents. After much tribulation, I ended up copying the sample intent request provided by [AWS](https://aws.amazon.com/)'s lambda functions.

> Much trial, much error.

Once you have deployed your skill to AWS Lambda, you can test your skill without an echo via [Echosim](https://echosim.io/).

Not great, but can be used if you do not have an echo handy. And unfortunately, I haven't had much luck testing streaming audio.

## Generating your interaction model

Alexa skills require you to produce the following:

- Intent Schema
- Custom Slot Types
- Sample Utterances

You can either do these by hand through Amazon's developer console **OR** you can leverage [alexa-app](https://github.com/alexa-js/alexa-app). [alexa-app](https://github.com/alexa-js/alexa-app) allows you to couple your interaction model to intents (Great addition I did not find in Amazon's SDK).

See `npm run generate-model` for a small script that can generate everything for you!

For more information, see https://developer.amazon.com/docs/custom-skills/custom-interaction-model-reference.html.

## Contributing

```sh
git clone git@github.com:chemoish/alexa-skill-di-dot-fm.git

cd alexa-skill-di-dot-fm/functions/alexa-skill-di-dot-fm

# install dependencies
npm install

# run tests
npm test

# deploy code
npm deploy
```

## FAQ

### Will this skill be published?

When I figure out how to stop hardcoding all the things, I will look into it.

Nevertheless, I am hesitant to publish a skill without knowing how much it will cost me (I am on the free train).

### How come your file structure is different than [alexa-app](https://github.com/alexa-js/alexa-app)?

I prefer the public interface provided by the [alexa-sdk](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs). Intents can be more easily described through object key-value pairs.

### What is missing from Alexa's SDK?

- Extensive API documentation
- Better documentation
- Better tooling
- Testing

### How to stream a non-secure audio file?

Leverage [Heroku](https://www.heroku.com)'s free tier to deploy a `NodeJS` server.

Since Heroku, can by default, run your service over `https`, you do not need to do anything more than deploy your server! For kicks, I forced the server to use `SSL`.

See https://github.com/chemoish/di-dot-fm-proxy

### How to free?

My only costs have been for AWS data transfer. For the month, my bill has been $0.01 USD.

- [Lambda](https://aws.amazon.com/lambda/pricing)

  > The Lambda free tier includes 1M free requests per month and 400,000 GB-seconds of compute time per month. The memory size you choose for your Lambda functions determines how long they can run in the free tier. The Lambda free tier does not automatically expire at the end of your 12 month AWS Free Tier term, but is available to both existing and new AWS customers indefinitely.

- [Heroku](https://www.heroku.com/free)

  > Get 1000 free dyno hours by verifying your Heroku account with a credit card; unverified accounts receive 550 free hours. You will not be charged, unless you decide to use a paid service. Account verification provides other benefits too, including running more than 5 free apps, as well as free custom domain names.

## Questions, comments?

Create an issue or email me, whatever is easier.
