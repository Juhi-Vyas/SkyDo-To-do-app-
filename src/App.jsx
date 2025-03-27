import { Provider } from "react-redux";
import store from "./redux/store";
import Auth from "./components/Auth";

const App = () => {
  return (
    <Provider store={store}>
      <div className="max-w-lg w-full mx-auto mt-10 p-4 sm:p-6 md:p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center">SkyDo</h1>
        <Auth/>
      </div>
    </Provider>
  );
};

export default App;
