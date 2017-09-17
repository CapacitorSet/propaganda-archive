# propaganda-archive

Skeleton for a static propaganda archive, powered by Hugo. Mostly for personal use, but feel free to reuse it.

## Usage

 * Install Node, npm, Hugo
 * `npm install --production`
 * Create a new Hugo website in the `hugo` folder; change the theme and settings as you like
 * Put the images in `images/`
 * Edit db.yaml as explained below
 * `node build.js`
 * `cd hugo`
 * `hugo`
 * Serve `hugo/public/`, either with a static server (Nginx/Apache) or `hugo server`

## Writing `db.yaml`

`db.yaml` contains metadata about the posters. This is an example entry:

```yaml
- title: Знамя страны своей мы пронесем через миры и бека!
  lang: Russian
  en: We will carry the banner of our country through the worlds and centuries!
  caption: |
    This poster references the flight of Yuri Gagarin, the first man on space, on the 12th of April, 1961, as we can see in the upper left corner (12.IV.1961). The choice of words is not casual: it comes from the refrain of the Марш энтузиастов (march of the enthusiasts), and appears in at least one other poster.
  items: 01a9aeb4e805bad0ea6ea4d5f7b14121
```

 * The `title` property is the title displayed in Hugo. It should be the original title.
 * If the original title is not in English, the `lang` property must be specified (in a human-readable format for now), and a translation can be given in the `en` property.
 * `caption` is an optional field containing additional information about the poster.
 * `items` represents all pictures matching this entry.
   * It can be a simple string, representing the MD5 hash of the only picture matching this entry.
   * It can be an array of strings, representing MD5 hashes of all pictures matching this entry.
   * It can be an array of objects, having the `hash` (for the MD5 hash) and `loc` (for the location) properties.