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






