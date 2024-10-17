import Card from "components/organisms/card";
import Button from "components/atoms/button";
import CopyButton from "components/molecules/copy-button";
import Clock from "components/organisms/clock";
import UseWorkerPromiseDemo from "components/organisms/use-worker-promise-demo";
import MainThreadDemo from "components/organisms/main-thread-demo";
import ParallelDemo from "components/organisms/parallel-demo/parallel-demo";

const technologies: { name: string; href: string }[] = [
  {
    name: "React",
    href: "https://reactjs.org/",
  },
  {
    name: "TypeScript",
    href: "https://www.typescriptlang.org/",
  },
  {
    name: "Vite",
    href: "https://vitejs.dev/",
  },
  {
    name: "TailwindCSS",
    href: "https://tailwindcss.com/",
  },
  {
    name: "useWorkerPromise",
    href: "https://github.com/jantimon/useWorkerPromise",
  },
];

function App() {
  return (
    <main>
      <header className="pt-16 z-10 relative max-w-screen-lg xl:max-w-screen-xl mx-auto">
        <h1 className="text-6xl lg:text-7xl leading-none font-extrabold tracking-tight mb-8 sm:mb-10 text-purple-400">
          WebWorkers w/ React
        </h1>
      </header>
      <section className="max-w-screen-lg xl:max-w-screen-xl mx-auto">
        <p className="max-w-screen-lg text-lg sm:text-xl  text-gray-300 font-medium mb-10 sm:mb-11">
          In pursuit of using "modern" technologies, this test bench is built
          with:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {technologies.map(({ name, href }) => (
            <Card
              key={name}
              title={name}
              description={`Learn more about ${name}`}
              href={href}
            />
          ))}
        </div>
      </section>
      <section className="max-w-screen-lg xl:max-w-screen-xl mx-auto">
        <Clock />
      </section>
      <section className="max-w-screen-lg xl:max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <MainThreadDemo defaultValue={42000} />
          <UseWorkerPromiseDemo defaultValue={42000} />
          <ParallelDemo defaultValue={42000} chunkSize={1000} />
        </div>
      </section>
      <section className="max-w-screen-lg xl:max-w-screen-xl mx-auto">
        <div className="sm:flex sm:space-x-6 space-y-3 sm:space-y-0 items-center">
          <a href="https://github.com/artosalminen/web-workers-testbench">
            <Button>Visit on Github</Button>
          </a>
          <CopyButton text="git@github.com:artosalminen/web-workers-testbench.git" />
        </div>
      </section>
      <footer className="pb-16 max-w-screen-lg xl:max-w-screen-xl mx-auto text-center sm:text-right text-gray-100 font-bold">
        <a href="https://github.com/artosalminen/web-workers-testbench">
          Arto Salminen @ {new Date().getFullYear()}
        </a>
      </footer>
    </main>
  );
}

export default App;
