import Header from "../components/Header";

const people = [
  {
    name: "Ruichao Tang",
    role: "Software Engineer",
    imageUrl: "../public/IMG_9909 2.jpg",
    link: "https://www.linkedin.com/in/ruichaotang",
  },
  // More people...
];

export default function About() {
  return (
    <>
      <Header />
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
          <div className="max-w-xl">
            <h2 className="text-xl font-semibold tracking-tight  text-gray-900 sm:text-2xl">
              About{" "}
              <span className="font-serif font-extralight text-slate-600 ">
                Hydrogen
              </span>
            </h2>
            <p className="mt-6 text-lg/8 text-gray-600">
              Our platform aims to bridge this gap by offering a one-stop
              solution where users can compare prices, browse procedure details,
              and make informed decisions with ease. By increasing accessibility
              and transparency, we empower customers while helping clinics
              attract more clients—a true win-win for both sides.
            </p>
          </div>
          <ul
            role="list"
            className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
          >
            {people.map((person) => (
              <li key={person.name}>
                <a href={person.link} target="_blank" rel="noopener noreferrer">
                  <div className="flex items-center gap-x-6">
                    <img
                      alt=""
                      src={person.imageUrl}
                      className="size-16 rounded-full"
                    />
                    <div>
                      <h3 className="text-base/7 font-semibold tracking-tight text-gray-900">
                        {person.name}
                      </h3>
                      <p className="text-sm/6 font-semibold text-cyan-700">
                        {person.role}
                      </p>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
          <div className="max-w-xl">
            <h2 className="text-xl font-semibold tracking-tight  text-gray-900 sm:text-2xl mb-4">
              Get in touch
            </h2>
          </div>
        </div>
        <ul
          role="contact-info"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 max-w-7xl mx-auto"
        >
          <div className="bg-gray-100 rounded-2xl h-32 p-5">
            <h3 className="text-base/7 font-semibold tracking-tight text-gray-900">
              Say Hello:
            </h3>
            <p className="text-sm/6 font-semibold text-cyan-700">
              tangrich@outlook.com
            </p>
          </div>
          <div className="bg-gray-100 rounded-2xl h-32 p-5">
            <h3 className="text-base/7 font-semibold tracking-tight text-gray-900">
              Join Our team:
            </h3>
            <p className="text-sm/6 font-semibold text-cyan-700">
              tangrich@outlook.com
            </p>
          </div>
          <div className="bg-gray-100 rounded-2xl h-32 p-5">
            <h3 className="text-base/7 font-semibold tracking-tight text-gray-900">
              Colaborate:
            </h3>
            <p className="text-sm/6 font-semibold text-cyan-700">
              tangrich@outlook.com
            </p>
          </div>
          <div className="bg-gray-100 rounded-2xl h-32 p-5">
            <h3 className="text-base/7 font-semibold tracking-tight text-gray-900">
              Advertisement:
            </h3>
            <p className="text-sm/6 font-semibold text-cyan-700">
              tangrich@outlook.com
            </p>
          </div>
        </ul>
      </div>
    </>
  );
}
