---
layout: post
title: "Setting up a blog with Jekyll and GitHub Pages"
last_edited_at: 2023-08-03 08:20:49 +0300
tags: blogging Jekyll GitHub_Pages
read_time: true
---

GitHub provides free hosting of static web pages through its Pages service. In this tutorial, I will describe how I set up a free developer blog with GitHub Pages and a static web page generator called Jekyll. Jekyll is written in Ruby and has built-in support for GitHub Pages.

[GitHub Pages][gh-pages] is a great way to publish your dev blog since it's free, and the provided github.io address can quite suitably refer to your GitHub profile. GitHub Pages publishes static web pages, and [Jekyll][jekyll] makes producing them much more convenient than writing them in hand. Jekyll is also the [recommended][gh-about-jekyll] way to generate GitHub Pages.

In the following, I will first show how to install Jekyll and its dependencies. Then, I will show how to create a repository for the site, initialize the site with Jekyll, and configure GitHub to publish it. In the end, I will also show how to change the site's theme and look at other ways to customize the site.

## Installing Ruby, Jekyll, and Bundler

Jekyll requires at least [Ruby][ruby] version 2.5.0, RubyGem, GCC, and Make. GitHub also [recommends][gh-recommends] installing [Bundler][bundler] to reduce Jekyll build errors and prevent environment-related bugs. Complete Jekyll installation instructions can be found [here][jekyll-installation]. Since GCC and Make are common development dependencies, I will not provide instructions on installing them in this context. I will, however, go through the installation of Ruby, RubyGem, Jekyll and Bundler on Ubuntu.

A complete [Ruby installation][ruby-installation] (including RubyGem) can be done by installing the _ruby-full_ package, so I will do that:

{% highlight console %}
sudo apt install ruby-full
{% endhighlight %}

Because RubyGems packages (gems) should not be installed as the root user, I will add a couple of lines to my `~/.bashrc` that will set the Gem installation path environment variables when the console is started:

```console
# Install RubyGem packages to ~/gems
export GEM_HOME="$HOME/gems"
export PATH="$HOME/gems/bin:$PATH"
```

After adding the lines, I apply the changes by sourcing the file:

```console
source ~/.bashrc
```

This way, RubyGem will install packages to a user-specific location without the need for root privileges. Now I can use the gem command to install Jekyll and Bundler:

```console
gem install jekyll bundler
```

## Creating a repository for the blog

GitHub Pages are published from a GitHub [repository][create-repo]. To create a new repository, I go to GitHub and select _New repository_ from the menu, marked with a plus sign. Since I wish the blog's address to refer to my GitHub user profile, I use my GitHub username to name the new repository. This way, the blog will be given the address `<username>.github.io`. At this point, I will create only an empty repository without `README.md` or any other files. First, I will initialize the repository locally and then push it to the repository created on GitHub.

After creating a repository in GitHub, I create a new local Git repository with the same name as I used in GitHub and switch to it:

```console
git init <repository_name>
cd <repository_name>
```

I also change the name of the master branch to main:

```console
git branch -m main
```

There are a few [options][publishing-source] for configuring publishing source for the GitHub Pages site. I chose to publish my blog from the `docs/` directory in the main branch. That's why I also create that directory and switch into it:

```console
mkdir docs
cd docs
```

After that, I initialize the site with Jekyll.

## Initializing the blog site with Jekyll

The site can be initialized in the directory from where the site will be published with this command:

```console
jekyll new --skip-bundle .
```

It creates a new site in the directory but skips the `bundle install` command that installs the bundle's dependencies. Next, I will edit the `Gemfile` file according to GitHub's [directions][init-site]. Since this site is published using GitHub Pages, I comment out the line starting with `gem "jekyll"`:

```console
# ...
# This will help ensure the proper Jekyll version is running.
# Happy Jekylling!
#gem "jekyll", "~> 4.3.2"
# ...
```

And uncomment the line starting with `gem "github-pages"` and supplement it with a version number retrieved from [here][dependency-versions]:

```console
# ...
# If you want to use GitHub Pages, remove the "gem "jekyll"" above and
# uncomment the line below. To upgrade, run `bundle update github-pages`.
gem "github-pages", "~> 228", group: :jekyll_plugins
# ...
```

After saving these changes, I install the dependencies:

```console
bundle install
```

Since the _Webrick_ package is not included in the newer versions (> 3.0) of Ruby, we have to also install that:

```console
bundle add webrick
```

Now, the site can be tested locally with the following command:

```console
bundle exec jekyll serve
```

If the command succeeds (as it now should), the site can be reached at [`localhost:4000`](http://localhost:4000).

## The initial push to GitHub, build process, and site URL

To test that the site also works in GitHub, I commit the changes, add the repository I created in GitHub as the origin of the local one, and push the changes to the remote repository:

```console
git add .
git commit -m 'Initial GitHub Pages site with Jekyll'
git remote add origin git@github.com:USER/REPOSITORY.git
git push -u origin main
```

Remember to change USER/REPOSITORY with the correct user and repository name.

Pushing commits to GitHub will start a GitHub Actions pipeline that builds the site. You can follow the build process, for example, by clicking a small orange circle next to the commit name on top of the file listing on the _Code_ tab. This will open a view to the jobs in the pipeline. You can read the output from them by clicking on their names.

After a successful build, the site should be available at its URL, which in case of user or organization site is `http(s)://<username>.github.io` or `http(s)://<organization>.github.io`, and in case of repository site is `http(s)://<username>.github.io/<repository>` or `http(s)://<organization>.github.io/<repository>`.

However, in this case, the site isn't available at the URL even though the build was successful. That's because I haven't set the publishing source in the GitHub repository settings yet.

## Setting the publishing source

The publishing source can be set as a branch only after the initial commit since an empty repository doesn't have any. It can be done on the _Settings_ tab by selecting _Pages_ from the _Code and Automation_ section on the left-hand sidebar. To publish the site from the `docs/` directory in the _main_ branch, you must set _Deploy from a branch_ in the _Source_ section on the main view and _main_ and _/docs_ as selectors in the _Branch_ section.

The setting of the publishing source will trigger the pipeline again, and the site can be reached at its URL after the pipeline finishes.

## Changing the theme and customizing the site

GitHub provides directions on how to change the site's theme [here][adding-theme]. Some of them are supported [directly][supported-themes], and these can be used by typing the name after the _theme_ selector on the _\_config.yml_ file in the form as described on the _README.md_ file of the theme:

```yaml
# ...
# Build settings
theme: minima
# ...
```

It is also possible to use any other theme **hosted on GitHub** with a _remote_theme_ selector:

```yaml
# ...
# Build settings
#theme: minima
remote_theme: "mmistakes/jekyll-theme-basically-basic@1.4.5"
# ...
```

You can also customize the CSS and HTML of the theme. GitHub provides some general advice on this ([here][gh-theme-css] and [here][gh-theme-html]), but more specific information can be found in README files in the theme repositories. There are also many kinds of [plugins][jekyll-plugins] you can use with Jekyll. Themes might also come with pre-built support for some of these and features such as site-wide search. Take a look at, for example, the README of the [Basically Basic][basically-basic] theme.

[gh-pages]: https://pages.github.com/
[jekyll]: http://jekyllrb.com/
[gh-about-jekyll]: https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll#about-jekyll
[ruby]: https://www.ruby-lang.org/en/
[gh-recommends]: https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/creating-a-github-pages-site-with-jekyll#prerequisites
[rubygem]: https://en.wikipedia.org/wiki/RubyGems
[jekyll-installation]: http://jekyllrb.com/docs/installation/
[gh-pages-jekyll]: https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/creating-a-github-pages-site-with-jekyll
[ruby-installation]: https://www.ruby-lang.org/en/documentation/installation/
[bundler]: https://bundler.io/
[create-repo]: https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/creating-a-github-pages-site-with-jekyll#creating-a-repository-for-your-site
[publishing-source]: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
[init-site]: https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/creating-a-github-pages-site-with-jekyll#creating-your-site
[dependency-versions]: https://pages.github.com/versions/
[adding-theme]: https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/adding-a-theme-to-your-github-pages-site-using-jekyll
[supported-themes]: https://pages.github.com/themes/
[gh-theme-css]: https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/adding-a-theme-to-your-github-pages-site-using-jekyll#customizing-your-themes-css
[gh-theme-html]: https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/adding-a-theme-to-your-github-pages-site-using-jekyll#customizing-your-themes-html-layout
[jekyll-plugins]: http://jekyllrb.com/docs/plugins/
[basically-basic]: https://github.com/mmistakes/jekyll-theme-basically-basic
