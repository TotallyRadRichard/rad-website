const path = require('path'),
      fs = require('fs'),
      ejs = require('ejs'),
      blogs = require('./templates/blogs/blogs.json'),
      profiles = require('./templates/profiles.json'),
      friends = [[],[]],
      pickedFriends = [],
      comments = [];

let friendCount = 0, currentPick = 0;

while(friendCount < 8) {

  currentPick = Math.floor(Math.random() * profiles.length);
  
  if(friendCount < 4) {
    friends[0].push(profiles[currentPick]);
  } else {
    friends[1].push(profiles[currentPick]);
  }

  profiles.splice(currentPick, 1);
  friendCount++;
}

blogs.forEach(blog => {
  if(blog.data) {
    blog.data = require(path.resolve('./', 'templates/blogs', blog.data));
  } else {
    blog.data = {};
  }
  
  ejs.renderFile('templates/blogs/blog_base.ejs', blog, function(err, html) {
    if(err) {
      return console.log(err);
    }

    fs.writeFileSync(path.join('blogs', `${blog.file}.html`), html);
  });
});

ejs.renderFile('templates/radspace.ejs', {blogs,friends,profiles}, function(err, html) {
  fs.writeFileSync('radspace.html', html);
});



