# Very Not Real Virtual Library

Hi, welcome to the **Very Not Real Virtual Library** repository.

This is *not* intended in any way to be a “real” website—hence the name. It exists purely to demonstrate and practice my full-stack development skills and to act as a project I can show to potential future employers.

The point of this README is to act as a sort of developer journal: a place to keep track of progress on the project and to explain *why* I made certain decisions throughout the development lifecycle.

For example, in a real production application you generally would **not** include your backend in a publicly available repository. Since the purpose of this project is to show what I can do, the entire backend structure is included here for anyone to view, with the exception of my `.env` file.

---

## Tech Stack

The stack for this project will be:

- **Node.js** – development environment  
- **React** (via Vite) – frontend  
- **React Router** – SPA navigation  
- **CSS** – styling  
- **Express** – backend server  
- **express-session** – cookies and session storage  
- **Passport** – authentication  
- **bcrypt** – password hashing  
- **node-postgres (`pg`)** – PostgreSQL client  
- **PostgreSQL** – data storage  

---

## Why This Stack?

My language choices were between JavaScript, C#, and Python.

I only know the basics of Python and have not worked with many Python libraries, and I do not have the time right now to study additional ones.

I have used C# extensively for systems-level work, data structure design, and even more heavily in game programming with Unity. While I am familiar with ASP.NET, my experience designing backend architectures in C# is limited. It would not be hard to figure out, but I also do not feel like battling the strictness of a static language for a web project. I rarely run into issues with data type management in web design (which is also why I do not use TypeScript).

That leaves JavaScript, which I have probably used the most over the last two years (it is a close call between C# and JS). On top of that, I recently finished studying modern React functional component design, whereas before I was only familiar with classic React ES6 class components.

Choosing React was simple: I wanted a SPA design, and the component model was fresh in my head. React Router was the obvious next choice—it provides clean and powerful control over navigation and enables a better user experience. Being able to use the browser’s back button to move between views without reloading the entire site is a big win.

For styling, I stick with plain CSS. I find it easy and straightforward, and I do not feel the need to add another package to my stack like Tailwind.

---

## Backend Decisions

I am limited here by experience: all of my backend work so far has been done with Express. It is what I know, so it is what I am using. While Node.js provides basic HTTP tools out of the box, Express is already familiar to me, so that option is easy to rule out.

I decided to use Passport because I have never used it before, and I wanted to learn it. From what I have researched, it is forgiving, fairly easy to work with, and commonly used in production. Session-based authentication is still widely preferred for many production-grade applications and is often considered more secure than rolling your own JWT setup.

For the database, I had to decide between SQL and NoSQL. While I like MongoDB and have used it a bit, I personally prefer SQL. I also like to avoid JSON-heavy data models when I can—it is simply easier on my brain.

---

With that explanation out of the way, I would formally invite you to read the daily work logs below. I hope you enjoy the read.

---
# 1/9/26
**Day 1 – Project Setup and Initial Structure**

Today I set up the basic project structure, keeping client and server in the same repo as separate directories. I installed the required dependencies for each and started initial React setup in client. I had planned to create a reusable banner component, but since it was already late, I’ll tackle that tomorrow.

On the backend, I worked on server.js, adding the necessary imports and placeholder sections for session management and Passport authentication (to be implemented once I study them more in depth).

A key note for today: I added some top-level, global middleware directly in server.js. I also created a middleware folder, but it doesn’t show on GitHub yet because empty directories aren’t pushed. The middleware here is simple; if it were more complex or reusable, I would place it in the middleware folder.

I also added a catch-all middleware at the end of the stack to log unexpected requests. This acts as an early warning system for any unusual or potentially malicious requests hitting the server—a small step toward building a secure foundation.

---

# 1/12/26  
**Day 2 – Header and NavBar Setup**

Bit of a delay getting started on this project due to… well, a lot over the weekend. I was finally able to get started on building the header and navbar, which went off to a pretty rocky start. Every time I tried to run Vite I kept getting `react not found`. Turns out I had installed `react-router` and Vite, but never actually installed `react` and `react-dom`.

Alright, with that out of the way, surely `npm run dev` should work now, right?  
Nope. `global.css` not found… okay, fix that, try again.  
Still getting `react not found` in `App.jsx`.

After digging into it, I realized Vite can be a little strict and you need to explicitly import React in `main`, `App`, and your components for everything to run cleanly. Once that was sorted, I *finally* had a website I could look at on localhost.

With that hurdle out of the way, I could actually get to designing and styling the navbar. I decided to keep it simple: a site logo on the left, the nav elements in the center, and a user profile card on the far right. Since this is a techy virtual library, I went with a color scheme of blues, yellows, and soft grays to give it a calm but still modern, tech-focused feel.

For the `li` items in the `ul`, I added:

- **Books** – for getting to the search/books page  
- **About** – info about the site  
- **Create Account** – for new users  
- **Login** – for existing users  

These will probably change or expand later, but for now it feels like a solid starting point.

The logo will eventually route the user back to the landing page, and the profile card will take them to their dashboard. The images and GIF were made using Sora AI, since I am very much *not* a talented artist, haha.

I always find it funny that every time I start a project that involves CSS, I think:

- “Man, I hate working with CSS.”  
- “I’m not creative.”  
- “Styling is boring.”  
- “Animating with CSS sucks.”

…and then I proceed to spend hours having the time of my life positioning things, constantly tweaking colors, figuring out the perfect spot for an element, and adding tiny subtle animations to give things more life. I always end up genuinely having fun with CSS.

Tomorrow I should have enough time to work on a reusable footer component and start on the landing page. Most of the day will probably be planning/figuring out what belongs in the footer, what the landing page should contain, and the general structure and design moving forward.

---

# 1/19/26  
**Day 3 – Footer Setup**

Pretty straightforward work today: mostly creating a footer element and deciding what to include in it. I looked at a few different websites to see what they typically put in their footers and modeled mine after the most common patterns.  

### What I Added
- **Social Links:** Facebook, Twitter, Instagram, and GitHub icons that route to each site’s homepage. Normally, you’d link these to your own accounts, but since this is a practice project, the Very Not Real Virtual Library doesn’t have any real social media pages.  
- **Partner/Links Section:** A spot for links to fictional partners or related pages.  
- **Miscellaneous Section:** Items often found on other sites’ footers, such as About, Contact, and Careers. These will get dedicated pages later.  

### Challenges
- Remembering which API provides social media icons. After a few minutes of research, I found **Font Awesome** was exactly what I needed.  
- Still figuring out the **landing page layout** and the structure of my **PostgreSQL database**. These ideas are abstract at this stage, so it’s hard to write actual code for the landing page until I finalize the design and functionality.  

### Next Steps
- Build the **landing page**.  
- Structure the **PostgreSQL database** and determine what data needs to be stored.  
- Once the landing page and database are ready, start implementing:  
  - JavaScript features  
  - Routing with **React Router**  
  - Securing logins and session storage with `express-session` and **Passport**  
  - Backend middleware and routes  

---

# 1/20/26
**Day 4 - DB Setup**

I added a few minor tweaks in the actual project folder mostly involving setting up React-Router and its proper AppRoutes.jsx file and adding a link to the landing page via the site logo in the nav. Where I did most of the work today was in trying to figure out what I want my database to look like, what kind of data I might need and so on. Which might make this update seem "smaller" on the Github side of things but there was alot done to the DB overall, I also am starting to get an idea for what I want the landing page to look like.

The image included for the banner is generated by OpenAI but again I am not super artistic nor do I have an art team on hand like a proper company would so I'm doing my best here haha (also the image isnt that bad looking). I am also still undecided about the font style I used for the banner and its color scheme I might have to get some outside opnions on it.

After playing around with alot of ideas for my DB design and trying to think of what data I might need for the site I decided with a setup like so:

              List of relations
 Schema |     Name     |   Type   |  Owner
--------+--------------+----------+----------
 public | books        | table    | postgres
 public | books_id_seq | sequence | postgres
 public | loans        | table    | postgres
 public | loans_id_seq | sequence | postgres
 public | users        | table    | postgres
 public | users_id_seq | sequence | postgres
(6 rows)

# Books
 id | title | author | pages | total_stock | created_at
----+-------+--------+-------+-------------+------------

# Users
 id | first_name | last_name | email | phone | username | password_hash | role | created_at
----+------------+-----------+-------+-------+----------+---------------+------+------------
# Loans
 id | user_id | book_id | checked_out_at | due_at | returned_at
----+---------+---------+----------------+--------+-------------

### Next Steps
-Build Landing Page
-Add genre column to books for better user search later

---
