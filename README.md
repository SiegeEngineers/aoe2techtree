# Data conversion Fork

This project is a fork of the aoe2techtree project for generating the seed data for the [aoe2 data api](https://github.com/amrtgaber/aoe2-data-api).

It also generates the correct filenames for the images used in [aoe2 random civ draft](https://github.com/amrtgaber/aoe2-random-civ-draft).

The conversion scripts can be found in the `data-conversion` folder.

### Images

The data conversion scripts currently do not create the images for the unique techs. Careful to avoid overwriting these images when copying the data over.

## Installation

```bash
npm install
```

## Running

To run the data conversions run these two scripts in this order.

```bash
npx ts-node convert-base-data.ts
npx ts-node full-tech-tree.ts
```

---

## aoe2techtree

The Age of Empires II Tech Tree in your web browser.

Hosted on [aoe2techtree.net](https://aoe2techtree.net)

Age of Empires II © Microsoft Corporation.
**aoe2techtree** was created under Microsoft's "[Game Content Usage Rules](https://www.xbox.com/en-us/developers/rules)" using assets from Age of Empires II,
and it is not endorsed by or affiliated with Microsoft.

## Development

To run the website locally, either open `index.html` in Firefox  
or execute one of the following commands in this directory and
open [localhost:8000](http://localhost:8000) in any browser:

- `php -S localhost:8000`
- `python3 -m http.server`
- `python2 -m SimpleHTTPServer`

## Used libraries

- [svgjs](https://svgjs.dev/)

## Authors

[HSZemi](https://github.com/hszemi) - Original Author
