// removes Bookface's OpenGraph
/<meta.*property="og:.*".*content="(.*)".*>/g

// removes twitterspam
/<meta.*name="twitter:.*".*content="(.*)".*>/g

// removes
/<link.*rel="(canonical|shortlink|alternate|EditURI|pingback)".*href="(.*)".*>/g

// removes all comments
/(<!--.*-->)/g

// removes robots
/<meta.*name="robots".*content="(.*)".*>/g

// removes description and keyword spam
/<meta.*name="(description|keywords)".*content="(.*)".*>/g

// replace title with componet stuff
/<title>.*<\/title>/g

// add content to content block
/\/\/\//g

// add navmap stuff before <head>
/<(?!header)head.*>/g

// add navmap stuff before <head>
/<html.*>/g

// add script before </head>
/<\/head>/g
