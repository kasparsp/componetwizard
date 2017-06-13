'use babel';

import OtmprocomponetView from './otmprocomponet-view';
import { CompositeDisposable } from 'atom';

export default {

  otmprocomponetView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.otmprocomponetView = new OtmprocomponetView(state.otmprocomponetViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.otmprocomponetView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'otmprocomponet:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.otmprocomponetView.destroy();
  },

  serialize() {
    return {
      otmprocomponetViewState: this.otmprocomponetView.serialize()
    };
  },

  toggle() {
      let editor
      if (editor = atom.workspace.getActiveTextEditor()) {
        let selection = editor.getText()

        let sitemapFunction = '<?php require(\'../lib/settings/function.php\');\n $sitemap = getsitemap(); ?>\n'
        let sitemapMeta = '<meta content="text/html; charset=utf-8" http-equiv="content-type" />\n <title>Nav Map</title>\n <meta name="robots" content="index, follow" />\n'
        let sitemapContent = '<h1>Site Map</h1>\n<?php echo "<ul>"; \n foreach ($sitemap as $site) { echo "<li><a href=\"/". $site . ".html\" >".str_replace(\'-\', \' \', $site)."</a></li>"; }\n} \n echo "</ul>"; ?>\n'


        // remove OpenGraph
        let rmOpengraph = selection.replace(/<meta.*property="og:.*".*content="(.*)".*>/g, '')

        // remove twitter
        let rmTwitter = rmOpengraph.replace(/\<meta.*name="twitter:.*".*content="(.*)".*\>/g, '')

        // remove others
        let rmTrouble = rmTwitter.replace(/\<link.*rel="(canonical|shortlink|alternate|EditURI|pingback|wlwmanifest)".*href="(.*)".*\>/g, '')

        // remove comments
        let rmComments = rmTrouble.replace(/\(<!--.*?-->\)/g, '')

        // remove robots
        let rmRobots = rmComments.replace(/<meta.*name="robots".*content="(.*)".*\>/g, '')

        // remove description
        let rmDescription = rmRobots.replace(/\<meta.*name="(description|keywords)".*content="(.*)".*\>/g, '')


        // add function
        let addFunction = sitemapFunction + rmDescription

        // add meta
        let addMeta = addFunction.replace(/<title>.*<\/title>/g, sitemapMeta)

        let addContent = addMeta.replace(/(.*?)qqq/g, sitemapContent)


        // let res = selection.replace(/<meta.*property="og:.*".*content="(.*)".*>/g,'')
        // console.log(rex)
        // let reversed = selection.split('').reverse().join('')
        editor.setText(addContent)
      }
  }

};
