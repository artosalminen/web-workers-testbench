import Card from "components/organisms/card";
import CopyButton from "components/molecules/copy-button";
import Clock from "components/organisms/clock";
import UseWorkerPromiseDemo from "components/organisms/use-worker-promise-demo";
import MainThreadDemo from "components/organisms/main-thread-demo";

const App = () => {
  return (
    <main>
      <header className="pt-16 z-10 relative max-w-screen-lg xl:max-w-screen-xl mx-auto">
        <h1 className="text-6xl lg:text-7xl leading-none font-extrabold tracking-tight mb-8 sm:mb-10 text-purple-400">
          WebWorkers w/ React
        </h1>
      </header>

      <section className="max-w-screen-lg xl:max-w-screen-xl mx-auto">
        <p className="max-w-screen-lg text-lg sm:text-xl text-gray-300 font-medium mb-10 sm:mb-11">
          In pursuit of using "modern" technologies, this test bench is built with:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card
            title="React"
            description="Learn more about React"
            href="https://reactjs.org/"
          />
          {/* Add other technologies here */}
        </div>
      </section>

      <section className="max-w-screen-lg xl:max-w-screen-xl mx-auto">
        <Clock />
      </section>

      <section className="max-w-screen-lg xl:max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <MainThreadDemo defaultValue={42000} />
          <UseWorkerPromiseDemo defaultValue={42000} />
        </div>
      </section>

      <section className="max-w-screen-lg xl:max-w-screen-xl mx-auto">
        <CopyButton text="git@github.com:artosalminen/web-workers-testbench.git" />
      </section>
    </main>
  );
};

export default App;