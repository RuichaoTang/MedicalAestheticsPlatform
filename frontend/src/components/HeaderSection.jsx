const links = [
  { name: "Search For Clinics", href: "/clinics" },
  { name: "Search For Treatments", href: "/treatments" },
];
const stats = [
  { name: "Registered Specialists", value: "1400+" },
  { name: "US-Based Clinics", value: "200+" },
  { name: "Treatment Types", value: "100+" },
  { name: "For Customers and Clinics", value: "Free Access" },
];

export default function HeaderSection() {
  return (
    <div className="relative isolate overflow-hidden bg-teal-700 py-24 sm:py-32 min-h-[100vh]">
      <div
        aria-hidden="true"
        className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="aspect-1097/845 w-[68.5625rem] bg-linear-to-tr from-[#ff4694] to-[#776fff] opacity-20"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="aspect-1097/845 w-[68.5625rem] bg-linear-to-tr from-[#ff4694] to-[#776fff] opacity-20"
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            className="text-3xl font-semibold tracking-tight text-white/80 sm:text-5xl"
            tabIndex="0"
          >
            <span className="text-pretty font-serif font-medium text-5xl text-white sm:text-7xl">
              Hydrogen
            </span>
            <br />
            Medical Aesthetics Platform
          </h2>
          <p
            className="mt-8 text-xl font-medium text-pretty text-white sm:text-xl/8"
            tabIndex="0"
          >
            A one-stop solution where you can compare prices, browse procedure
            details, and make informed decisions with ease.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base/7 font-semibold text-white sm:grid-cols-2 md:flex lg:gap-x-10">
            {links.map((link) => (
              <a key={link.name} href={link.href}>
                {link.name} <span aria-hidden="true">&rarr;</span>
              </a>
            ))}
            <a
              key="Manage your clinics"
              href={"/me"}
              className=" bg-amber-200 hover:bg-amber-600 hover:text-white text-end sm:text-start rounded-4xl text-teal-800 px-3.5 transition-all "
            >
              Manage Your Clinics <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.name} className="flex flex-col-reverse gap-1:">
                <dt className="text-base/7 text-white">{stat.name}</dt>
                <dd className="text-4xl font-semibold tracking-tight text-white">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
