# Mumineen Calendar

## Introduction

Mumineen Calendar is a [Hijri calendar] for [Dawoodi Bohra Shia Muslims] who
follow the 53rd Dai al-Mutlaq, His Holiness, [Syedna Aale Qadr Mufaddal
Saifuddin] (_TUS_). It provides the user with the Hijri date, [Gregorian date]
for any day of the calendar year.

This version is primarily written in JavaScript using [React] and [Middleman].
It supercedes the [Ruby on Rails version] I wrote some time ago.

[Dawoodi Bohra Shia Muslims]: https://www.thedawoodibohras.com/
[Gregorian date]: http://en.wikipedia.org/wiki/Gregorian_calendar
[Hijri Calendar]: http://en.wikipedia.org/wiki/Islamic_calendar
[Middleman]: http://middlemanapp.com/
[React]: http://facebook.github.io/react/
[Ruby on Rails version]: https://github.com/mygulamali/mumineen_calendar
[Syedna Aale Qadr Mufaddal Saifuddin]: https://www.thedawoodibohras.com/about-the-bohras/the-dai-al-mutlaq/53rd-dai-al-mutlaq/

## Setup

```shell
git clone git@github.com:mygulamali/mumineen_calendar_js
cd mumineen_calendar_js
bundle install
cp .env.example .env
cd source/assets/stylesheets
bundle exec bourbon install
bundle exec neat install
```
Then complete the variables in the `.env` file for you environment.

## Serve on your localhost

`bundle exec middleman`

Then visit `http://localhost:4567` to see the site in action.

## Deploy to your web server

`bundle exec middleman deploy`

This command will automagically commit the built website to the correct branch
of this repo for your static site server (i.e. [GitHub Pages] or [Netlify])
to serve.

[Netlify]: https://www.netlify.com/ "Netlify"
[GitHub Pages]: https://pages.github.com/ "GitHub Pages"

## Testing

After starting the local server (see above), visit
`http://localhost:4567/jasmine` to run the [Jasmine] specs.

[Jasmine]: http://jasmine.github.io/

## License

This software is released under the terms and conditions of [The MIT License].
Please see the `LICENSE.txt` file for more details.

[The MIT License]: http://www.opensource.org/licenses/mit-license.php
