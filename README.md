# Mumineen Calendar

## Introduction

Mumineen Calendar is a [Hijri calendar](http://en.wikipedia.org/wiki/Islamic_calendar) for [Dawoodi Bohra Shia Muslims](http://en.wikipedia.org/wiki/Dawoodi_bohra) who follow the 53rd Dai al-Mutlaq, His Holiness, [Syedna Ale Qadr Mufaddal Saifuddin](http://en.wikipedia.org/wiki/Mufaddal_Saifuddin) (_TUS_).  It provides the user with the Hijri date, [Gregorian date](http://en.wikipedia.org/wiki/Gregorian_calendar) for any day of the calendar year.

This version is primarily written in JavaScript using [React](http://facebook.github.io/react/) and [Middleman](http://middlemanapp.com/).  It supercedes the [Ruby on Rails version](https://github.com/mygulamali/mumineen_calendar) I wrote some time ago.

## Setup

```shell
git clone git@github.com:mygulamali/mumineen_calendar_js
cd mumineen_calendar_js
bundle install
cd source/stylesheets
bundle exec bourbon install
bundle exec neat install
```

## Serve on your localhost

`bundle exec middleman server`

Then visit `http://localhost:4567` to see the site in action.

## Testing

After starting the local server (see above), visit `http://localhost:4567/jasmine` to run the [Jasmine](http://jasmine.github.io/) specs.

## License

This software is released under the terms and conditions of [The MIT License](http://www.opensource.org/licenses/mit-license.php "The MIT License"). Please see the LICENSE.txt file for more details.
