import React from "react";

export default function About() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="bg-primary py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 grid gap-8 md:grid-cols-2 items-center">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <MountainIcon className="h-12 w-12" />
                <h2 className="text-3xl font-bold">Soft Hawks</h2>
              </div>
              <p className="text-primary-foreground text-lg">
                Empowering businesses with cutting-edge software solutions.
              </p>
            </div>
            <img
              src="/placeholder.svg"
              width="600"
              height="400"
              alt="Soft Hawks"
              className="mx-auto aspect-video rounded-xl overflow-hidden object-cover"
            />
          </div>
        </section>
        
        <section className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="space-y-8">
              <h3 className="text-2xl font-bold">Meet Our Team</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamMembers.map((member, index) => (
                  <div key={index} className="bg-muted rounded-lg p-6 space-y-4">
                    <Avatar>
                      <AvatarImage src={member.image} />
                      <AvatarFallback>{member.initials}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h4 className="text-xl font-bold">{member.name}</h4>
                      <p className="text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-muted py-6 px-4 md:px-6">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <MountainIcon className="h-6 w-6" />
            <p className="text-sm text-muted-foreground">
              &copy; 2024 Soft Hawks. All rights reserved.
            </p>
          </div>
          <nav className="flex gap-4">
            <a href="#" className="text-sm hover:underline underline-offset-4">
              Terms of Service
            </a>
            <a href="#" className="text-sm hover:underline underline-offset-4">
              Privacy Policy
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

const Avatar = ({ children }) => (
  <div className="relative w-16 h-16 rounded-full overflow-hidden border border-muted">
    {children}
  </div>
);

const AvatarImage = ({ src }) => (
  <img
    src={src}
    alt="Avatar"
    className="w-full h-full object-cover"
    onError={(e) => {
      e.target.style.display = "none";
    }}
  />
);

const AvatarFallback = ({ children }) => (
  <div className="flex items-center justify-center w-full h-full bg-muted text-muted-foreground">
    {children}
  </div>
);

const MountainIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 2l9 21H3l9-21z"
    />
  </svg>
);

const MenuIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 6h16M4 12h16m-7 6h7"
    />
  </svg>
);

const teamMembers = [
  { name: "John Doe", role: "CEO", image: "/placeholder-user.jpg", initials: "JD" },
  { name: "Jane Lim", role: "CTO", image: "/placeholder-user.jpg", initials: "JL" },
  { name: "Sarah Mayer", role: "Lead Designer", image: "/placeholder-user.jpg", initials: "SM" },
];
