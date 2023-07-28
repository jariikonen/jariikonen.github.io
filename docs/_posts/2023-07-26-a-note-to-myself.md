---
layout: post
title: "Note to self: When something is not working, check first that there are no typos!"
date: 2023-07-26 18:14:00 +0300
categories: coding
---

When coding or configuring software, there are often situations when things won't work as expected. You can be stuck with a problem for hours without figuring out where the problem is, and in the end, something very simple usually solves the problem. This is exactly what happened to me as I tried to set up this blog site and get it built by GitHub Pages.

I decided to use [Jekyll][jekyll], a tool for generating static websites written in Ruby, to create the site and [GitHub Pages][gh-pages] to publish it. GitHub provides good [instructions][gh-pages_with_jekyll] on how to use Jekyll with GitHub Pages. Publishing web pages on GitHub Pages is also free, and since the domain given to the site by GitHub is directly linked to my GitHub profile, this way of publishing would work well for my dev blog.

Following the instructions, I had no problems with the default installation that Jekyll gave. However, as soon as I tried to [change the theme][changing_theme] to a remote one, something went wrong. GitHub's build pipeline finished successfully, but the produced website didn't work or have the styling I expected. As I looked at the build log, there was a warning saying _"github-pages can't satisfy your Gemfile's dependencies"_. This naturally led me to think about how I could provide the missing dependencies to the build.

Since it was my first time working with a Ruby based project, I didn't fully understand how the build process on GitHub functioned. So I just tried adding the dependencies to the bundle in my local repository with the _bundle add_ -command. I also tried locking to different versions and googled about the subject extensively for probably close to two hours. However, nothing really helped, until on one of the texts I found from the internet I noticed that the _remote_theme_-selector in the \_config.yml seemed to have an underscore instead of a hyphen I remembered to have used. By changing just this one little thing, the site started working with the new theme. The warning about the dependencies turned out to be insignificant since the build that produced the functioning site produced the same warning.

So this is the note to myself: **Whenever there is something that is not working, please, check first there are no misspelled keywords, misspelled variable or function names, or any other kind of typos, before doing any other debugging work!**

[jekyll]: https://jekyllrb.com
[gh-pages]: https://pages.github.com/
[gh-pages_with_jekyll]: https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll
[changing_theme]: https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/adding-a-theme-to-your-github-pages-site-using-jekyll
[jekyll-docs]: https://jekyllrb.com/docs/home
[jekyll-gh]: https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/
