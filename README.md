# Tano stream bot

[![codecov](https://codecov.io/gh/francoserio/tano-stream-bot/branch/master/graph/badge.svg?token=REIY2HKE2C)](https://codecov.io/gh/francoserio/tano-stream-bot)
<a href="https://discord.gg/KEVmvXDP" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>

## Description

This is a NestJS web-server that enables Twitch streamers to notify their audience in Twitter and Discord that they went online. This in particular is the Bot for my audience as streamer.

## Installation

If you want to use this repo for your particular audience, you will have to add an `.env`. You can check `.env.example` for info on each environment variable needed.

Then, just ran:

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Contributing

This is an MIT-licensed open source project where everyone is allowed to contribute!

1. Fork the project.
2. Branch out your new feature/bugfix.
3. Make PR!

## Stay in touch

- Author - [Franco Serio](https://github.com/francoserio)
- Twitter - [@tanoserio](https://twitter.com/tanoserio)

## License

tano-stream-bot is [MIT licensed](LICENSE).
